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

type ChartType = 'bar' | 'radial';

type RadialChartData = ApexNonAxisChartSeries;

type BarChartData = {
  [Algorithm.DFS]: ApexNonAxisChartSeries;
  [Algorithm.BFS]: ApexNonAxisChartSeries;
}

// placeholder for no chart data
const radialEmptyText: string = 'No available cascade data.';
const barEmptyTextBFS: string = 'No available BFS cascade data.';
const barEmptyTextDFS: string = 'No available DFS cascade data.';

// chart options
const radialChartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'radialBar',
    height: 350,
    width: '100%',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false
  },
  labels: [
    'DFS',
    'BFS'
  ],
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '16px',
    fontFamily: 'Poppins'
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined,
      },
      barLabels: {
        enabled: true,
        useSeriesColors: true,
        margin: 12,
        fontSize: '16px',
        fontFamily: 'Poppins',
      },
    }
  },
};

const barChartOptions: ApexCharts.ApexOptions = {

};

export const Chart = ({ newCascade, } : Props) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [barChartData, setBarChartData] = useState<BarChartData>({ [Algorithm.DFS]: [], [Algorithm.BFS]: [], });
  const [radialChartData, setRadialChartData] = useState<RadialChartData>([]);

  const resetChart = () => {
    setBarChartData({ [Algorithm.DFS]: [], [Algorithm.BFS]: [], });
    setRadialChartData([]);
  }
  
  useEffect(() => {
    /* TODO */
  }, [newCascade]);

  return (
    <Container fluid className={styles.chart}>
      <div className={styles.chartHeader}>
        <div className={styles.clearWrapper}><Clear onClear={resetChart}/></div>
        <div>

        </div>
      </div>
      <div className={styles.chartContainer}>
        {
          chartType == 'bar' ?
            <div>

            </div>
          :
            <div></div>
        }
      </div>
    </Container>
  );
};
