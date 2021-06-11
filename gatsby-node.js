/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

async function getFileNames(graphql) {
  const files = await graphql(`
    query {
      allFile(filter: { relativeDirectory: { glob: "photos/*" } }) {
        edges {
          node {
            relativeDirectory
            relativePath
            publicURL
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    return result
  })

  return files.data.allFile.edges
}

async function getAlbums(graphql) {
  const directories = await graphql(`
    query {
      allFile(filter: { relativeDirectory: { glob: "photos/*" } }) {
        edges {
          node {
            relativeDirectory
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    return result.data.allFile.edges.map(f =>
      f.node.relativeDirectory.replace("photos/", "")
    )
  })

  return Array.from(new Set(directories))
}

async function getAlbumsImages(graphql, paths, albums) {
  const images = {}
  albums.forEach(a => (images[a] = []))
  await Promise.all(
    paths.map(async path => {
      const album = path.split("/", 2)[1]
      await graphql(
        `
          query PreviewImages($path: String) {
            file(relativePath: { eq: $path }) {
              preview: childImageSharp {
                gatsbyImageData(width: 800, placeholder: BLURRED)
              }
              full: childImageSharp {
                gatsbyImageData(width: 1920, placeholder: BLURRED)
              }
            }
          }
        `,
        { path }
      ).then(result => {
        if (result.errors) {
          throw result.errors
        }

        images[album].push({
          preview: result.data.file.preview,
          full: result.data.file.full,
          alt: path.replace(/\.[^/.]+$/, "").replace(/^.*[\\\/]/, ""),
        })
      })
    })
  )
  return images
}

async function createPages({ graphql, actions }) {
  const IndexTemplate = path.resolve("./src/templates/index.js")
  const AlbumTemplate = path.resolve("./src/templates/album.js")

  const files = await getFileNames(graphql)
  const paths = files.map(f => f.node.relativePath)
  const albums = await getAlbums(graphql)

  const allAlbumsImages = await getAlbumsImages(graphql, paths, albums)

  const miniatures = {}
  albums.forEach(
    album => (miniatures[album] = allAlbumsImages[album][0].preview)
  )

  actions.createPage({
    path: `/`,
    component: IndexTemplate,
    context: {
      albums,
      miniatures,
    },
  })

  albums.forEach(album => {
    actions.createPage({
      path: album,
      component: AlbumTemplate,
      context: {
        name: album,
        images: allAlbumsImages[album],
      },
    })
  })
}

exports.createPages = createPages
