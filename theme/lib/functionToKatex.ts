import type {
  BinaryExpression,
  CallExpression,
  Expression,
  Identifier,
  MemberExpression,
  SpreadElement,
} from 'acorn'

import { parse } from 'acorn-loose'

function json(i: any): string {
  return JSON.stringify(i, undefined, 2)
}

/**
 * Generate KaTeX source code from a function.
 *
 * The function is put straight into the Acorn parser, which expects a full
 * program body. Therefore, it must be defined with a `function` statement and
 * a name, so that it looks like a top-level function definition to Acorn.
 *
 * Functions are expected to have a single `return` with an expression. It is
 * optionally wrapped in a domain-validating `if`-condition.
 *
 * @example
 * A linear function defined for all possible values of `x`:
 *
 * ```javascript
 * const myFn = function f(x) {
 *   return 3 * (x + 4)
 * }
 * functionToKatex(myFn)
 * // => "f(x) = 3(x + 4)"
 * ```
 *
 * @example
 * Function definition of 1/x with domain validation
 * ```javascript
 * const myFn = function f(x) {
 *  if (x !== 0) return 1/x
 * }
 * functionToKatex(myFn)
 * // => "f(x) = 1/x, x \\not = 0"
 * ```
 */
export default function functionToKatex(code: Function): string {
  // Build AST from function
  const codeStr = code.toString()
  const program = parse(codeStr, {
    ecmaVersion: 'latest',
  })

  // Extract first statement, assert it's a function
  const fn = program.body[0]
  if (fn.type !== 'FunctionDeclaration') {
    throw new SyntaxError(
      `Katex conversion target is not a function. This
      should have been made impossible by TypeScript.`,
    )
  }

  // Grab function and parameter names, while verifying parameters are plain parameters..
  const name = fn.id.name
  const params = fn.params.map(param => {
    if (param.type !== 'Identifier') {
      throw new SyntaxError(
        `Function ${name} has unsupported parameter type ${json(param)}`,
      )
    }

    return param.name
  })

  // Grab the function's body and make sure it's a single statement.
  const body = fn.body.body
  if (body.length > 1) {
    throw new SyntaxError(
      `Function ${name} has multiple statements. Expected a single return statement.`,
    )
  }

  // Make sure the one statement is a return statement
  const returnStatement = body[0]
  if (returnStatement.type !== 'ReturnStatement') {
    throw new SyntaxError(
      `Function ${name} does not begin with a return statement. Expected a single return statement.`,
    )
  }

  // Assert that the return statement has arguments
  const returnExpression = returnStatement.argument
  if (returnExpression === undefined) {
    throw new SyntaxError(`Function ${name} returns void. Expected a value.`)
  }

  const resolvedReturnExpression = resolve(returnExpression)

  const res = `${fn.id.name}(${params}) = ${resolvedReturnExpression}`
  return res
}

/**
 * Get a KaTeX representation of a given expression.
 */
function resolve(e: Expression): string {
  switch (e.type) {
    case 'Identifier':
      return e.name

    case 'Literal':
      return e.value.toString()

    case 'ArrayExpression':
      const values = e.elements.map(resolve).join(' & ')
      return `
        \\begin{bmatrix}
        ${values}
        \\end{bmatrix}
      `

    case 'BinaryExpression':
      return resolveBinaryExpression(e)

    case 'ParenthesizedExpression':
      return `(${resolve(e.expression)})`

    case 'CallExpression':
      return resolveCallExpression(e)

    case 'MemberExpression':
      if (e.object.type === 'Super') {
        throw new SyntaxError(
          `Unsupported object type Super in expression ${json(e.object)}`,
        )
      }
      if (e.property.type === 'PrivateIdentifier') {
        throw new SyntaxError(
          `Unsupported object type PrivateIdentifier in expression ${json(
            e.property,
          )}`,
        )
      }
      return `${resolve(e.object)}.${resolve(e.property)}`

    default:
      throw new SyntaxError(`Unsupported expression type '${e.type}'.`)
  }
}

/**
 * Generate a KaTeX representation of a binary expression.
 */
function resolveBinaryExpression(e: BinaryExpression): string {
  if (e.left.type === 'PrivateIdentifier') {
    throw new SyntaxError(
      `Unhandled private identifier '${e.left.name}' in binary expression with operator '${e.operator}'`,
    )
  }

  const left = e.left
  const right = e.right
  const wrap = (i: string) => `${resolve(left)} ${i} ${resolve(right)}`

  switch (e.operator) {
    case '==':
    case '===':
      return wrap('=')
    case '!=':
    case '!==':
      return wrap('\\not =')
    case '+':
      return wrap('+')
    case '-':
      return wrap('-')
    case '*':
      return resolveMultiplicationExpression(left, right)
    case '/':
      return `\\dfrac{${resolve(left)}}{${resolve(right)}}`
    case '%':
      return wrap('\\bmod')
    case '**':
      return wrap('^')

    default:
      throw new SyntaxError(`Unsupported binary operator '${e.operator}'`)
  }
}

function resolveMultiplicationExpression(
  left: Expression,
  right: Expression,
): string {
  type Resolver = typeof resolveMultiplicationExpression
  type PartialExpressionRecord<Val> = Partial<Record<typeof left.type, Val>> &
    Record<'*', Val>

  const direct: Resolver = (left, right) => `${resolve(left)}${resolve(right)}`
  const cdot: Resolver = (left, right) =>
    `${resolve(left)} \\cdot ${resolve(right)}`
  const parensR: Resolver = (left, right) =>
    `${resolve(left)}(${resolve(right)})`
  const parensBoth: Resolver = (left, right) =>
    `(${resolve(left)})(${resolve(right)})`
  const swap: Resolver = (left, right) =>
    resolveMultiplicationExpression(right, left)

  const cases: PartialExpressionRecord<PartialExpressionRecord<Resolver>> = {
    'Literal': {
      'Literal': cdot,
      'Identifier': direct,
      'ParenthesizedExpression': parensR,
      'BinaryExpression': parensR,
      '*': parensR,
    },

    'Identifier': {
      'Literal': swap,
      'Identifier': (left, right) => {
        if (left.type !== 'Identifier' || right.type !== 'Identifier') {
          throw new Error('Not identifiers')
        }
        if (left.name.length === 1 && right.name.length === 1) {
          return direct(left, right)
        } else {
          return cdot(left, right)
        }
      },

      '*': parensBoth,
    },

    '*': {
      'Literal': swap,
      'Identifier': swap,
      '*': parensBoth,
    },
  }

  const resolverCategory = cases[left.type] ?? cases['*']
  const resolver = resolverCategory[right.type] ?? resolverCategory['*']
  return resolver(left, right)
}

function resolveCallExpression(e: CallExpression): string {
  type ReprFn = (args: Expression[]) => string
  type ReprTable = Record<string, ReprFn>
  type ResolveAndJoinArgs = {
    args: Expression[]
    separator?: string
    postProcess?: (i: string) => string
  }

  function makeParensReprFn(functionName: string): ReprFn {
    return args => `${functionName}(${resolveAndJoin({ args })})`
  }

  function makeBraceReprFn(functionName: string): ReprFn {
    return args => `${functionName}{${resolveAndJoin({ args })}}`
  }

  function resolveAndJoin({
    args,
    separator = ',',
    postProcess = (i: string) => i,
  }: ResolveAndJoinArgs): string {
    return args.map(resolve).map(postProcess).join(separator)
  }

  /**
   * Hard-coded special representations for functions. Primarily for `Math`.
   */
  const specialRepr: ReprTable = {
    'Math.abs': args => `|${args.map(resolve).join(',')}|`,
    'Math.acos': makeParensReprFn('cos^-1'),
    'Math.asin': makeParensReprFn('sin^-1'),
    'Math.asinh': makeParensReprFn('sinh^-1'),
    'Math.atan': makeParensReprFn('tan^-1'),
    'Math.atan2': makeParensReprFn('cos^-1'),
    'Math.atanh': makeParensReprFn('tanh^-1'),
    'Math.cbrt': makeBraceReprFn('\\sqrt[3]'),
    'Math.ceil': makeParensReprFn('ceil'),
    'Math.clz32': makeParensReprFn('clz32'),
    'Math.cos': makeParensReprFn('cos'),
    'Math.cosh': makeParensReprFn('cosh'),
    'Math.exp': makeBraceReprFn('e^'),
    'Math.expm1': args => `e^{${resolveAndJoin({ args })}} - 1`,
    'Math.floor': makeParensReprFn('floor'),
    'Math.fround': makeParensReprFn('fround'),
    'Math.hypot': args =>
      `\\sqrt{${resolveAndJoin({
        args,
        separator: ' + ',
        postProcess: i => `${i}^2`,
      })}}`,
    'Math.imul': makeParensReprFn('imul'),
    'Math.log': makeParensReprFn('ln'),
    'Math.log10': makeParensReprFn('log_10'),
    'Math.log1p': args => `ln(1 + ${resolveAndJoin({ args })})`,
    'Math.log2': makeParensReprFn('log_2'),
    'Math.max': makeParensReprFn('max'),
    'Math.min': makeParensReprFn('min'),
    'Math.pow': ([a, b]) => `${resolve(a)}^{${resolve(b)}}`,
    'Math.random': makeParensReprFn('rand'),
    'Math.sign': makeParensReprFn('sign'),
    'Math.sin': makeParensReprFn('sin'),
    'Math.sqrt': makeBraceReprFn('\\sqrt'),
    'Math.tan': makeParensReprFn('tan'),
    'Math.tanh': makeParensReprFn('tanh'),
    'Math.trunc': makeParensReprFn('trunc'),
  }

  function throwOnSpreadElement(
    arg: Expression | SpreadElement,
  ): arg is Expression {
    if (arg.type === 'SpreadElement') {
      throw new Error('Unsupported spread arguments')
    }
    return true
  }
  const args: Expression[] = e.arguments.filter(throwOnSpreadElement)

  function resolveFunctionRepr(subExpr: typeof e.callee): ReprFn {
    if (subExpr.type === 'Super') {
      throw new SyntaxError('Cannot resolve super')
    }
    const key = resolve(subExpr)
    const fn = specialRepr[key]
    return fn ?? makeParensReprFn(key)
  }

  const fnRepr = resolveFunctionRepr(e.callee)
  return fnRepr(args)
}
