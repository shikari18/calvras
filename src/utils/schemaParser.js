// Dynamic AST & Code Pattern Parser for Calvras Embedded Database
// Parses real interfaces, types, state arrays, and API endpoints directly from workspace files.

function toSnakeCase(str) {
  return str
    .replace(/([A-Z]+)/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/[-\s]+/g, '_');
}

function pluralize(word) {
  const w = toSnakeCase(word);
  if (w.endsWith('s') || w.endsWith('x') || w.endsWith('ch') || w.endsWith('sh')) return w;
  if (w.endsWith('y') && !/[aeiou]y$/i.test(w)) return w.slice(0, -1) + 'ies';
  return w + 's';
}

function formatLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

function inferSqlType(key, valSample = null) {
  const k = key.toLowerCase();
  if (k === 'id' || k.endsWith('_id') || k.endsWith('id')) {
    if (typeof valSample === 'number') return 'INTEGER';
    return 'UUID';
  }
  if (valSample !== null && valSample !== undefined) {
    if (typeof valSample === 'boolean') return 'BOOLEAN';
    if (typeof valSample === 'number') return Number.isInteger(valSample) ? 'INTEGER' : 'NUMERIC';
    if (typeof valSample === 'object') return 'JSONB';
    const s = String(valSample);
    if (/^\d{4}-\d{2}-\d{2}/.test(s) || (s.includes('T') && s.endsWith('Z'))) return 'TIMESTAMP';
    if (/^\$\d+/.test(s)) return 'TEXT';
  }
  if (k.includes('date') || k.includes('time') || k.endsWith('_at')) return 'TIMESTAMP';
  if (k.includes('price') || k.includes('cost') || k.includes('amount') || k.includes('total') || k.includes('balance') || k.includes('rate')) return 'NUMERIC';
  if (k.includes('count') || k.includes('qty') || k.includes('quantity') || k.includes('age') || k.includes('size') || k.includes('party')) return 'INTEGER';
  if (k.includes('is_') || k.includes('has_') || k.startsWith('can_') || k === 'available' || k === 'active' || k === 'completed' || k === 'done') return 'BOOLEAN';
  return 'TEXT';
}

/**
 * Extracts TypeScript interfaces and types from code.
 */
function extractInterfaces(code) {
  const results = [];
  const interfaceRegex = /(?:export\s+)?(?:interface|type)\s+([A-Z][A-Za-z0-9_]*)(?:\s*=\s*\{|\s*\{)([^}]+)\}/g;
  let match;
  while ((match = interfaceRegex.exec(code)) !== null) {
    const typeName = match[1];
    const body = match[2];
    // Skip React component props or non-entity types
    if (typeName.endsWith('Props') || typeName.endsWith('State') || typeName === 'IconProps') continue;

    const fields = [];
    const lines = body.split(/[;\n,]+/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
      const fieldMatch = trimmed.match(/^([a-zA-Z0-9_]+)\??\s*:\s*([^;]+)/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const rawType = fieldMatch[2].trim();
        let sqlType = 'TEXT';
        if (/number/i.test(rawType)) {
          sqlType = /count|qty|quantity|size|age|party|items/i.test(fieldName) ? 'INTEGER' : 'NUMERIC';
        } else if (/boolean/i.test(rawType)) {
          sqlType = 'BOOLEAN';
        } else if (/Date/i.test(rawType) || /time|date|_at/i.test(fieldName)) {
          sqlType = 'TIMESTAMP';
        } else if (fieldName === 'id' || fieldName.endsWith('Id') || fieldName.endsWith('_id')) {
          sqlType = 'UUID';
        } else if (/array|\[\]/i.test(rawType)) {
          sqlType = 'JSONB';
        }

        fields.push({
          key: toSnakeCase(fieldName),
          label: formatLabel(fieldName),
          type: sqlType,
          pk: fieldName.toLowerCase() === 'id'
        });
      }
    }

    if (fields.length >= 2) {
      results.push({
        typeName,
        tableName: pluralize(typeName),
        columns: fields
      });
    }
  }
  return results;
}

/**
 * Safely parses JavaScript/JSON object literals inside arrays from code.
 */
function extractMockDataArrays(code) {
  const results = [];
  // Matches e.g.: const [menuItems, setMenuItems] = useState([ ... ]); or const DISHES = [ ... ]; or const initialItems = [ ... ];
  const arrayRegex = /(?:const|let|var)\s+(?:\[\s*([a-zA-Z0-9_]+)\s*,\s*[^\]]+\]|([a-zA-Z0-9_]+))\s*(?::\s*[^=]+)?=\s*(?:useState(?:\s*<[^>]*>)?\s*\()?(\[\s*\{[\s\S]*?\}\s*\])(?:\))?/g;

  let match;
  while ((match = arrayRegex.exec(code)) !== null) {
    let varName = match[1] || match[2];
    const arrayCode = match[3];

    if (!varName || !arrayCode || arrayCode.length < 10) continue;
    // Strip prefixes like initial, default, mock
    varName = varName.replace(/^(?:initial|default|mock|sample)_?/i, '');
    // Skip UI state like activeTab, navigation tabs, or string arrays
    if (/nav|tab|column|filter|option|view|page|step/i.test(varName)) continue;

    // Find object chunks inside the array
    const objectRegex = /\{([^{}]+)\}/g;
    let objMatch;
    const rows = [];
    while ((objMatch = objectRegex.exec(arrayCode)) !== null) {
      const objBody = objMatch[1];
      const row = {};
      // Match key-value pairs
      const propRegex = /([a-zA-Z0-9_]+)\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|([0-9.]+)|(true|false)|([a-zA-Z0-9_]+))/g;
      let propMatch;
      while ((propMatch = propRegex.exec(objBody)) !== null) {
        const k = propMatch[1];
        const val = propMatch[2] !== undefined ? propMatch[2]
          : propMatch[3] !== undefined ? propMatch[3]
          : propMatch[4] !== undefined ? propMatch[4]
          : propMatch[5] !== undefined ? Number(propMatch[5])
          : propMatch[6] !== undefined ? (propMatch[6] === 'true')
          : propMatch[7];
        row[toSnakeCase(k)] = val;
      }
      if (Object.keys(row).length >= 2) {
        rows.push(row);
      }
    }

    if (rows.length > 0) {
      results.push({
        varName,
        tableName: pluralize(varName),
        rows
      });
    }
  }
  return results;
}

/**
 * Parses API endpoints mentioned in fetch, axios, or route definitions.
 */
function extractApiEndpoints(code) {
  const endpoints = new Set();
  const apiRegex = /(?:fetch|axios\.(?:get|post|put|delete)|app\.(?:get|post|put|delete)|router\.(?:get|post|put|delete))\s*\(\s*['"`](?:https?:\/\/[^/]+)?\/api\/([a-zA-Z0-9_-]+)/g;
  let match;
  while ((match = apiRegex.exec(code)) !== null) {
    const resource = match[1];
    if (resource && !['auth', 'login', 'logout', 'session', 'user', 'health'].includes(resource)) {
      endpoints.add(pluralize(resource));
    }
  }
  return Array.from(endpoints);
}

/**
 * Main parser: takes an object of file paths -> content, extracts real entities and data.
 * Zero hardcoded fallback strings. Returns empty table map if none found.
 */
export function parseProjectCodeSchema(filesObj = {}) {
  const tables = {};

  const fileEntries = Object.entries(filesObj).filter(([path]) => {
    return /\.(tsx|jsx|ts|js|json|sql|prisma)$/i.test(path) && !path.includes('node_modules') && !path.includes('.git');
  });

  // 1. Process Interfaces and Types
  for (const [_, content] of fileEntries) {
    if (typeof content !== 'string') continue;
    const interfaces = extractInterfaces(content);
    for (const item of interfaces) {
      const tbl = item.tableName;
      if (!tables[tbl]) {
        tables[tbl] = {
          name: tbl,
          typeName: item.typeName,
          columns: item.columns,
          rows: []
        };
      } else {
        // Merge columns
        const existingKeys = new Set(tables[tbl].columns.map(c => c.key));
        for (const col of item.columns) {
          if (!existingKeys.has(col.key)) {
            tables[tbl].columns.push(col);
            existingKeys.add(col.key);
          }
        }
      }
    }
  }

  // 2. Process Initial Data Arrays from Code
  for (const [_, content] of fileEntries) {
    if (typeof content !== 'string') continue;
    const dataArrays = extractMockDataArrays(content);
    for (const arr of dataArrays) {
      const tbl = arr.tableName;
      // Try to find an existing table that matches or is singular/plural
      const matchedTbl = Object.keys(tables).find(t => {
        return t === tbl || t.includes(tbl) || tbl.includes(t);
      }) || tbl;

      if (!tables[matchedTbl]) {
        // Infer columns from rows
        const colMap = {};
        for (const r of arr.rows) {
          for (const [k, v] of Object.entries(r)) {
            if (!colMap[k]) {
              colMap[k] = {
                key: k,
                label: formatLabel(k),
                type: inferSqlType(k, v),
                pk: k === 'id'
              };
            }
          }
        }
        // Ensure id is primary key first
        const cols = Object.values(colMap);
        cols.sort((a, b) => (a.pk ? -1 : b.pk ? 1 : 0));
        tables[matchedTbl] = {
          name: matchedTbl,
          columns: cols,
          rows: arr.rows
        };
      } else {
        // Populate existing table with real rows from code
        if (tables[matchedTbl].rows.length === 0) {
          tables[matchedTbl].rows = arr.rows;
        } else {
          // If already has rows, append unique
          const existingIds = new Set(tables[matchedTbl].rows.map(r => String(r.id)));
          for (const r of arr.rows) {
            if (!existingIds.has(String(r.id))) {
              tables[matchedTbl].rows.push(r);
            }
          }
        }
      }
    }
  }

  // 3. Process API Routes (add blank tables if defined in backend)
  for (const [_, content] of fileEntries) {
    if (typeof content !== 'string') continue;
    const endpoints = extractApiEndpoints(content);
    for (const ep of endpoints) {
      if (!tables[ep]) {
        tables[ep] = {
          name: ep,
          columns: [
            { key: 'id', label: 'ID', type: 'UUID', pk: true },
            { key: 'name', label: 'Name', type: 'TEXT', pk: false },
            { key: 'status', label: 'Status', type: 'TEXT', pk: false },
            { key: 'created_at', label: 'Created At', type: 'TIMESTAMP', pk: false }
          ],
          rows: []
        };
      }
    }
  }

  // 4. Ensure every table has an 'id' column and rows have an id
  for (const [_, cfg] of Object.entries(tables)) {
    if (!cfg.columns.some(c => c.pk || c.key === 'id')) {
      cfg.columns.unshift({ key: 'id', label: 'ID', type: 'UUID', pk: true });
    }
    cfg.rows = cfg.rows.map((row, index) => {
      if (!row.id) {
        return { id: `rec_${index + 1}`, ...row };
      }
      return row;
    });
  }

  return tables;
}

/**
 * Generates production-ready SQL DDL statements for PostgreSQL / SQLite.
 */
export function generateSqlSchema(tables = {}) {
  const tableNames = Object.keys(tables);
  if (tableNames.length === 0) {
    return '-- No tables defined yet.\n-- Create a table or write entities in your project code to generate SQL schema.';
  }

  let sql = '-- Calvras Relational Schema (PostgreSQL / SQLite Compatible)\n';
  sql += `-- Generated at: ${new Date().toISOString()}\n\n`;

  for (const [tblName, cfg] of Object.entries(tables)) {
    sql += `CREATE TABLE IF NOT EXISTS ${tblName} (\n`;
    const colDefs = (cfg.columns || []).map(col => {
      let def = `  ${col.key} ${col.type}`;
      if (col.pk) def += ' PRIMARY KEY';
      return def;
    });
    sql += colDefs.join(',\n');
    sql += '\n);\n\n';

    if (cfg.rows && cfg.rows.length > 0) {
      sql += `-- Initial Seed Data for ${tblName}\n`;
      for (const row of cfg.rows.slice(0, 10)) {
        const keys = Object.keys(row);
        const vals = keys.map(k => {
          const v = row[k];
          if (v === null || v === undefined) return 'NULL';
          if (typeof v === 'number' || typeof v === 'boolean') return String(v);
          return `'${String(v).replace(/'/g, "''")}'`;
        });
        sql += `INSERT INTO ${tblName} (${keys.join(', ')}) VALUES (${vals.join(', ')}) ON CONFLICT DO NOTHING;\n`;
      }
      sql += '\n';
    }
  }

  return sql.trim();
}
