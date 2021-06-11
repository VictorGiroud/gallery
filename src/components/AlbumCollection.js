import React from "react"
import { Container, Row } from "react-bootstrap"

import AlbumLink from "../components/AlbumLink"

const AlbumCollection = ({ albums, miniatures }) => (
  <Container>
    <Row>
      {albums.map(album => (
        <AlbumLink
          name={album.name}
          key={album.name}
          image={miniatures[album.name]}
          to={album.path}
        />
      ))}
    </Row>
  </Container>
)

export default AlbumCollection
