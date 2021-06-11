import React from "react"
import { Container, Row } from "react-bootstrap"

import AlbumLink from "../components/AlbumLink"

const AlbumCollection = ({ albums, miniatures }) => (
  <Container>
    <Row>
      {albums.map(album => (
        <AlbumLink name={album} key={album} image={miniatures[album]} />
      ))}
    </Row>
  </Container>
)

export default AlbumCollection
