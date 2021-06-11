import * as React from "react"
import { Helmet } from "react-helmet"

import Navbar from "../components/Navbar"
import MainContainer from "../components/MainContainer"
import useSiteMetadata from "../hooks/useSiteMetadata"

const NotFound = props => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>404 | {title}</title>
      </Helmet>
      <Navbar />
      <MainContainer>404</MainContainer>
    </>
  )
}

export default NotFound
