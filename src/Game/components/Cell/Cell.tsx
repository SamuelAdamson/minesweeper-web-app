import { CSSProperties } from 'react';
import styles from './Cell.module.css'

type Props = {
  mode: string;
  content?: string;
};

export const Cell = ( { mode, content }: Props ) => {
  const cellMode: CSSProperties = { "--mode": `var(--${mode})` } as CSSProperties;

  return (
    <div className={ styles.cell } style={ cellMode } >
      <h3>{ content }</h3>
    </div>
  )
}