import React from "react"
import { Container } from "react-bootstrap"

const MainContainer = ({ children }) => (
  <Container className="main-container">{children}</Container>
)

export default MainContainer
