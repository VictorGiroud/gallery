import React from "react"
import { Col } from "react-bootstrap"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const AlbumLink = ({ name, image }) => {
  const imageRender = getImage(image)
  return (
    <Col lg={4} sm={6} xs={12}>
      <Link to={`/${name}`} className="albums-image-link">
        <div className="albums-image-container">
          <GatsbyImage
            className="albums-image"
            image={imageRender}
            alt={name}
          />
        </div>
        <h3 className="albums-image-title">{name}</h3>
      </Link>
    </Col>
  )
}

export default AlbumLink
