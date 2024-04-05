import { table } from "console"
import React from "react"
import tableStyles from "./table.module.css"
import Card from "../../components/Card/Card"

function TablePage() {
  return (
    <section className={tableStyles.wrapper}>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <Card key={i} text={`Card ${i + 1}`} />
        ))}
    </section>
  )
}

export default TablePage
