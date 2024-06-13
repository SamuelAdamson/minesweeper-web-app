'use client'

/* Custom chart wrapper component */

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import { Algorithm, Cascade, Clear } from '../index';
import styles from './Chart.module.css';


type Props = {
  newCascade: Cascade | null;
};

// placeholder for no chart data
const barEmptyTextBFS: string = 'No available BFS cascade data.';
const barEmptyTextDFS: string = 'No available DFS cascade data.';

// chart options
const barChartOptions: ApexCharts.ApexOptions = {

};

export const Chart = ({ newCascade, } : Props) => {
 const [dataDFS, setDataDFS] = useState<ApexNonAxisChartSeries>([]);
 const [dataBFS, setDataBFS] = useState<ApexNonAxisChartSeries>([]);

  const resetChart = () => {
    setDataDFS([]);
    setDataBFS([]);
  }
  
  useEffect(() => {
    
  }, [newCascade]);

  return (
    <Container fluid className={styles.chart}>
      <div className={styles.chartHeader}>
        <Clear onClear={resetChart} />
      </div>
      <div className={styles.chartContainer}>
        <div className={cx(styles.chartSeparator, styles.top)}>
          {
            dataDFS.length == 0 ?
              <div className={styles.chartPlaceholder}>
                <p>{barEmptyTextDFS}</p>
              </div>
            :
              <ApexChart
                options={barChartOptions}
                series={dataDFS}
                type="bar"
                height={200}
                width={'100%'}
              />
          }
        </div>
        <div className={styles.chartSeparator}>
          {
            dataBFS.length == 0 ?
              <div className={styles.chartPlaceholder}>
                <p>{barEmptyTextBFS}</p>
              </div>
            :
              <ApexChart
                options={barChartOptions}
                series={dataBFS}
                type="bar"
                height={200}
                width={'100%'}
              />
          }
        </div>
      </div>
    </Container>
  );
};
