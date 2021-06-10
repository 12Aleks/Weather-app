import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import Current from "./components/current";
import Future from "./components/future";
import Loader from "./components/spiner";
import FutureDay  from "./components/futureDay";
import TempStandard from "./components/tempStandard";
import SunBackground from './assets/Images/sun.jpg'
// import Forms from "./components/form";

import {convert, getLanguage, getLocation} from "./location";



const KEY = process.env.REACT_APP_KEY;

function App() {
    const [now, setNow] = useState(null);
    const [state, setState] = useState(null);
    const [temp, setTemp] = useState('metric');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState(false);
    const [loading, setLoading] = useState(true);
    const [weekday, setWeekday] = useState('');
    const [day, setDay] = useState('');
    const [futureWeek, setFutureWeek] = useState(null);


    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation();
            const lang = await getLanguage();
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;
                let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;
                const [currentData, futureData] = await Promise.all([
                    fetch(apiUrl1).then(response => response.json()),
                    fetch(apiUrl2).then(response => response.json()),
                ]);

                setNow({
                    city: currentData.name,
                    country: currentData.sys.country,
                    lang: lang,
                    curTemp: Math.ceil(currentData.main.temp),
                    icon: currentData.weather[0].icon,
                    description: currentData.weather[0].description,
                    sunrise: await convert(currentData.sys.country, 0 ,currentData.sys.sunrise),
                    sunset: await convert(currentData.sys.country,0, currentData.sys.sunset),
                    wind: currentData.wind,
                    latitude: latitude,
                    longitude: longitude,
                    day:  await convert(lang),
                });

                setState({
                    week: futureData.daily.slice(1, 5),
                    current: futureData.daily.slice(0, 1),
                });
                setLoading(false);
            }
        } catch (e) {
            console.log("Error", e)
        }
    };


    const updateTemp = () => {
        temp === 'metric'? setTemp('imperial'): setTemp('metric');
    };

    useEffect(() => {
        getLocationsWeather(temp)
    }, [temp]);

    const updateCity = value => {
        if (value.length > 2) {
            setCity(value)
        }
    };

    const updateState = value => {
        setState(value);
        setCity('');
        setLoading(false)
    };



    const updateFutureWeek = (val) => {
        setFutureWeek(val)
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className="wrapper">
                        <div className="weekDay">
                            <h1>{now.day.weekday}</h1>
                            <h4>{now.day.day}</h4>
                        </div>
                        <div className='data'>
                            <p>{locality ? 'City' : 'Locality'}: {now.city}, {now.country}</p>
                            <p>Sunrise: {now.sunrise}</p>
                            <p>Sunset: {now.sunset}</p>
                        </div>
                        <div className='data_wrapper'>
                            <div className="midl">
                            <TempStandard temp={temp} handleClick={updateTemp}/>
                            {futureWeek ?
                                  <Future selected={futureWeek}/>
                                : <Current now={now} temp={temp} state={state}/>
                            }
                            </div>
                            <div className="future_data_wrapper">
                                {
                                    state.week.map((el, index) => {
                                        return <FutureDay key={el.dt} day={el} temp={temp} now={now} index={index} setFutureWeek={updateFutureWeek}/>
                                    })
                                }


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
