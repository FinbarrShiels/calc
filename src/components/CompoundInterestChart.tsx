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

interface BreakdownRow {
  year: number;
  interest: number;
  accruedInterest: number;
  balance: number;
  contributions?: number;
  totalContributions?: number;
  withdrawals?: number;
  totalWithdrawals?: number;
}

interface CompoundInterestChartProps {
  breakdown: BreakdownRow[];
  currency: string;
  initialInvestment: number;
  chartType?: 'line' | 'bar' | 'stacked';
  hasContributions?: boolean;
  totalContributions?: number;
  hasWithdrawals?: boolean;
  breakdownType?: 'yearly' | 'monthly';
}

const CompoundInterestChart = ({
  breakdown,
  currency,
  initialInvestment,
  chartType = 'line',
  hasContributions = false,
  totalContributions = 0,
  hasWithdrawals = false,
  breakdownType = 'yearly'
}: CompoundInterestChartProps) => {
  // Create separate refs for each chart type
  const lineChartRef = useRef<ChartJS<'line'>>(null);
  const barChartRef = useRef<ChartJS<'bar'>>(null);
  const stackedBarChartRef = useRef<ChartJS<'bar'>>(null);

  // Format currency for labels
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('$', currency);
  };

  // Format period labels based on breakdown type
  const formatPeriodLabel = (row: BreakdownRow, index: number) => {
    if (index === 0) {
      return "Starting Balance";
    }
    
    if (breakdownType === 'yearly') {
      return `Year ${Math.floor(row.year)}`;
    } else {
      const yearPart = Math.floor(row.year);
      const monthPart = Math.round((row.year - yearPart) * 12);
      return `Y${yearPart}M${monthPart || 12}`;
    }
  };

  // Prepare data for the chart
  const labels = breakdown.map((row, index) => formatPeriodLabel(row, index));
  
  // Line chart data
  const lineChartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: breakdown.map(row => row.balance),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Interest Accrued',
        data: breakdown.map(row => row.accruedInterest),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
      },
      ...(hasContributions ? [{
        label: 'Initial + Contributions',
        data: breakdown.map((row, index) => {
          // Estimate contributions at this point (simplified)
          const contributionEstimate = index === 0 
            ? initialInvestment 
            : initialInvestment + (totalContributions * (index / breakdown.length));
          return contributionEstimate;
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderDash: [5, 5],
        tension: 0.3,
      }] : []),
      ...(hasWithdrawals ? [{
        label: 'Withdrawals',
        data: breakdown.map(row => row.totalWithdrawals || 0),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderDash: [5, 5],
        tension: 0.3,
      }] : [])
    ],
  };

  // Bar chart data
  const barChartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Yearly Interest',
        data: breakdown.map(row => row.interest),
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
      },
      ...(hasContributions && breakdown.length > 1 ? [{
        label: 'Yearly Contributions',
        data: breakdown.map((row, index) => {
          if (index === 0) return 0;
          return row.contributions || 0;
        }),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      }] : []),
      ...(hasWithdrawals && breakdown.length > 1 ? [{
        label: 'Yearly Withdrawals',
        data: breakdown.map((row, index) => {
          if (index === 0) return 0;
          return row.withdrawals || 0;
        }),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      }] : [])
    ],
  };

  // Stacked bar chart data
  const stackedBarChartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Principal',
        data: breakdown.map(() => initialInvestment),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      ...(hasContributions ? [{
        label: 'Contributions',
        data: breakdown.map((row, index) => {
          if (index === 0) return 0;
          return row.totalContributions || 0;
        }),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
      }] : []),
      {
        label: 'Interest Accrued',
        data: breakdown.map(row => row.accruedInterest),
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
      },
      ...(hasWithdrawals ? [{
        label: 'Withdrawals (Negative)',
        data: breakdown.map((row, index) => {
          if (index === 0) return 0;
          return -(row.totalWithdrawals || 0); // Negative to show as reduction
        }),
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red-500
      }] : [])
    ],
  };

  // Chart options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb', // text-gray-200
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        color: '#e5e7eb', // text-gray-200
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(107, 114, 128, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return formatCurrency(value as number);
          }
        }
      }
    }
  };

  // Create separate options for bar charts to avoid type errors
  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Yearly Interest Earned',
        color: '#e5e7eb',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(107, 114, 128, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return formatCurrency(value as number);
          }
        }
      }
    }
  };

  const stackedBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Principal vs Interest Growth',
        color: '#e5e7eb',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(107, 114, 128, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        }
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return formatCurrency(value as number);
          }
        }
      }
    }
  };

  // Set chart background color to match dark theme
  useEffect(() => {
    const updateChartBackground = () => {
      if (chartType === 'line' && lineChartRef.current) {
        lineChartRef.current.canvas.style.backgroundColor = '#1f2937'; // bg-gray-800
      } else if (chartType === 'bar' && barChartRef.current) {
        barChartRef.current.canvas.style.backgroundColor = '#1f2937';
      } else if (chartType === 'stacked' && stackedBarChartRef.current) {
        stackedBarChartRef.current.canvas.style.backgroundColor = '#1f2937';
      }
    };
    
    updateChartBackground();
  }, [chartType]);

  // Render the appropriate chart based on chartType
  return (
    <div className="w-full overflow-x-auto">
      <div className="h-96 min-w-[320px]">
        {chartType === 'line' && (
          <Line 
            ref={lineChartRef}
            data={lineChartData} 
            options={lineChartOptions} 
          />
        )}
        
        {chartType === 'bar' && (
          <Bar 
            ref={barChartRef}
            data={barChartData} 
            options={barChartOptions} 
          />
        )}
        
        {chartType === 'stacked' && (
          <Bar 
            ref={stackedBarChartRef}
            data={stackedBarChartData} 
            options={stackedBarOptions} 
          />
        )}
      </div>
    </div>
  );
};

export default CompoundInterestChart; 