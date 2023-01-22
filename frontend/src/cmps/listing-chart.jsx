import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ListingChart({ orders }) {

    const ordersCount = orders.reduce((acc, order) => {
        if (!acc[order.aboutOrder.stay.name]) acc[order.aboutOrder.stay.name] = 0
        acc[order.aboutOrder.stay.name]++
        return acc
    }, {})


    const labelDatas = []
    const labelsValues = []

    for (const stayName in ordersCount) {
        labelDatas.push(stayName)
        labelsValues.push(ordersCount[stayName])
    }

    const data = {
        labels: labelDatas,
        datasets: [
            {
                label: '# of Votes',
                data: labelsValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(64, 255, 223, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(64, 255, 223, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={data} />;
}
