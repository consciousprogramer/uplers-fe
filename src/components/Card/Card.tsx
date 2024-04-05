import React from "react"
import cardStyles from "./card.module.css"
import Tooltip from "../Tooltip/Tooltip"

const Card: React.FC<{ text?: string }> = ({ text = "" }) => {
  return (
    <div className={cardStyles.card}>
      <p className="">{text}</p>
      <Tooltip />
    </div>
  )
}

export default Card
