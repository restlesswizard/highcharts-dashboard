import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartInTable({ series, title }) {
  const options = {
    chart: {
      type: 'line',
      height: 200,
    },
    title: {
      text: title,
      style: { fontSize: '14px', fontWeight: 'bold' },
    },
    xAxis: {
      categories: ['Day 1', 'Day 2', 'Day 3', 'Dat 4', 'Dat 5', 'Dat 6', 'Day 7'],
      visible: true,
      lineWidth: 1,
      tickLength: 5,
        labels: {
            enabled: false,
            style: { fontSize: '12px', color: '#333' },
        },
    },
    yAxis: {
      title: { text: null },
      labels: { enabled: true, style: { fontSize: '12px', color: '#333' }},
      gridLineWidth: 0,
      lineWidth: 1,
      thickAmount: 5,
    },
    legend: { enabled: false },
    tooltip: { enabled: false },
    plotOptions: {
      line: {
        marker: {
          symbol: 'square',
          radius: 4,
        },
        dataLabels: { enabled: false },
      },
      series: {
        animation: true,
      },
    },
    series: [
      {
        name: title,
        data: (series || []).slice(-7), // show only last 7 days
        color: '#4caf50',
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
