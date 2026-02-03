/**
 * Test Runner - Execute user code against test cases
 * Compares actual vs expected output for Python challenges
 */

import { runPython, loadPyodide } from './pythonRunner';

/**
 * Test case structure
 * @typedef {{
 *   input: string,
 *   expected: string,
 *   description?: string
 * }} TestCase
 */

/**
 * Test result structure
 * @typedef {{
 *   input: string,
 *   expected: string,
 *   actual: string,
 *   passed: boolean,
 *   description?: string,
 *   error?: string
 * }} TestResult
 */

/**
 * Run user code against a set of test cases
 * @param {string} userCode - The user's Python code
 * @param {TestCase[]} testCases - Array of test cases
 * @param {string} functionName - Name of function to test (optional)
 * @returns {Promise<{passed: number, failed: number, total: number, results: TestResult[]}>}
 */
export async function runTests(userCode, testCases, functionName = null) {
  // Ensure Pyodide is initialized
  await loadPyodide();

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    const result = await runSingleTest(userCode, testCase, functionName);
    results.push(result);
    
    if (result.passed) {
      passed++;
    } else {
      failed++;
    }
  }

  return {
    passed,
    failed,
    total: testCases.length,
    results,
    score: Math.round((passed / testCases.length) * 100),
  };
}

/**
 * Run a single test case
 * @param {string} userCode 
 * @param {TestCase} testCase 
 * @param {string|null} functionName 
 * @returns {Promise<TestResult>}
 */
async function runSingleTest(userCode, testCase, functionName) {
  const { input, expected, description } = testCase;

  try {
    let codeToRun;
    
    if (functionName) {
      // If testing a function, call it with the input
      codeToRun = `
${userCode}

# Test the function
_test_result = ${functionName}(${input})
print(_test_result)
`;
    } else {
      // If testing output-based code, we need to provide input
      // and capture the output
      codeToRun = `
# Simulate input
import sys
from io import StringIO

_test_input = """${input}"""
sys.stdin = StringIO(_test_input)

${userCode}
`;
    }

    const result = await runPython(codeToRun, 5000);
    
    // Normalize outputs for comparison
    const actualOutput = normalizeOutput(result.output);
    const expectedOutput = normalizeOutput(expected);
    
    const passed = actualOutput === expectedOutput;

    return {
      input,
      expected: expectedOutput,
      actual: actualOutput,
      passed,
      description,
      error: result.error,
    };
  } catch (error) {
    return {
      input,
      expected: normalizeOutput(expected),
      actual: '',
      passed: false,
      description,
      error: error.message,
    };
  }
}

/**
 * Normalize output for comparison
 * - Trim whitespace
 * - Normalize line endings
 * - Handle trailing newlines
 * @param {string} output 
 * @returns {string}
 */
function normalizeOutput(output) {
  if (!output) return '';
  
  return output
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');
}

/**
 * Create a test case easily
 * @param {string} input 
 * @param {string} expected 
 * @param {string} description 
 * @returns {TestCase}
 */
export function createTestCase(input, expected, description = '') {
  return { input, expected, description };
}

/**
 * Run tests for function-based challenges
 * The user code should define a function that we can call
 * @param {string} userCode 
 * @param {string} functionName 
 * @param {{args: any[], expected: any, description?: string}[]} testCases 
 */
export async function runFunctionTests(userCode, functionName, testCases) {
  await loadPyodide();

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    const { args, expected, description } = testCase;
    
    // Format args for Python
    const argsStr = args.map(arg => JSON.stringify(arg)).join(', ');
    
    const code = `
${userCode}

# Call the function with test arguments
_result = ${functionName}(${argsStr})
print(repr(_result))
`;

    try {
      const result = await runPython(code, 5000);
      const actualOutput = result.output.trim();
      const expectedStr = JSON.stringify(expected);
      
      // Compare as Python repr values
      const actualParsed = actualOutput;
      const expectedParsed = toPythonRepr(expected);
      
      const testPassed = actualParsed === expectedParsed || actualOutput === String(expected);

      results.push({
        input: `${functionName}(${argsStr})`,
        expected: String(expected),
        actual: actualOutput,
        passed: testPassed,
        description,
        error: result.error,
      });

      if (testPassed) passed++;
      else failed++;
    } catch (error) {
      results.push({
        input: `${functionName}(${argsStr})`,
        expected: String(expected),
        actual: '',
        passed: false,
        description,
        error: error.message,
      });
      failed++;
    }
  }

  return {
    passed,
    failed,
    total: testCases.length,
    results,
    score: Math.round((passed / testCases.length) * 100),
  };
}

/**
 * Convert JS value to Python repr string
 */
function toPythonRepr(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  }
  if (value === null) {
    return 'None';
  }
  if (Array.isArray(value)) {
    return `[${value.map(toPythonRepr).join(', ')}]`;
  }
  return String(value);
}

export default {
  runTests,
  runFunctionTests,
  createTestCase,
};
