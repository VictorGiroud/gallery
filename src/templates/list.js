import * as React from "react"
import { Helmet } from "react-helmet"
import AlbumCollection from "../components/AlbumCollection"

const ListTemplate = props => {
  const ctx = props.pageContext
  const { albums, miniatures } = ctx

  return (
    <>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <AlbumCollection albums={albums} miniatures={miniatures} />
    </>
  )
}

export default ListTemplate
