#!/usr/bin/env node

import { BybitMCPServer } from './server.js';
import { loadConfig, validateConfig } from './config.js';

process.env.TZ = 'UTC';

function logError(error: unknown) {
  console.error('Server error:', error);
  process.exit(1);
}

async function main() {
  try {
    const config = loadConfig();
    validateConfig(config);
    
    const server = new BybitMCPServer(config);
    await server.start();
  } catch (error) {
    logError(error);
  }
}

main().catch(logError);