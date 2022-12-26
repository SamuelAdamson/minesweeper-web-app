import styles from './CodeBlock.module.css';
import Highlight from 'react-highlight'

// Note this list can be expanded -- see acceptable highlight.js languages
// https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
type Language = 'typescript' | 'cpp' | 'css' | 'html';

type Props = {
  code: string;
  language: Language;
};

export const CodeBlock = ({ code, language } : Props) => {
  return(
    <div className={styles.code}>
      {/* TODO - show current language name -- allow for switch */}
      <Highlight className={`language-${language}`}>
        {code}
      </Highlight>
    </div>
  );
};