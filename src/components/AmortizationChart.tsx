"use client";

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

interface PaymentRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterest: number;
  totalPrincipal: number;
}

interface AmortizationChartProps {
  data: PaymentRow[];
  chartType: 'line' | 'bar' | 'stacked';
  currency: string;
  yearlyView: boolean;
}

const AmortizationChart = ({ data, chartType, currency, yearlyView }: AmortizationChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Prepare data for chart
    const labels = data.map(row => yearlyView ? `Year ${row.paymentNumber}` : `Payment ${row.paymentNumber}`);
    
    // Skip the first row if it's the initial state (payment number 0)
    const startIndex = data[0].paymentNumber === 0 ? 1 : 0;
    
    // Configure datasets based on chart type
    let datasets: any[] = [];
    
    if (chartType === 'line') {
      datasets = [
        {
          label: 'Principal',
          data: data.slice(startIndex).map(row => row.principal),
          borderColor: 'rgb(59, 130, 246)', // blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3
        },
        {
          label: 'Interest',
          data: data.slice(startIndex).map(row => row.interest),
          borderColor: 'rgb(249, 115, 22)', // orange-500
          backgroundColor: 'rgba(249, 115, 22, 0.5)',
          tension: 0.3
        },
        {
          label: 'Remaining Balance',
          data: data.slice(startIndex).map(row => row.remainingBalance),
          borderColor: 'rgb(34, 197, 94)', // green-500
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          tension: 0.3
        }
      ];
    } else if (chartType === 'bar') {
      datasets = [
        {
          label: 'Principal',
          data: data.slice(startIndex).map(row => row.principal),
          backgroundColor: 'rgba(59, 130, 246, 0.7)' // blue-500
        },
        {
          label: 'Interest',
          data: data.slice(startIndex).map(row => row.interest),
          backgroundColor: 'rgba(249, 115, 22, 0.7)' // orange-500
        }
      ];
    } else if (chartType === 'stacked') {
      datasets = [
        {
          label: 'Principal',
          data: data.slice(startIndex).map(row => row.principal),
          backgroundColor: 'rgba(59, 130, 246, 0.7)' // blue-500
        },
        {
          label: 'Interest',
          data: data.slice(startIndex).map(row => row.interest),
          backgroundColor: 'rgba(249, 115, 22, 0.7)' // orange-500
        }
      ];
    }
    
    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: chartType === 'line' ? 'line' : 'bar',
      data: {
        labels: labels.slice(startIndex),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
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
          },
          legend: {
            position: 'top',
            labels: {
              color: '#e5e7eb', // text-gray-200
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Amortization Schedule',
            color: '#e5e7eb', // text-gray-200
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            stacked: chartType === 'stacked',
            title: {
              display: true,
              text: yearlyView ? 'Year' : 'Payment Number',
              color: '#9ca3af' // text-gray-400
            },
            grid: {
              color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
            },
            ticks: {
              color: '#9ca3af' // text-gray-400
            }
          },
          y: {
            stacked: chartType === 'stacked',
            title: {
              display: true,
              text: `Amount (${currency})`,
              color: '#9ca3af' // text-gray-400
            },
            grid: {
              color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
            },
            ticks: {
              color: '#9ca3af', // text-gray-400
              callback: function(value) {
                return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
              }
            }
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartType, currency, yearlyView]);

  return (
    <div className="h-[400px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default AmortizationChart; 