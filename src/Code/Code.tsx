import { useEffect } from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";
import styles from './Code.module.css';

// Note this list can be expanded -- see acceptable prism.js languages
// https://prismjs.com/
type Language = 'javascript' | 'cpp' | 'css' | 'html';

type Props = {
  code: String;
  language: Language;
};

export const Code = ({ code, language } : Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return(
    <div className={styles.code}>
      <pre style={{transition: "all ease 0.3s"}}>
        <code style={{transition: "all ease 0.3s"}} className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};