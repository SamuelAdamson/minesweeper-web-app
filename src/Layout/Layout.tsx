import { ReactNode } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Layout.module.css';
import {
  ListNested as ToggleIcon,
  ArrowUp as ArrowIcon,
} from 'react-bootstrap-icons';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Outlook as OutlookIcon,
} from '../../img';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Container>
        <Navbar expand="md" className={styles.navBar}>
          <Navbar.Toggle
            className={styles.toggle}
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
          >
            <ToggleIcon height={28} width={36} />
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav as="ul" className="me-auto">
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
            </Nav>
            <Nav>
              <Nav.Item>
                <Nav.Link
                  className={styles.navLink}
                  href="https://samueladamson.github.io"
                >
                  creator
                  <ArrowIcon className="pl-1" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className={styles.mainContainer}>{children}</Container>
      </Container>
      <footer className={styles.footerWrapper}>
        <div className={styles.footer}>
          <Container className={styles.footSection}>
            <a
              href="https://www.linkedin.com/in/samuel-adamson-cs"
              className={styles.footLink}
            >
              <Image
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
              <Image
                className={styles.grow}
                src={GitHubIcon}
                height={40}
                width={40}
                alt="gh"
              />
            </a>
            <a href="mailto:sadamson@uccs.edu" className={styles.footLink}>
              <Image
                className={styles.grow}
                src={OutlookIcon}
                height={40}
                width={40}
                alt="mt"
              />
            </a>
          </Container>
          <Container className={styles.footSection}>
            <div className={styles.footTag}>Samuel Adamson &#8226; Colorado</div>
          </Container>
        </div>
      </footer>
    </div>
  );
};
