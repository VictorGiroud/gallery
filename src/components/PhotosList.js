import React, { useRef, useCallback, useEffect, useState } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(null)
  const [preload, setPreload] = useState([])
  const lightGallery = useRef(null)
  const { author } = useSiteMetadata()

  useEffect(() => {
    const indexToPreload = []
    indexToPreload.push(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
    indexToPreload.push(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
    setPreload(
      indexToPreload.map(
        index => images[index].full.gatsbyImageData.images.sources[0].srcSet
      )
    )
    console.log(indexToPreload)
  }, [currentIndex, images])

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

  const formattedImages = getImages(images)

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
          className="album-preview"
        />
      </div>
    )
  }

  return (
    <>
      <h1 className="gallery-title">{title}</h1>
      {typeof window !== "undefined" && (
        <LightGallery
          speed={500}
          onInit={onInit}
          plugins={[autoPlay]}
          selector=".react-photo-gallery--gallery > div > div"
          onAfterSlide={a => setCurrentIndex(a.index)}
        >
          <Gallery
            photos={formattedImages}
            targetRowHeight={300}
            margin={5}
            renderImage={GatsbyImageRender}
          />
        </LightGallery>
      )}
      <div className="hidden">
        {preload.map(src => (
          <img srcSet={src} key={src} alt="" />
        ))}
      </div>
    </>
  )
}

export default PhotosList
