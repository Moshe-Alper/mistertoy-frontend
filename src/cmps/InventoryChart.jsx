import React from 'react'
import { Pie } from 'react-chartjs-2'

export function InventoryChart({ data }) {
    if (!data || data.length === 0) return <div>No data available</div>

    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Inventory by Label (%)',
                data: data.map(item => item.inStockPercentage),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgba(255, 165, 0, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                    'rgba(255, 20, 147, 0.2)',
                    'rgba(75, 0, 130, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 71, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(255, 20, 147, 1)',
                    'rgba(75, 0, 130, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div>
            <h3>Inventory by Label</h3>
            <Pie data={chartData} />
        </div>
    )
}
