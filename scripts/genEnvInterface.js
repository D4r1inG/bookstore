/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Read the env.example file
const envExamplePath = path.join(__dirname, '../.env.example');
const content = fs.readFileSync(envExamplePath, 'utf8');

// Parse the content
const lines = content.split('\n');
const keys = lines.map((line) => line.split('=')[0].trim()).filter(Boolean);

// Generate the interface
const interfaceContent = `
/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    ${keys.map((key) => `${key}: string;`).join('\n    ')}
  }
}`;

// Write the interface to a file
const outputPath = path.join(__dirname, '../env.d.ts');
fs.writeFileSync(outputPath, interfaceContent);

console.log('ProcessEnv interface generated successfully.');
