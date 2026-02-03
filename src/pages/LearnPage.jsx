/**
 * LearnPage - Python learning lessons with interactive examples
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePython } from '../hooks/usePython';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import SplitPane from '../components/SplitPane';

const LESSONS = [
  {
    id: 'hello-world',
    title: 'Hello, World!',
    description: 'Your first Python program',
    content: `
# Welcome to Python! 🐍

Python is one of the easiest programming languages to learn.
Let's start with the classic "Hello, World!" program.

The \`print()\` function displays text on the screen.
    `,
    code: `# Your first Python program!
print("Hello, World!")

# Try changing the message
print("Python is awesome!")`,
  },
  {
    id: 'variables',
    title: 'Variables',
    description: 'Storing and using data',
    content: `
# Variables 📦

Variables are like labeled boxes that store data.
In Python, you create a variable by giving it a name and a value.

\`\`\`python
name = "Alice"    # String (text)
age = 25          # Integer (whole number)
height = 5.7      # Float (decimal number)
is_student = True # Boolean (True/False)
\`\`\`
    `,
    code: `# Create some variables
name = "Alice"
age = 25
city = "New York"

# Print them out
print(f"Hello, my name is {name}")
print(f"I am {age} years old")
print(f"I live in {city}")`,
  },
  {
    id: 'lists',
    title: 'Lists',
    description: 'Working with collections',
    content: `
# Lists 📝

Lists store multiple items in a single variable.
They're ordered, changeable, and allow duplicates.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
\`\`\`
    `,
    code: `# Create a list
fruits = ["apple", "banana", "cherry"]

# Print the list
print("My fruits:", fruits)

# Access items by index (starts at 0)
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])

# Add a new item
fruits.append("orange")
print("After adding orange:", fruits)

# List length
print("I have", len(fruits), "fruits")`,
  },
];

export function LearnPage() {
  const { lessonId } = useParams();
  const { runCode, isLoading, isReady, isRunning, output, error, clearOutput } = usePython();
  
  const currentLesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const [code, setCode] = useState(currentLesson.code);

  useEffect(() => {
    setCode(currentLesson.code);
    clearOutput();
  }, [lessonId, currentLesson.code, clearOutput]);

  const handleRun = async () => {
    await runCode(code);
  };

  return (
    <div className="learn-page h-full flex">
      {/* Lesson Sidebar */}
      <div className="w-64 bg-gray-100 border-r overflow-y-auto">
        <h2 className="p-4 font-bold text-lg border-b">Lessons</h2>
        <nav className="p-2">
          {LESSONS.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/learn/${lesson.id}`}
              className={`block p-3 rounded mb-1 ${
                lesson.id === currentLesson.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{lesson.title}</div>
              <div className="text-sm opacity-75">{lesson.description}</div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Lesson Header */}
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          <p className="text-gray-600">{currentLesson.description}</p>
        </div>

        {/* Lesson Content & Code */}
        <SplitPane>
          {/* Instructions */}
          <div className="p-4 overflow-y-auto bg-gray-50">
            <div className="prose max-w-none whitespace-pre-wrap">
              {currentLesson.content}
            </div>
          </div>

          {/* Code Editor & Output */}
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <CodeEditor
                value={code}
                onChange={setCode}
                disabled={!isReady}
              />
            </div>
            <div className="p-2 border-t bg-gray-100">
              <button
                onClick={handleRun}
                disabled={!isReady || isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isRunning ? '⏳ Running...' : '▶️ Run'}
              </button>
            </div>
            <div className="h-48 border-t">
              <OutputPanel output={output} error={error} isLoading={isLoading} />
            </div>
          </div>
        </SplitPane>
      </div>
    </div>
  );
}

export default LearnPage;
