import { useEffect, useRef, useState } from "react";
import * as Chart from 'chart.js';

interface StockData 
{
    category: string;
    quantity: number;
}

function ProductSummaryChart()
{
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart.Chart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null> (null);

    // Generate glassmorphism-style colors
    const generateGlassColors = (count: number): { bg: string[], border: string[] } => {
        const glassColors = [
            { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgba(99, 102, 241, 0.8)' },      // Indigo
            { bg: 'rgba(139, 92, 246, 0.2)', border: 'rgba(139, 92, 246, 0.8)' },      // Purple
            { bg: 'rgba(236, 72, 153, 0.2)', border: 'rgba(236, 72, 153, 0.8)' },      // Pink
            { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.8)' },      // Blue
            { bg: 'rgba(14, 165, 233, 0.2)', border: 'rgba(14, 165, 233, 0.8)' },      // Sky
            { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgba(16, 185, 129, 0.8)' },      // Emerald
            { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgba(245, 158, 11, 0.8)' },      // Amber
            { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.8)' },        // Red
            { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 0.8)' },      // Violet
            { bg: 'rgba(20, 184, 166, 0.2)', border: 'rgba(20, 184, 166, 0.8)' },      // Teal
            { bg: 'rgba(251, 146, 60, 0.2)', border: 'rgba(251, 146, 60, 0.8)' },      // Orange
            { bg: 'rgba(217, 70, 239, 0.2)', border: 'rgba(217, 70, 239, 0.8)' },      // Fuchsia
        ];

        // If more categories than predefined, generate using HSL
        if (count > glassColors.length) {
            for (let i = glassColors.length; i < count; i++) {
                const hue = (i * 360) / count;
                glassColors.push({
                    bg: `hsla(${hue}, 70%, 60%, 0.2)`,
                    border: `hsla(${hue}, 70%, 60%, 0.8)`
                });
            }
        }

        const backgrounds = glassColors.slice(0, count).map(c => c.bg);
        const borders = glassColors.slice(0, count).map(c => c.border);

        return { bg: backgrounds, border: borders };
    };

    useEffect ( () => {
        const { Chart: ChartJS, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } = Chart;
        ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
        
        async function fetchDataAndCreateChart() : Promise<void>
        {
            try
            {
                const response = await fetch('http://localhost:5000/stock-by-category');
                if(!response.ok) throw new Error('Failed to fetch data');

                const data: StockData[] = await response.json();

                const categories = data.map(item => item.category);
                const quantities = data.map(item => item.quantity);

                // Generate glass effect colors
                const colors = generateGlassColors(categories.length);

                if(chartInstance.current)
                {
                    chartInstance.current.destroy();
                    chartInstance.current = null;
                }

                if(chartRef.current)
                {
                    const existingChart = ChartJS.getChart(chartRef.current);
                    if(existingChart)
                    {
                        existingChart.destroy();
                    }
                }

                if(chartRef.current)
                {
                    const ctx = chartRef.current.getContext('2d');
                    if(ctx)
                    {
                        chartInstance.current = new ChartJS(ctx, {
                            type: 'bar',
                            data : {
                                labels: categories,
                                datasets : [
                                    {
                                        label: 'Stock Quantity',
                                        data: quantities,
                                        backgroundColor: colors.bg,
                                        borderColor: colors.border,
                                        borderWidth: 2
                                    }
                                ]
                            }, 

                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins : {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales : 
                                {
                                    y : {
                                        beginAtZero : true, 
                                        ticks: {
                                            precision: 0
                                        }
                                    }
                                }
                            }
                        });
                    }
                }

                setLoading(false);
            }

            catch (err)
            {
                setError(err instanceof Error ? err.message : 'An error occured');
                setLoading(false);
            }
        }
        fetchDataAndCreateChart();       

    return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <>
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="border border-gray-200 h-80 rounded-2xl shadow-md bg-white">
                <h1 className="text-xl font-semibold text-gray-800 px-6 py-4">Stock by Category</h1>
                <div className="px-6 pb-4" style={{ height: 'calc(100% - 4rem)' }}>
                    {loading && <p className="text-gray-500">Loading chart...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductSummaryChart;