import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import {Chart} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import icons from "../icons";
import {Image} from "react-bootstrap";

Chart.register(ChartDataLabels);

const Future = ({selected, temp}) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const {temps, images} = selected.rez

    const chart = (temps, gradient) => {
        setData({
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [
                {
                    label: '# of Votes',
                    data: temps,
                    fill: true,
                    scaleBeginAtZero: true,
                    radius: 1,
                    backgroundColor: gradient,
                    borderSize: .5,
                    borderColor: 'rgba(26,70,183, 0.1)',
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

                        beginAtZero: true,
                        display: false,
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
                    color: '#343E3D',
                    fontWeight: 300,
                    formatter: (val) => {
                        return val + ` ${temp !== 'metric' ? `\u2109` : '\u2103'}`
                    },
                    labels: {
                        title: {
                            font: {
                                weight: 'bold'
                            }
                        },
                        value: {
                            color: 'green'
                        }
                    }
                },
            },
        })
    };


    useEffect(() => {
        let ctx = document.getElementById('canvas').getContext("2d")
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(26,70,183, .2)');
        gradient.addColorStop(.6, 'rgba(26,70,183,.6)');
        gradient.addColorStop(1, 'rgba(26,70,183, 1)');
        chart(temps, gradient)
    }, [temps]);

    return (
        <div>
            <div className="weather_icons">
                {
                    images.map((img, index) => {
                       return <Image src={icons[`${img}`].default} alt="weather icon" key={index}/>

                    })
                }
            </div>
            <div className='futureDay pt-2 pb-2'>
                <Line id='canvas' data={data} options={options}/>
            </div>
        </div>
    );
};

export default Future;