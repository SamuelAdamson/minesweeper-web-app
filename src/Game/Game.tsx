import { Container } from "react-bootstrap";
import { Grid } from "./components";
import styles from "./Game.module.css";

export const Game = () => {
  return (
    <Container fluid className={styles.game}>
      <Grid mode="easy" />
    </Container>
  );
};
