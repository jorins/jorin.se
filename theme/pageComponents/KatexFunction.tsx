import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import functionToKatex from '../lib/functionToKatex'

export interface KatexFunctionProps {
  fn: Function,
  inline?: boolean
}

export function KatexFunction({fn, inline}: KatexFunctionProps): JSX.Element {
  try {
    const functionAsKatexString = functionToKatex(fn)
      const Math = inline ?? false
      ? InlineMath
      : BlockMath
      return <Math>{functionAsKatexString}</Math>
  } catch (e) {
    console.error(e)
    return <span className="katex-error">
      Failed to convert JS function to KaTeX, reason:
      <code className="katex-error-reason">{e.toString()}</code>
    </span>
  }
}

export default KatexFunction
