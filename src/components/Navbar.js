import React from "react"
import classNames from "classnames"
import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "gatsby"

import useSiteMetadata from "../hooks/useSiteMetadata"
import useShrunk from "../hooks/useShrunk"

const NavbarComponent = () => {
  const isShrunk = useShrunk()
  const { title, subtitle } = useSiteMetadata()

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      className={classNames({
        "navbar-shrunked": isShrunk,
        "navbar-top": !isShrunk,
      })}
    >
      <Container>
        <div>
          <Link to="/" className="navbar-brand">
            {title}
          </Link>
          <div
            className={classNames({
              "navbar-subbrand-hidden": isShrunk,
              "navbar-subbrand": !isShrunk,
            })}
          >
            {subtitle}
          </div>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Albums
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
