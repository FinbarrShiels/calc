"use client";

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterest: number;
  totalPrincipal: number;
}

interface CarLoanChartProps {
  data: PaymentRow[];
  type: 'line' | 'bar' | 'stacked';
  currency: string;
}

const CarLoanChart = ({ data, type, currency }: CarLoanChartProps) => {
  // Skip the initial row (index 0)
  const chartData = data.slice(1);
  
  // Prepare labels (payment numbers)
  const labels = chartData.map(row => `${row.paymentNumber}`);
  
  // Prepare datasets based on chart type
  const getChartData = (): ChartData<'line' | 'bar'> => {
    if (type === 'line') {
      return {
        labels,
        datasets: [
          {
            label: 'Remaining Balance',
            data: chartData.map(row => row.remainingBalance),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            tension: 0.1,
            yAxisID: 'y'
          },
          {
            label: 'Payment',
            data: chartData.map(row => row.payment),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.1,
            yAxisID: 'y1'
          }
        ]
      };
    } else if (type === 'bar') {
      return {
        labels,
        datasets: [
          {
            label: 'Payment',
            data: chartData.map(row => row.payment),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            yAxisID: 'y'
          },
          {
            label: 'Remaining Balance',
            data: chartData.map(row => row.remainingBalance),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            type: 'line' as const,
            yAxisID: 'y1'
          }
        ]
      };
    } else { // stacked
      return {
        labels,
        datasets: [
          {
            label: 'Principal',
            data: chartData.map(row => row.principal),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            stack: 'stack0',
            yAxisID: 'y'
          },
          {
            label: 'Interest',
            data: chartData.map(row => row.interest),
            backgroundColor: 'rgba(249, 115, 22, 0.7)',
            stack: 'stack0',
            yAxisID: 'y'
          },
          {
            label: 'Remaining Balance',
            data: chartData.map(row => row.remainingBalance),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            type: 'line' as const,
            yAxisID: 'y1'
          }
        ]
      };
    }
  };
  
  // Chart options
  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(200, 200, 200)'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${currency}${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(200, 200, 200)',
          maxRotation: 0,
          callback: function(value, index) {
            // Show fewer labels for better readability
            const totalLabels = chartData.length;
            const interval = Math.ceil(totalLabels / 12); // Show about 12 labels
            return index % interval === 0 ? this.getLabelForValue(value as number) : '';
          }
        },
        grid: {
          color: 'rgba(100, 100, 100, 0.2)'
        },
        title: {
          display: true,
          text: 'Payment Number',
          color: 'rgb(200, 200, 200)'
        }
      },
      y: {
        ticks: {
          color: 'rgb(200, 200, 200)',
          callback: function(value) {
            return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
          }
        },
        grid: {
          color: 'rgba(100, 100, 100, 0.2)'
        },
        title: {
          display: true,
          text: 'Payment Amount',
          color: 'rgb(200, 200, 200)'
        }
      },
      y1: {
        position: 'right' as const,
        ticks: {
          color: 'rgb(200, 200, 200)',
          callback: function(value) {
            return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
          }
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Balance',
          color: 'rgb(200, 200, 200)'
        }
      }
    }
  };
  
  return (
    <div className="w-full h-full">
      {type === 'stacked' ? (
        <Bar 
          data={getChartData() as ChartData<'bar'>} 
          options={options as ChartOptions<'bar'>} 
        />
      ) : type === 'line' ? (
        <Line 
          data={getChartData() as ChartData<'line'>} 
          options={options as ChartOptions<'line'>} 
        />
      ) : (
        <Bar 
          data={getChartData() as ChartData<'bar'>} 
          options={options as ChartOptions<'bar'>} 
        />
      )}
    </div>
  );
};

export default CarLoanChart; 