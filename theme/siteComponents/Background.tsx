import React from 'react'

export interface BackgroundProps {}
export function Background({}: BackgroundProps): JSX.Element {
  return (
    <div className="background-container">
      {
        //<div className="background-layer background-layer-1" />
        //<div className="background-layer background-layer-2" />
        //<div className="background-layer background-layer-3" />
        //<div className="background-layer background-layer-4" />
      }
      <div className="background-stars background-stars-1" />
      <div className="background-stars background-stars-2" />
      <div className="background-stars background-stars-3" />
    </div>
  )
}

export default Background
