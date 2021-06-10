import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";

const Future = ({selected}) => {
    const [data, setData] = useState(null)

    const chart = (selected) => {
        console.log(selected)
        setData({
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [
                {
                    label: '# of Votes',
                    data: selected,
                    fill: true,
                    radius : 4,
                    backgroundColor: 'rgba(26,70,183, 0.5)',
                    borderColor: 'rgba(26,70,183, 0.2)',
                },
            ]
        })
    };

    const options = {
        animation: false,
        plugins: {
            legend: {
                display: false
            },
        },
        elements: {
            line: {
                tension: .4
            }
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        layout: {
            padding: {
                top: 10,
                bottom: 10
            }
        }
    };

    useEffect(() => {
        chart(selected.rez)
    }, [selected])

    return (
        <div className='futureDay pt-2 pb-2'>
          <Line data={data} options={options}/>
        </div>
    );
};

export default Future;