import { CSSProperties, useState, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getAdjacentStr } from './helper';
import { AdjacentStr } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  row: Number;
  col: Number;
  mode: String;
  mine: Boolean;
  adjacentNum: Number;
};

function getStyle(covered: Boolean, mine: Boolean, adjacent: AdjacentStr): string {
  let style = covered
    ? cx(styles.cell, styles.covered)
    : mine
      ? cx(styles.cell, styles.mine)
      : cx(styles.cell, styles.uncovered, styles[adjacent]);

  console.log("getstyle");
  return style;
}

export const Cell = ({ mode, mine, adjacentNum }: Props) => {
  const cellMode: CSSProperties = {
    '--mode': `var(--${mode})`,
  } as CSSProperties;

  const [covered, setCovered] = useState<Boolean>(true);
  const [flagged, setFlagged] = useState<Boolean>(false);
  const [style, setStyle] = useState<string>(cx(styles.cell, styles.covered));
  const [content, setContent] = useState<String>('');

  const [adjacent, setAdjacent] = useState<AdjacentStr>(
    getAdjacentStr(adjacentNum)
  );

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setCovered(false);
    setStyle(getStyle(false, mine, adjacent));
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    setFlagged(true);
  };

  useEffect(() => {
    let newAdjacent = getAdjacentStr(adjacentNum)
    
    setAdjacent(newAdjacent);
    setCovered(true);
    setStyle(getStyle(true, mine, newAdjacent));
  }, [mode]);

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
