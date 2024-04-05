import React from "react"
import "./centered-div.css"

function CentreADiv() {
  return (
    <>
      {/* center using grid */}
      <div className="wrapper-div center-child-grid">
        <h1 className="child">Centered With Grid</h1>
      </div>
      {/* center using flex */}
      <div className="wrapper-div center-child-flex">
        <h1 className="child">Centered With Flex</h1>
      </div>
      {/* center using transform */}
      <div className="wrapper-div center-child-transform">
        <h1 className="child positioned-child">Centered With Transform</h1>
      </div>
    </>
  )
}

export default CentreADiv
