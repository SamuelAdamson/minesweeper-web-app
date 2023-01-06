import { useEffect } from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";
import styles from './Code.module.css';

// Note this list can be expanded -- see acceptable prism.js languages
// https://prismjs.com/
type Language = 'javascript' | 'cpp' | 'css' | 'html';

type Props = {
  code: String;
  centered: Boolean;
  language: Language;
};

export const Code = ({ code, centered, language } : Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return(
    <div className={centered ? styles.codeCenter : styles.code}>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};