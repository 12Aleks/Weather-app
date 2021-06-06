import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import Loader from "./components/spiner";
import FutureWeather from "./components/futureWeather";
import {milliToDate, weekWeather} from "./future";
// import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'
import {convert, getLocation, realDay} from "./location";
import icons from './icons'
// import Temp from "./components/temp";

const KEY = process.env.REACT_APP_KEY

function App() {
    const [now, setNow] = useState({})
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')
    const [locality, setLocality] = useState(false)
    const [loading, setLoading] = useState(true);
    const [weekday, setWeekday] = useState('');
    const [day, setDay] = useState('');


    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation();
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                const nowData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temp}&appid=${KEY}`)
                let rezNowData = await nowData.json();
                setNow({
                    city: rezNowData.name,
                    country: rezNowData.sys.country,
                    temp: rezNowData.main.temp,
                    icon: rezNowData.weather[0].icon,
                    description: rezNowData.weather[0].description,
                    sunrise: convert(rezNowData.sys.sunrise),
                    sunset: convert(rezNowData.sys.sunset),
                });

                const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${temp}&appid=${KEY}`)
                let rez = await data.json();
                console.log(rez);
                await setState({
                    week: rez.daily.slice(1, 5)
                });
                const {weekday, day} = await realDay(state.country);
                setDay(day);
                setWeekday(weekday);
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
        return <Loader/>
    }


    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className="wrapper">
                        <div className="weekDay">
                            <h1>{weekday}</h1>
                            <h4>{day}</h4>
                        </div>
                        <div className='data'>
                            <p>{locality ? 'City' : 'Locality'}: {now.city}, {now.country}</p>
                            <p>Sunrise: {now.sunrise}</p>
                            <p>Sunset: {now.sunset}</p>
                        </div>
                        <div className='current_data_wrapper'>
                            <div className="img-wrapper">
                                <Image src={icons[`${now.icon}`].default} alt="weather icon"/>
                                <div>
                                    <p className="temp">{now.temp}
                                        <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                                    </p>
                                    <p className='description'>{now.description}</p>
                                </div>
                            </div>
                            <div className="future_data_wrapper">
                                {
                                    // Object.keys(state.week).splice(1,4).map(function(key, index) {
                                    //  return <FutureWeather key={key} day={state.week[key]}></FutureWeather>
                                    // })
                                    state.week.map(el => {
                                        return <FutureWeather key={el.dt} day={el} country={state.country}/>
                                    })
                                }

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
