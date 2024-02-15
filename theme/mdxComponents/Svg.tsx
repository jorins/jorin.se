import React from 'react'

const IsSvgContext = React.createContext(false)

export function useIsInSvg() {
  return React.useContext(IsSvgContext)
}

export function Svg({
  children,
  ...props
}: React.ComponentProps<'svg'>): React.ReactNode {
  return (
    <svg {...props}>
      <IsSvgContext.Provider value={true}>{children}</IsSvgContext.Provider>
    </svg>
  )
}

const exports = {
  svg: Svg,
}

export default exports
