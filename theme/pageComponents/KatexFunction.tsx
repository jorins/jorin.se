import React from 'react'
// import { InlineMath, BlockMath } from 'react-katex'
import functionToKatex from '../lib/functionToKatex'

export interface KatexFunctionProps {
  fn: Function
  inline?: boolean
}

export function KatexFunction({ fn, inline }: KatexFunctionProps): JSX.Element {
  try {
    const functionAsKatexString = functionToKatex(fn)
    // const Math = inline ?? false ? InlineMath : BlockMath
    // return <Math>{functionAsKatexString}</Math>
    return <></>
  } catch (e: unknown) {
    console.error(e)
    return (
      <span className="katex-error">
        Failed to convert JS function to KaTeX, reason:
        <code className="katex-error-reason">{e?.toString() ?? 'Cannot convert error to string'}</code>
      </span>
    )
  }
}

export default KatexFunction
