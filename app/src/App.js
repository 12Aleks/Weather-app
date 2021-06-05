import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
// import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'
import {convert, getLocation, realDay} from "./location";
import icons from './icons'
// import Temp from "./components/temp";

const KEY = process.env.REACT_APP_KEY

function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')
    const [locality, setLocality] = useState(false)
    const [loading, setLoading] = useState(true);
    const [day, setDay] = useState('')


    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation();
            const weekday = await realDay();
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${temp}&cnt=5&appid=${KEY}`)
                let rez = await data.json();
                setState({
                    city: rez.city.name,
                    sunrise: await convert(rez.city.sunrise),
                    sunset: await convert(rez.city.sunset),
                    country: rez.city.country,
                    temp: rez.list[0].main.temp,
                    wind: rez.list[0].wind.speed.value,
                    windUnit: rez.list[0].wind.speed.unit,
                    windName: rez.list[0].wind.speed.name,
                    windDirection: rez.list[0].wind.direction,
                    clouds: rez.list[0].clouds.value,
                    icon: rez.list[0].weather[0].icon,
                });
                console.log(rez)
                setDay(weekday);
                setLoading(false)
            }
        } catch (e) {
            console.log("Error", e)
        }
    }

    useEffect(() => {
        getLocationsWeather(temp)
    }, [temp])

    const updateCity = value => {
        if (value.length > 2) {
            setCity(value)
        }
    }

    const updateState = value => {
        setState(value);
        setCity('');
        setLoading(false)
    };

    const updateTemp = () => {
        if (temp === 'metric') {
            setTemp('imperial');
        } else if (temp !== 'metric') {
            setTemp('metric');
        }
    };


    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }


    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className="wrapper">
                        <div className="day">
                            <h1>{day.toUpperCase()}</h1>
                        </div>
                        <div className='data'>
                            <p>{locality ? 'City' : 'Locality'}: {state.city}, {state.country}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>
                        </div>
                        <div className='current_data_wrapper'>
                            <div className="img-wrapper">
                                <Image src={icons[`${state.icon}`].default} alt="weather icon"/>
                                <p className="temp">{state.temp} <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
                            </div>
                            <div className="future_data_wrapper">
                                {/*<Temp temp={temp} handleClick={updateTemp}/>*/}

                                {/*<Forms temp={temp} setState={updateState} setCity={updateCity} setLoading={() => setLoading(true)}/>*/}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
