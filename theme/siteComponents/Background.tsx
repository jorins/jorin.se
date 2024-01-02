import React from 'react'

export interface BackgroundProps {}

/**
 * The starry background
 */
export function Background({}: BackgroundProps): JSX.Element {
  return (
    <div className="background-container">
      <div className="background-stars background-stars-1" />
      <div className="background-stars background-stars-2" />
      <div className="background-stars background-stars-3" />
    </div>
  )
}

export default Background
