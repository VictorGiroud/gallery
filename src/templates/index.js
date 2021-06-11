import React from "react"
import { Helmet } from "react-helmet"

import Navbar from "../components/Navbar"
import MainContainer from "../components/MainContainer"
import AlbumCollection from "../components/AlbumCollection"
import useSiteMetadata from "../hooks/useSiteMetadata"
import Description from "../components/Description"

const IndexPageTemplace = props => {
  const { title, subtitle, description } = useSiteMetadata()
  const ctx = props.pageContext
  const { albums, miniatures } = ctx

  return (
    <>
      <Helmet>
        <title>
          {title} - {subtitle}
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${title},${title}`} />
      </Helmet>
      <Navbar />
      <MainContainer>
        <Description description={description} />
        <AlbumCollection albums={albums} miniatures={miniatures} />
      </MainContainer>
    </>
  )
}

export default IndexPageTemplace
