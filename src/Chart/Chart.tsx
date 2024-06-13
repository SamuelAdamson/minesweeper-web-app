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
const emptyTextDFS: string = 'No available DFS cascade data.';
const emptyTextBFS: string = 'No available BFS cascade data.';

// chart options
const chartOptions = (title: string, color: string): ApexCharts.ApexOptions => {
  return {
    chart: {
      type: 'area',
      height: 200,
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    colors: [color],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    markers: {
      size: 6,
      shape: 'square',
      hover: {
        size: 10,
      },
    },
    title: {
      text: title,
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        color: 'rgba(0,0,0,0.7)',
      },
    },
    tooltip: {
      x: {
        show: false,
      }
    }
  };
};

export const Chart = ({ newCascade, } : Props) => {
 const [dataDFS, setDataDFS] = useState<ApexAxisChartSeries>([]);
 const [dataBFS, setDataBFS] = useState<ApexAxisChartSeries>([]);

  const resetChart = () => {
    setDataDFS([]);
    setDataBFS([]);
  }
  
  useEffect(() => {
    setDataDFS([ { name: 'DFS', data: [0.4] } ]);
    setDataBFS([ { name: 'BFS', data: [1.0, 0.8, 1.0] } ]);
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
                <p>{emptyTextDFS}</p>
              </div>
            :
              <ApexChart
                options={chartOptions('DFS Cascade Runtimes', '#274E13')}
                series={dataDFS}
                type="area"
                height={200}
                width={'100%'}
              />
          }
        </div>
        <div className={styles.chartSeparator}>
          {
            dataBFS.length == 0 ?
              <div className={styles.chartPlaceholder}>
                <p>{emptyTextBFS}</p>
              </div>
            :
              <ApexChart
                options={chartOptions('DFS Cascade Runtimes', '#3B719F')}
                series={dataBFS}
                type="area"
                height={200}
                width={'100%'}
              />
          }
        </div>
      </div>
    </Container>
  );
};
