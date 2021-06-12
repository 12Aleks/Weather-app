import React, {useEffect, useState, useRef} from 'react';
import {Line} from "react-chartjs-2";
import {Chart} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const Future = ({selected}) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);



    const chart = (selected, gradient) => {
        setData({
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [
                {
                    label: '# of Votes',
                    data: selected,
                    fill: true,
                    scaleBeginAtZero: true,
                    radius: 2,
                    backgroundColor: gradient,
                    borderColor: 'rgba(26,70,183, 0.2)',
                },
            ]
        })

        setOptions({
            animation: false,
            elements: {
                line: {
                    tension: .4
                }
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                        drawBorder: false,
                        tickMarkLength: 0,
                    },
                    ticks: {
                        suggestedMin: 13, // lowest from data minus 2/3
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                        drawBorder: false,
                        tickMarkLength: 0,
                    },
                    ticks: {
                        fontColor: '#000000',
                    }
                }]
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            },

            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    align: 'top',
                    color: '#000',
                    font: {
                        weight: 'bold'
                    },
                    display: true,
                },
            },
        })
    };


    useEffect(() => {
        let ctx = document.getElementById('canvas').getContext("2d")
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(251,189,8, .6)');
        gradient.addColorStop(.6, 'rgba(26,70,183,.6)');
        gradient.addColorStop(1, 'rgba(26,70,183, .8)');
        chart(selected.rez, gradient)
    }, [selected]);

    return (
        <div className='futureDay pt-2 pb-2'>
            <Line id='canvas' data={data}  options={options}/>
        </div>
    );
};

export default Future;