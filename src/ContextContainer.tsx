import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import ThemeContext from './Context/ThemeContext';
import styles from './ContextContainer.module.css';

export default function ({ children }: any) {
  const theme = useContext(ThemeContext);
  return <Container className={styles.body}>{children}</Container>;
}
