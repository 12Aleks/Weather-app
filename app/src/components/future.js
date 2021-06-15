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
    const {temps, images, time} = selected.rez

    const chart = (temps, gradient, time) => {
        setData({
            labels: time,
            datasets: [
                {
                    label: '# of Votes',
                    data: temps,
                    fill: true,
                    scaleBeginAtZero: true,
                    radius: 1,
                    backgroundColor: gradient,
                    borderSize: .5,
                    borderColor: 'rgba(12,22,98, 0.1)',
                },
            ]
        })

        setOptions({
            animation: false,
            responsive: true,
            elements: {
                line: {
                    tension: .4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    display: false,
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            },
            layout: {
                padding: {
                    top: '15',
                    bottom: '25',
                }
            },

            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    color: '#343E3D',
                    formatter: (val) => {
                        return val + ` ${temp !== 'metric' ? `\u2109` : '\u2103'}`
                    },
                    labels: {
                        title: {
                            font: {
                                weight: '500',
                                size: '12'
                            }
                        },
                        value: {
                            color: 'gray',
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
        gradient.addColorStop(.6, 'rgba(12,22,98,.6)');
        gradient.addColorStop(1, 'rgba(12,22,98, 1)');
        chart(temps, gradient, time)
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