import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Forms from "./components/form";
import Background from './assets/Images/city.png'
import SunBackground from './assets/Images/sun.jpg'
import Circle from "./components/circle";

const KEY = process.env.REACT_APP_KEY


function convert(utcSeconds) {
    let date = new Date(utcSeconds * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')

    const getWeather = async (city, temp) => {
        try {
            if (city) {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temp}&appid=${KEY}`)
                let rez = await data.json();
                setState({
                    city: rez.name,
                    country: rez.sys.country,
                    temp: rez.main.temp,
                    wind: rez.wind.speed.value,
                    windUnit: rez.wind.speed.unit,
                    windName: rez.wind.speed.name,
                    windDirection: rez.wind.direction,
                    clouds: rez.clouds.value,
                    sunrise: convert(rez.sys.sunrise),
                    sunset: convert(rez.sys.sunset)
                })
                console.log(rez)
                setCity('')
            }

        } catch (e) {
            console.log('Error', e)
        }

    }

    const updateData = value => {
        if (value.length > 2) {
            setCity(value)
        }
    }

    useEffect(() => {
        getWeather(city, temp)
    }, [city, temp])

    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className='wrapper'>
                        <Circle/>
                        <div className="data">
                            <p>City: {state.city}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>
                        </div>
                        <Forms submit={updateData}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
