export const lessons = [
  {
    id: 'hello-world',
    title: 'Hello, World!',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Welcome to Python! 🐍</h2>
      <p class="mb-4">Let's start with the classic first program - printing "Hello, World!" to the screen.</p>
      <p class="mb-4">In Python, we use the <code class="px-2 py-1 bg-purple-500/20 rounded text-purple-400">print()</code> function to display text.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Syntax</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>print("Your message here")</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Try it!</h3>
      <p>Run the code on the right to see your first Python output!</p>
    `,
    starterCode: '# Your first Python program!\nprint("Hello, World!")\n',
  },
  {
    id: 'variables',
    title: 'Variables',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Variables in Python</h2>
      <p class="mb-4">Variables are containers for storing data values. In Python, you create a variable by assigning a value to it.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Creating Variables</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>name = "Alice"
age = 25
height = 5.9</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Rules for Variable Names</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-300">
        <li>Must start with a letter or underscore</li>
        <li>Can contain letters, numbers, and underscores</li>
        <li>Case-sensitive (age and Age are different)</li>
      </ul>
      <h3 class="text-lg font-semibold mt-6 mb-2">Try it!</h3>
      <p>Create some variables and print them!</p>
    `,
    starterCode: '# Create variables and print them\nname = "Python Learner"\nage = 1\n\nprint("Hello, I am", name)\nprint("I am", age, "day old!")\n',
  },
  {
    id: 'data-types',
    title: 'Data Types',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Python Data Types</h2>
      <p class="mb-4">Python has several built-in data types:</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Common Types</h3>
      <ul class="space-y-3 text-gray-300">
        <li><code class="px-2 py-1 bg-purple-500/20 rounded text-purple-400">str</code> - Text: "Hello"</li>
        <li><code class="px-2 py-1 bg-pink-500/20 rounded text-pink-400">int</code> - Whole numbers: 42</li>
        <li><code class="px-2 py-1 bg-cyan-500/20 rounded text-cyan-400">float</code> - Decimals: 3.14</li>
        <li><code class="px-2 py-1 bg-green-500/20 rounded text-green-400">bool</code> - True/False</li>
      </ul>
      <h3 class="text-lg font-semibold mt-6 mb-2">Check Type</h3>
      <p>Use <code class="px-2 py-1 bg-purple-500/20 rounded text-purple-400">type()</code> to check a value's type.</p>
    `,
    starterCode: '# Explore different data types\ntext = "Hello Python"\nnumber = 42\ndecimal = 3.14159\nis_fun = True\n\nprint("text:", text, type(text))\nprint("number:", number, type(number))\nprint("decimal:", decimal, type(decimal))\nprint("is_fun:", is_fun, type(is_fun))\n',
  },
  {
    id: 'strings',
    title: 'Working with Strings',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">String Operations</h2>
      <p class="mb-4">Strings are sequences of characters. Python provides many useful methods to work with them.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">String Methods</h3>
      <ul class="space-y-2 text-gray-300 font-mono text-sm">
        <li><code>.upper()</code> - UPPERCASE</li>
        <li><code>.lower()</code> - lowercase</li>
        <li><code>.strip()</code> - Remove whitespace</li>
        <li><code>.replace(old, new)</code> - Replace text</li>
        <li><code>.split()</code> - Split into list</li>
      </ul>
      <h3 class="text-lg font-semibold mt-6 mb-2">F-Strings (Formatted Strings)</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>name = "World"
print(f"Hello, {name}!")</code></pre>
    `,
    starterCode: '# String operations\ntext = "  Python is Awesome!  "\n\nprint("Original:", text)\nprint("Upper:", text.upper())\nprint("Lower:", text.lower())\nprint("Stripped:", text.strip())\n\n# F-strings\nname = "Python"\nversion = 3.12\nprint(f"{name} version {version} is great!")\n',
  },
  {
    id: 'numbers',
    title: 'Numbers and Math',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Numbers & Math Operations</h2>
      <p class="mb-4">Python supports various mathematical operations.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Operators</h3>
      <ul class="space-y-2 text-gray-300 font-mono text-sm">
        <li><code>+</code> Addition</li>
        <li><code>-</code> Subtraction</li>
        <li><code>*</code> Multiplication</li>
        <li><code>/</code> Division (float)</li>
        <li><code>//</code> Floor Division (int)</li>
        <li><code>%</code> Modulo (remainder)</li>
        <li><code>**</code> Exponent (power)</li>
      </ul>
    `,
    starterCode: '# Math operations\na = 10\nb = 3\n\nprint(f"{a} + {b} = {a + b}")\nprint(f"{a} - {b} = {a - b}")\nprint(f"{a} * {b} = {a * b}")\nprint(f"{a} / {b} = {a / b}")\nprint(f"{a} // {b} = {a // b}")\nprint(f"{a} % {b} = {a % b}")\nprint(f"{a} ** {b} = {a ** b}")\n',
  },
  {
    id: 'lists',
    title: 'Lists',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Lists in Python</h2>
      <p class="mb-4">Lists are ordered, mutable collections that can hold different types.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Creating Lists</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">List Methods</h3>
      <ul class="space-y-2 text-gray-300 font-mono text-sm">
        <li><code>.append(item)</code> - Add to end</li>
        <li><code>.insert(i, item)</code> - Insert at index</li>
        <li><code>.remove(item)</code> - Remove item</li>
        <li><code>.pop()</code> - Remove & return last</li>
        <li><code>len(list)</code> - Get length</li>
      </ul>
    `,
    starterCode: '# Working with lists\nfruits = ["apple", "banana", "cherry"]\n\nprint("Original:", fruits)\nprint("First fruit:", fruits[0])\nprint("Last fruit:", fruits[-1])\n\n# Add item\nfruits.append("orange")\nprint("After append:", fruits)\n\n# List length\nprint("Total fruits:", len(fruits))\n',
  },
  {
    id: 'conditionals',
    title: 'If Statements',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Conditional Statements</h2>
      <p class="mb-4">Control the flow of your program with if, elif, and else.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Syntax</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>if condition:
    # code if true
elif another_condition:
    # code if this is true
else:
    # code if all false</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Comparison Operators</h3>
      <ul class="space-y-1 text-gray-300 font-mono text-sm">
        <li><code>==</code> Equal</li>
        <li><code>!=</code> Not equal</li>
        <li><code>&lt;</code> <code>&gt;</code> Less/Greater than</li>
        <li><code>&lt;=</code> <code>&gt;=</code> Less/Greater or equal</li>
      </ul>
    `,
    starterCode: '# Conditional statements\nage = 18\n\nif age < 13:\n    print("Child")\nelif age < 20:\n    print("Teenager")\nelif age < 65:\n    print("Adult")\nelse:\n    print("Senior")\n\n# Try changing the age!\n',
  },
  {
    id: 'loops',
    title: 'Loops',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Loops in Python</h2>
      <p class="mb-4">Loops let you repeat code multiple times.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">For Loop</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>for item in collection:
    # do something</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">While Loop</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>while condition:
    # do something</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Range Function</h3>
      <p><code class="px-2 py-1 bg-purple-500/20 rounded text-purple-400">range(start, stop, step)</code> generates numbers.</p>
    `,
    starterCode: '# For loop\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(f"I like {fruit}")\n\nprint("---")\n\n# Range\nfor i in range(1, 6):\n    print(f"Count: {i}")\n\nprint("---")\n\n# While loop\ncount = 3\nwhile count > 0:\n    print(f"Countdown: {count}")\n    count -= 1\nprint("Blast off! 🚀")\n',
  },
  {
    id: 'functions',
    title: 'Functions',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Functions</h2>
      <p class="mb-4">Functions are reusable blocks of code that perform specific tasks.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Defining Functions</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>def function_name(parameters):
    # code
    return result</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Parameters & Arguments</h3>
      <ul class="space-y-2 text-gray-300">
        <li>• Parameters: Variables in function definition</li>
        <li>• Arguments: Values passed when calling</li>
        <li>• Default values: <code>def greet(name="World")</code></li>
      </ul>
    `,
    starterCode: '# Defining and calling functions\ndef greet(name):\n    return f"Hello, {name}!"\n\ndef add(a, b):\n    return a + b\n\ndef is_even(number):\n    return number % 2 == 0\n\n# Call the functions\nprint(greet("Python Learner"))\nprint(f"5 + 3 = {add(5, 3)}")\nprint(f"Is 42 even? {is_even(42)}")\nprint(f"Is 7 even? {is_even(7)}")\n',
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries',
    content: `
      <h2 class="text-2xl font-bold mb-4 gradient-text">Dictionaries</h2>
      <p class="mb-4">Dictionaries store data in key-value pairs.</p>
      <h3 class="text-lg font-semibold mt-6 mb-2">Creating Dictionaries</h3>
      <pre class="bg-black/50 p-4 rounded-lg mb-4 font-mono text-sm"><code>person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}</code></pre>
      <h3 class="text-lg font-semibold mt-6 mb-2">Common Operations</h3>
      <ul class="space-y-2 text-gray-300 font-mono text-sm">
        <li><code>dict[key]</code> - Access value</li>
        <li><code>dict[key] = value</code> - Set/update</li>
        <li><code>.keys()</code> - Get all keys</li>
        <li><code>.values()</code> - Get all values</li>
        <li><code>.items()</code> - Get key-value pairs</li>
      </ul>
    `,
    starterCode: '# Working with dictionaries\nperson = {\n    "name": "Alice",\n    "age": 25,\n    "skills": ["Python", "JavaScript"]\n}\n\nprint(f"Name: {person[\\"name\\"]}")\nprint(f"Age: {person[\\"age\\"]}")\n\n# Add new key\nperson["city"] = "New York"\n\n# Loop through dictionary\nprint("\\nAll info:")\nfor key, value in person.items():\n    print(f"  {key}: {value}")\n',
  },
];
