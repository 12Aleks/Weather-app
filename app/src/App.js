import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'
import Circle from "./components/circle";
import {convert} from "./location";
import GetLocations from "./components/getLocations";

const KEY = process.env.REACT_APP_KEY




function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')


    const getCityWeather = async (city, temp) => {
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

    // const icon_url = `http://openweathermap.org/img/w/`+` dataDecoded["weather"]["icon"] +".png`

    const updateCity = value => {
        if (value.length > 2) {
            setCity(value)
        }
    }

    const updateState = value => {
            setState(value)
    }

    useEffect(() => {
        getCityWeather(city, temp)
    }, [city, temp])





    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className='wrapper'>
                        <Circle/>
                        <div className="data">
                            {/*<img src={require(`http://openweathermap.org/img/w/`)} alt=""/>*/}
                            <p>City: {state.city}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>
                            <GetLocations setLocations={updateState}/>
                        </div>
                        <Forms submit={updateCity}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
