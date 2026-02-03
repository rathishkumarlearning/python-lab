/**
 * TestResults - Display test case results with pass/fail indicators
 */

import React from 'react';

/**
 * TestResults component
 * @param {{
 *   results: {passed: number, failed: number, total: number, score: number, results: Array},
 *   isRunning?: boolean
 * }} props
 */
export function TestResults({ results, isRunning = false }) {
  if (isRunning) {
    return (
      <div className="test-results test-results--loading">
        <div className="test-results__header">
          <span className="test-results__spinner">⏳</span>
          <span>Running tests...</span>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="test-results test-results--empty">
        <p className="test-results__placeholder">
          Run your code to see test results
        </p>
      </div>
    );
  }

  const { passed, failed, total, score, results: testResults } = results;
  const allPassed = failed === 0;

  return (
    <div className={`test-results ${allPassed ? 'test-results--success' : 'test-results--failure'}`}>
      {/* Summary Header */}
      <div className="test-results__header">
        <div className="test-results__score">
          {allPassed ? (
            <span className="test-results__icon test-results__icon--success">🎉</span>
          ) : (
            <span className="test-results__icon test-results__icon--partial">📝</span>
          )}
          <span className="test-results__score-text">
            {passed}/{total} tests passed
          </span>
          <span className={`test-results__percentage ${allPassed ? 'text-green-500' : 'text-yellow-500'}`}>
            ({score}%)
          </span>
        </div>
        {allPassed && (
          <span className="test-results__badge test-results__badge--success">
            ✓ All Tests Passed!
          </span>
        )}
      </div>

      {/* Individual Test Results */}
      <div className="test-results__list">
        {testResults.map((result, index) => (
          <TestResultItem key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  );
}

/**
 * Individual test result item
 */
function TestResultItem({ result, index }) {
  const { input, expected, actual, passed, description, error } = result;

  return (
    <div className={`test-result-item ${passed ? 'test-result-item--passed' : 'test-result-item--failed'}`}>
      {/* Pass/Fail indicator */}
      <div className="test-result-item__status">
        {passed ? (
          <span className="test-result-item__icon test-result-item__icon--pass" title="Passed">
            ✓
          </span>
        ) : (
          <span className="test-result-item__icon test-result-item__icon--fail" title="Failed">
            ✗
          </span>
        )}
      </div>

      {/* Test details */}
      <div className="test-result-item__content">
        <div className="test-result-item__header">
          <span className="test-result-item__title">
            Test {index + 1}
            {description && <span className="test-result-item__description">: {description}</span>}
          </span>
        </div>

        {/* Input */}
        <div className="test-result-item__row">
          <span className="test-result-item__label">Input:</span>
          <code className="test-result-item__value">{input || '(none)'}</code>
        </div>

        {/* Expected */}
        <div className="test-result-item__row">
          <span className="test-result-item__label">Expected:</span>
          <code className="test-result-item__value test-result-item__value--expected">
            {expected || '(empty)'}
          </code>
        </div>

        {/* Actual (show differently based on pass/fail) */}
        {!passed && (
          <div className="test-result-item__row">
            <span className="test-result-item__label">Actual:</span>
            <code className="test-result-item__value test-result-item__value--actual">
              {actual || '(empty)'}
            </code>
          </div>
        )}

        {/* Error message if any */}
        {error && (
          <div className="test-result-item__error">
            <span className="test-result-item__error-label">Error:</span>
            <pre className="test-result-item__error-message">{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Simple progress bar for score visualization
 */
export function TestScoreBar({ score }) {
  const getColor = () => {
    if (score === 100) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="test-score-bar">
      <div className="test-score-bar__track">
        <div 
          className={`test-score-bar__fill ${getColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="test-score-bar__label">{score}%</span>
    </div>
  );
}

export default TestResults;
