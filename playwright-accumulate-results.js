// playwright-accumulate-results.js
// Script to accumulate Playwright test results into test-results/results.json

const fs = require('fs');
const path = require('path');

const lastRunFile = path.join(__dirname, 'test-results', 'last-run.json');
const resultsFile = path.join(__dirname, 'test-results', 'results.json');

if (!fs.existsSync(lastRunFile)) {
  console.error('No last-run.json found in test-results.');
  process.exit(1);
}

const lastRun = JSON.parse(fs.readFileSync(lastRunFile, 'utf-8'));
let accumulated = [];
if (fs.existsSync(resultsFile)) {
  accumulated = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
}

// Flatten and extract test results from Playwright JSON
function extractResults(report) {
  const results = [];
  for (const suite of report.suites || []) {
    for (const childSuite of suite.suites || []) {
      for (const spec of childSuite.specs || []) {
        for (const test of spec.tests || []) {
          const result = test.results && test.results[0] ? test.results[0] : {};
          results.push({
            description: spec.title,
            steps: [],
            expected: '',
            result: result.status || test.status || '',
            timestamp: result.startTime || new Date().toISOString()
          });
        }
      }
    }
  }
  return results;
}

const newResults = extractResults(lastRun);
accumulated.push(...newResults);
fs.writeFileSync(resultsFile, JSON.stringify(accumulated, null, 2));
console.log('Accumulated results written to', resultsFile);
