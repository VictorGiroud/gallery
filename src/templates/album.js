import * as React from "react"
import { Helmet } from "react-helmet"

import Navbar from "../components/Navbar"
import MainContainer from "../components/MainContainer"
import PhotosList from "../components/PhotosList"

const AlbumTemplate = props => {
  const ctx = props.pageContext
  const { name, images } = ctx

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Navbar />
      <MainContainer>
        <PhotosList title={name} images={images} />
      </MainContainer>
    </>
  )
}

export default AlbumTemplate
