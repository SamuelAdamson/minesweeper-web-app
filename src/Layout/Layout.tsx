import { ReactNode } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import styles from './Layout.module.css'
import { Grid as ToggleIcon } from 'react-bootstrap-icons'
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Youtube as YoutubeIcon,
  Instagram as InstagramIcon,
  Outlook as OutlookIcon
} from '../img'


type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Container>
      <Navbar expand="sm" className={styles.navBar}>
          <Navbar.Toggle 
            className={styles.toggle}
            data-bs-toggle="collapse" 
            data-bs-target=".navbar-collapse" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false"
          > 
            <ToggleIcon />
          </Navbar.Toggle>
          <Navbar.Collapse className="d-sm-inline-flex">
            <Nav as="ul" className="flex-grow-1">
              <Nav.Item as="li" className={styles.navItem}>
                <Nav.Link className={styles.navLink} href="/">play</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="/about">about</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="/performance">performance</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="https://samueladamson.github.io/">portfolio</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Container>
        <main>{children}</main>
      </Container>
      </Container>
      <footer className={styles.footer}>
        <Container className="p-3 pb-0">
          <section className={styles.footSection}>
            <a href="https://www.linkedin.com/in/samuel-adamson-cs" >
              <img className={styles.grow} src={LinkedInIcon} height={40} width={40} alt="li"/>
            </a>
            <a href="https://github.com/SamuelAdamson">
              <img className={styles.grow} src={GitHubIcon} height={40} width={40} alt="gh"/>
            </a>
            <a href="https://www.youtube.com/channel/UC4nZnhi_pEXX9mt1G2cZyVA">
              <img className={styles.grow} src={YoutubeIcon} height={40} width={40} alt="yt"/>
            </a>
            <a href="https://www.instagram.com/giibb4">
              <img className={styles.grow} src={InstagramIcon} height={40} width={40} alt="ig"/>  
            </a>
            <a href="mailto:sadamson@uccs.edu">
              <img className={styles.grow} src={OutlookIcon} height={40} width={40} alt="mt"/>
            </a>
          </section>
          <div className={styles.footTag}>Samuel Adamson &#8226; Colorado</div>
        </Container>
      </footer>
      
    </div>
  )
}