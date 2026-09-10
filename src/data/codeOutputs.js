export const CODE_OUTPUTS = [
  { code: `def f(x, y=[]):\n    y.append(x)\n    return y\n\nprint(f(1))\nprint(f(2))`, output: "[1]\n[1, 2]", exp: "Mutable default arguments are created once and shared across calls — a classic Python gotcha." },
  { code: `x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)`, output: "[1, 2, 3, 4]", exp: "y = x doesn't copy the list — both names point at the same object in memory." },
  { code: `print(3 * "ab" + "c")`, output: "ababc", exp: "String multiplication repeats the string, then concatenation appends 'c'." },
  { code: `a, b = 0, 1\nfor _ in range(5):\n    a, b = b, a + b\nprint(a)`, output: "5", exp: "This is the Fibonacci sequence: 0, 1, 1, 2, 3, 5 — a lands on 5 after five steps." },
  { code: `print(bool(0) or bool("False"))`, output: "True", exp: "bool(0) is False, but the string \"False\" is non-empty so it's truthy — or short-circuits to True." },
  { code: `print("Hello"[::-1])`, output: "olleH", exp: "Slicing with a step of -1 reverses the string." },
  { code: `try:\n    print(1/0)\nexcept ZeroDivisionError:\n    print("caught")\nfinally:\n    print("done")`, output: "caught\ndone", exp: "The division raises, the except block prints 'caught', then finally always runs." },
  { code: `print(sorted([3, 1, 2], reverse=True))`, output: "[3, 2, 1]", exp: "sorted() with reverse=True returns a new list in descending order." },
];
