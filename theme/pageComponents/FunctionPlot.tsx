import React from "react";
import functionToKatex from "../lib/functionToKatex.ts";

const functionPlot = require("function-plot");

let idCounter = 1;
function getId(): string {
  return `function-plot-${idCounter++}`;
}

export interface FunctionPlotProps {
  entries: FunctionPlotEntry[];
}

export interface FunctionPlotEntry {
  fn: Function;
  derivative: Function;
}

export function FunctionPlot({ entries }: FunctionPlotProps): JSX.Element {
  const id = getId();
  const out = <div id={id}></div>;

  functionPlot({
    target: `#${id}`,
    data: entries.map((entry) => ({
      fn: functionToKatex(entry.fn),
    })),
  });

  return out;
}

export default FunctionPlot;
