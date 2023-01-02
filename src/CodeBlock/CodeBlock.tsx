import { useEffect } from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";
import styles from './CodeBlock.module.css';

// Note this list can be expanded -- see acceptable prism.js languages
// https://prismjs.com/
type Language = 'javascript' | 'cpp' | 'css' | 'html';

type Props = {
  code: string;
  language: Language;
};

export const CodeBlock = ({ code, language } : Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return(
    <div className={styles.code}>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};