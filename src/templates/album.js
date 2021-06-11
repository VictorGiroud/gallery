import * as React from "react"
import { Helmet } from "react-helmet"

import Navbar from "../components/Navbar"
import MainContainer from "../components/MainContainer"
import PhotosList from "../components/PhotosList"
import useSiteMetadata from "../hooks/useSiteMetadata"

const AlbumTemplate = props => {
  const { title, subtitle } = useSiteMetadata()
  const ctx = props.pageContext
  const { name, images } = ctx

  return (
    <>
      <Helmet>
        <title>
          {name} | {title}
        </title>
        <meta
          name="description"
          content={`Album ${name} - ${title} ${subtitle} (${images.length} images)`}
        />
        <meta name="keywords" content={`${title},${title},${name},album`} />
      </Helmet>
      <Navbar />
      <MainContainer>
        <PhotosList title={name} images={images} />
      </MainContainer>
    </>
  )
}

export default AlbumTemplate
