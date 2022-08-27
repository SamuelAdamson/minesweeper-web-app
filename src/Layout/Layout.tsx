import { ReactNode } from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import styles from './Layout.module.css';
import {
  Grid as ToggleIcon,
  ArrowUpRight as ArrowIcon,
} from 'react-bootstrap-icons';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Youtube as YoutubeIcon,
  Instagram as InstagramIcon,
  Outlook as OutlookIcon,
} from '../../img';

type Props = {
  children: ReactNode;
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
          <Navbar.Collapse>
            <Nav as="ul" className="mr-auto">
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="/">
                  play
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="/about">
                  about
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link className={styles.navLink} href="/performance">
                  performance
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item className={styles.navItemExt}>
                <Nav.Link
                  className={styles.navLinkExt}
                  href="https://samueladamson.github.io"
                >
                  portfolio
                  <ArrowIcon className="pl-1" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className={styles.mainContainer}>{children}</Container>
      </Container>
      <footer className={styles.footer}>
        <Container className="p-3 pb-0">
          <Row className={styles.footSection}>
            <a
              href="https://www.linkedin.com/in/samuel-adamson-cs"
              className={styles.footLink}
            >
              <img
                className={styles.grow}
                src={LinkedInIcon}
                height={40}
                width={40}
                alt="li"
              />
            </a>
            <a
              href="https://github.com/SamuelAdamson"
              className={styles.footLink}
            >
              <img
                className={styles.grow}
                src={GitHubIcon}
                height={40}
                width={40}
                alt="gh"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UC4nZnhi_pEXX9mt1G2cZyVA"
              className={styles.footLink}
            >
              <img
                className={styles.grow}
                src={YoutubeIcon}
                height={40}
                width={40}
                alt="yt"
              />
            </a>
            <a
              href="https://www.instagram.com/giibb4"
              className={styles.footLink}
            >
              <img
                className={styles.grow}
                src={InstagramIcon}
                height={40}
                width={40}
                alt="ig"
              />
            </a>
            <a href="mailto:sadamson@uccs.edu" className={styles.footLink}>
              <img
                className={styles.grow}
                src={OutlookIcon}
                height={40}
                width={40}
                alt="mt"
              />
            </a>
          </Row>
          <div className={styles.footTag}>Samuel Adamson &#8226; Colorado</div>
        </Container>
      </footer>
    </div>
  );
};
