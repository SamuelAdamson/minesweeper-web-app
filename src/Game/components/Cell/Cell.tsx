import { useState, CSSProperties, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getAdjacentStr } from './helper';
import { Mode } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  mode: Mode;
  mine: Boolean;
  adjacentNum: Number;
};

function getStyle(covered: Boolean, mine: Boolean, adjacentNum: Number): string {
  let style = covered
    ? cx(styles.cell, styles.covered)
    : mine
      ? cx(styles.cell, styles.mine)
      : cx(styles.cell, styles.uncovered, styles[getAdjacentStr(adjacentNum)])

  return style;
}

export const Cell = ({ mode, mine, adjacentNum }: Props) => {
  const cellMode: CSSProperties = {
    '--mode': `var(--${mode})`,
  } as CSSProperties;

  const [covered, setCovered] = useState<Boolean>(true);
  const [flagged, setFlagged] = useState<Boolean>(false);
  const [content, setContent] = useState<String>('');
  const [style, setStyle] = useState<string>(getStyle(covered, mine, adjacentNum));

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setCovered(false);
    setStyle(getStyle(false, mine, adjacentNum));
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    setFlagged(true);
  };

  return (
    <div
      className={style}
      style={cellMode}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flagged ? <FlagIcon /> : content}
    </div>
  );
};
