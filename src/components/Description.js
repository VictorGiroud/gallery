import React from "react"
import { Col } from "react-bootstrap"

const Description = ({ description }) => {
  return (
    <Col lg={6} className={"mx-auto text-center"}>
      <p className="lead">{description}</p>
    </Col>
  )
}

export default Description
