import React from "react"
import { Helmet } from "react-helmet"

import Navbar from "../components/Navbar"
import MainContainer from "../components/MainContainer"
import useSiteMetadata from "../hooks/useSiteMetadata"

const MerciPage = () => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>Message envoyé - {title}</title>
      </Helmet>
      <Navbar />
      <MainContainer>
        <h2 className="albums-image-title">Merci !</h2>
        <p>
          Votre message a bien été envoyé ! Je vous recontacte le plus
          rapidement possible.
        </p>
      </MainContainer>
    </>
  )
}

export default MerciPage
