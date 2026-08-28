import { EventEmitter } from 'events';

// Tracks ports assigned to running dev servers
const assigned = new Map(); // repoName -> port
let nextPort = 5200;

export function assignPort(repoName) {
  if (assigned.has(repoName)) return assigned.get(repoName);
  const port = nextPort++;
  assigned.set(repoName, port);
  return port;
}

export function getPort(repoName) {
  return assigned.get(repoName) || null;
}

export function releasePort(repoName) {
  assigned.delete(repoName);
}
