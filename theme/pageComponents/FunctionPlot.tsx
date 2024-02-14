import type { FunctionPlotOptions } from 'function-plot'

// import functionPlot from 'function-plot'
import { memo, useEffect, useRef } from 'react'

export interface FunctionPlotProps {
  options?: FunctionPlotOptions
}

export const FunctionPlot: React.FC<FunctionPlotProps> = memo(({ options }) => {
  const rootEl = useRef(null)

  useEffect(() => {
    try {
      // functionPlot(Object.assign({}, options, { target: rootEl.current }))
    } catch (e) {}
  })

  return (<div ref={rootEl} />)
}, () => false)

FunctionPlot.displayName = 'FunctionPlot'

export default FunctionPlot
