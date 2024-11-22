---
title: KaTeX tests
hidden: true
---

import functionToKatex from 'lib/functionToKatex'
import KatexFunction from 'pageComponents/KatexFunction'
import { succeeding, failing } from 'lib/functionToKatex.cases'

This page is for visual testing of KaTeX expressions in Nextra.

<table>
  <thead>
    <tr>
      <th>Test case name</th>
      <th>Source function</th>
      <th>Expected KaTeX</th>
      <th>Generated KaTeX matches expected?</th>
      <th>Rendered KaTeX</th>
    </tr>
  </thead>
  <tbody> 
  {
    [...succeeding, ...failing].map(({name, fn, expected}) => {
      let match = ''
      try {
        const compiled = functionToKatex(fn)
        if (compiled === expected) {
          match = '✅ Matches'
        } else {
          match = '⚠️  Does not match'
        }
      } catch (e)  {
        match = '🛑 Does not compile'
      }
      return <tr>
        <td>
          {name}
        </td>

        <td>
          <code>{fn.toString()}</code>
        </td>

        <td>
          <code>{expected}</code>
        </td>

        <td>{match}</td>

        <td><KatexFunction fn={fn} /></td>
      </tr>
    })

}

  </tbody>
</table>
