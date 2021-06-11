import React, { useRef, useCallback, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Gallery from "react-photo-gallery"
import LightGallery from "lightgallery/react"
import autoPlay from "lightgallery/plugins/autoplay"

import useSiteMetadata from "../hooks/useSiteMetadata"

const getImages = imageArray => {
  return [...imageArray].map(image => {
    return {
      preview: {
        image: image.preview,
        src: image.preview.gatsbyImageData.images.fallback.src,
        width: image.preview.gatsbyImageData.width,
        height: image.preview.gatsbyImageData.height,
      },
      full: {
        image: image.full,
        src: image.full.gatsbyImageData.images.fallback.src,
        width: image.full.gatsbyImageData.width,
        height: image.full.gatsbyImageData.height,
      },
      alt: image.alt,
      caption: image.alt,
      width: image.preview.gatsbyImageData.width,
      height: image.preview.gatsbyImageData.height,
    }
  })
}

const PhotosList = ({ title, images }) => {
  const lightGallery = useRef(null)
  const { author } = useSiteMetadata()
  const formattedImages = getImages(images)

  const onInit = useCallback(detail => {
    if (detail) {
      lightGallery.current = detail.instance
    }
  }, [])

  useEffect(() => {
    const refresh = setTimeout(() => {
      lightGallery.current.refresh()
    }, 500)
    return () => clearTimeout(refresh)
  }, [])

  const GatsbyImageRender = ({ index, photo, margin }) => {
    const preview = photo.preview
    const full = photo.full
    return (
      <div
        key={photo.alt}
        data-lg-size={`${full.width}-${full.height}`}
        className="gallery-item"
        data-src={full.src}
        data-sources={JSON.stringify(full.image.gatsbyImageData.images.sources)}
        data-sub-html={`<h4>${photo.alt}</h4><p>${author}</p>`}
      >
        <GatsbyImage
          image={getImage(preview.image)}
          alt={photo.alt}
          style={{ margin, height: photo.height, width: photo.width }}
        />
      </div>
    )
  }

  return (
    <>
      <h1 className="gallery-title">{title}</h1>
      <LightGallery
        speed={500}
        onInit={onInit}
        plugins={[autoPlay]}
        selector=".react-photo-gallery--gallery > div > div"
      >
        <Gallery
          photos={formattedImages}
          targetRowHeight={300}
          margin={5}
          renderImage={GatsbyImageRender}
        />
      </LightGallery>
    </>
  )
}

export default PhotosList
