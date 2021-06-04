import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'
import {convert, getLocation} from "./location";
import icons from './icons'
import Temp from "./components/temp";

const KEY = process.env.REACT_APP_KEY

function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')
    const [locality, setLocality] = useState(false)
    const [loading, setLoading] = useState(true);


    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation()
            let {latitude, longitude} = coords;
            if (latitude && longitude ) {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temp}&appid=${KEY}`)
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
                    icon: rez.weather[0].icon,
                    sunrise: convert(rez.sys.sunrise),
                    sunset:  convert(rez.sys.sunset)
                });
                console.log(rez);
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
        if(temp === 'metric') {
            setTemp('imperial');
        }else if (temp !== 'metric') {
            setTemp('metric');
        }
    };


    if(loading){
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }


    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className='wrapper'>
                        <div className="data">
                            <Temp temp={temp} handleClick={updateTemp}/>
                            <Image src={icons[`${state.icon}`].default} alt="country_flag" style={{width: 150, height: 'auto'}}/>
                            <p>{state.temp}  {temp !== 'metric' ? '\u2109': '\u2103'}</p>
                            <p>{locality ? 'City' : 'Locality'}: {state.city}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>
                        </div>
                        <Forms temp={temp} setState={updateState} setCity={updateCity} setLoading={() => setLoading(true)}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
