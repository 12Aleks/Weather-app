import React from 'react';
import {Line} from "react-chartjs-2";

const Future = ({selected}) => {
    const data = {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [
            {
                label: '# of Votes',
                data: [selected] ,
                fill: true,
                tension: true,
                backgroundColor: 'rgba(26,70,183, 0.5)',
                borderColor: 'rgba(26,70,183, 0.2)',
            },
        ],
    };

    const options = {
        animation: false,
        plugins: {
            legend: {
                display: false
            },
        },
        xAxes: [{
            ticks: { display: false },
            gridLines: {
                display: false,
                drawBorder: false
            }
        }],
        yAxes: [{
            ticks: { display: false },
            gridLines: {
                display: false,
                drawBorder: false
            }
        }],
        layout: {
            padding: {
                top: 10,
                bottom: 10
            }
        }
    };
    return (
        <div className='futureDay pt-2 pb-2'>
            <Line data={data} options={options}/>
        </div>
    );
};

export default Future;