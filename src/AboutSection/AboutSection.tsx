import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './AboutSection.module.css';

type Props = {
  heading: string;
  children: ReactNode;
};

export const AboutSection = ({ heading, children }: Props) => {
  return (
    <Container fluid className={styles.aboutSection}>
      <Row>
        <h1 className="display-4"> {heading} </h1>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
};
