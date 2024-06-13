'use client'

/* Custom chart wrapper component */

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Container } from 'react-bootstrap';

import { Algorithm, Cascade, Clear } from '../index';
import styles from './Chart.module.css';

type Props = {
  newCascade: Cascade | null;
};

// placeholder for no chart data
const emptyText: string = 'No available cascade data.';

// chart options
const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'area',
    height: 350,
    width: '100%',
  },
  stroke: {
    curve: 'smooth',
  }
};

export const Chart = ({ newCascade, } : Props) => {
  const [data, setData] = useState<ApexAxisChartSeries>([]);
  
  const resetChart = () =>
    setData([]);
  
  useEffect(() => {
    // setData([]);
    /* DEBUG */
    setData([
      { name: 'DFS', data: [0.1, 0.2, 1.0] },
      { name: 'BFS', data: [0.3, 2.0, 0.2] },
    ])
  }, [newCascade]);

  return (
    <Container fluid className={styles.chart}>
      <div className={styles.clearWrapper}>
        <Clear onClear={resetChart}/>
      </div>
      <div className={styles.chartContainer}>
        {
          data.length == 0 ?
            <div className={styles.chartPlaceholder}>
              <p>{emptyText}</p>
            </div>
          :
            <ApexChart
              options={chartOptions}
              series={data}
              type="area"
              height={350}
              width={'100%'}
            />
        }
      </div>
    </Container>
  );
};
