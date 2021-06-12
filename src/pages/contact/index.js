import React, { useState, createRef } from "react"
import Recaptcha from "react-google-recaptcha"
import { Helmet } from "react-helmet"
import { Container, Form, Button } from "react-bootstrap"
import { navigate } from "gatsby-link"

import Navbar from "../../components/Navbar"
import MainContainer from "../../components/MainContainer"
import useSiteMetadata from "../../hooks/useSiteMetadata"

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")

const ContactPage = () => {
  const { title } = useSiteMetadata()
  const [formData, setFormData] = useState({ isValidated: false })
  const recaptchaRef = createRef()

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const recaptchaValue = recaptchaRef.current.getValue()

    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        "g-recaptcha-response": recaptchaValue,
        ...formData,
      }),
    })
      .then(response => {
        if (response.status === 200 && !response.redirected) {
          //netlify doesnt give an error on recaptcha fail (only 303 redirect...)
          console.log(response)
          console.log(JSON.stringify(response))
          navigate(form.getAttribute("action"))
        }
      })

      .catch(error => alert(error))
  }

  return (
    <>
      <Helmet>
        <title>Contact - {title}</title>
        <meta name="keywords" content={`${title},contact`} />
      </Helmet>
      <Navbar />
      <MainContainer>
        <Container>
          <div className="row justify-content-md-center">
            <div className="col-xs-auto col-lg-6">
              <h2 className="albums-image-title">Contact</h2>
              <Form
                name="contact"
                method="post"
                action="/contact/merci"
                data-netlify="true"
                data-netlify-recaptcha="true"
                onSubmit={handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Ne pas remplir :
                    <input name="bot-field" onChange={handleChange} />
                  </label>
                </div>
                <Form.Group controlId="form.name">
                  <Form.Label>Prénom et nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="naame"
                    placeholder="Prénom Nom"
                    onChange={handleChange}
                    required={true}
                  />
                </Form.Group>
                <Form.Group controlId="form.email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="nom@exemple.fr"
                    onChange={handleChange}
                    required={true}
                  />
                </Form.Group>
                <Form.Group controlId="form.message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    onChange={handleChange}
                    required={true}
                  />
                </Form.Group>
                <Form.Group controlId="form.recaptcha">
                  <Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
                </Form.Group>
                <Button type="submit" variant="light">
                  Envoyer
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </MainContainer>
    </>
  )
}

export default ContactPage
