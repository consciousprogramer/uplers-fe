import React from "react"
import tooltipStyles from "./tooltip.module.css"
import clsx from "clsx"

function Tooltip() {
  return (
    <span className={clsx(tooltipStyles.tooltip, "tooltip")}>
      <p className="">Tooltip</p>
    </span>
  )
}

export default Tooltip
