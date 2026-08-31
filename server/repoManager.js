import path from 'path';
import os from 'os';
import fs from 'fs';

// All repos are cloned under ~/calvras-repos/
export const WORKSPACE = path.join(os.homedir(), 'calvras-repos');

// Ensure workspace dir exists
if (!fs.existsSync(WORKSPACE)) {
  fs.mkdirSync(WORKSPACE, { recursive: true });
}

export function repoPath(repoName) {
  return path.join(WORKSPACE, repoName);
}

export function repoExists(repoName) {
  return fs.existsSync(repoPath(repoName));
}

// Recursively list all files in a directory as relative paths
export function listFilesRecursive(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // Skip node_modules and .git
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(fullPath, base));
    } else {
      results.push(path.relative(base, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}
