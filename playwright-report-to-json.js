// playwright-report-to-json.js
// Script to append Playwright test results to a JSON file after each run

const fs = require('fs');
const path = require('path');

const resultsFile = path.join(__dirname, 'tests', 'oversight.spec.results.json');
const reportFile = path.join(__dirname, 'test-results', 'results.json');

// Read Playwright's JSON report (if it exists)
if (!fs.existsSync(reportFile)) {
  console.error('No Playwright JSON report found at', reportFile);
  process.exit(1);
}
const report = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));

// Read or initialize the results file
let results = [];
if (fs.existsSync(resultsFile)) {
  results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
}

// Append new results
for (const suite of report.suites || []) {
  for (const test of suite.specs || []) {
    for (const run of test.tests || []) {
      results.push({
        description: test.title,
        steps: [],
        expected: '',
        result: run.status,
        timestamp: new Date().toISOString()
      });
    }
  }
}

fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
console.log('Results appended to', resultsFile);
