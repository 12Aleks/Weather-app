import React, {useEffect, useState} from 'react';
import {Container, Row, Col,} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Current from "./components/current";
import Future from "./components/future";
import FutureDay from "./components/futureDay";
import TempStandard from "./components/tempStandard";
import Forms from "./components/form";
import Loader from "./components/spiner";
import SunBackground from './assets/Images/sun.jpg';

import {convert, getLanguage, getLocation} from "./location";
import Background from "./components/background";

const KEY = process.env.REACT_APP_KEY;

function App() {
    const [today, setToday] = useState(null);
    const [futureDays, setFutureDays] = useState(null);
    const [temp, setTemp] = useState('metric');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [week, setWeek] = useState(null);
    const [day, setDay] = useState(null);

    const getLocationsWeather = async (temp, city) => {
        try {
            const {coords} = await getLocation(city);
            const lang = await getLanguage();
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                let apiUrl = `lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;

                const [currentData, futureData, rez] = await Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?${apiUrl}`).then(response => response.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?${apiUrl}`).then(response => response.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?${apiUrl}`).then(response => response.json()),
                ]);

                setToday({
                    city: currentData.name,
                    country: currentData.sys.country,
                    lang: lang,
                    curTemp: Math.ceil(currentData.main.temp),
                    icon: currentData.weather[0].icon,
                    description: currentData.weather[0].description,
                    sunrise: await convert(currentData.sys.country, 0, currentData.sys.sunrise),
                    sunset: await convert(currentData.sys.country, 0, currentData.sys.sunset),
                    wind: currentData.wind,
                    latitude: latitude,
                    longitude: longitude,
                });

                setDay({
                    data: await convert(lang),
                });

                setFutureDays({
                    week: futureData.daily.slice(0, 5),
                    current: futureData.daily.slice(0, 1),
                });

                setWeek(rez);
                setSelectedDay(null);
                setLoading(false);
            }
        } catch (e) {
            console.log("Error", e)
        }
    };

    const updateTemp = () => {
        temp === 'metric' ? setTemp('imperial') : setTemp('metric');
    };

    useEffect(() => {
        if (!city) return getLocationsWeather(temp);
        return getLocationsWeather(temp, city);
    }, [temp, city]);


    const updateSelected = value => {
        setSelectedDay(value);
        setDay({
            data: {
                weekday: value.dayDate.weekday,
                day: value.dayDate.long
            },
        })
    };

    return (
        <Container fluid className={selectedDay && 'selected'} style={{}}>
            <Background/>
            <Row>
                <Col md={12}>
                    {loading ? <Loader/> :
                        <div className="wrapper">
                            <div className="weekDay">
                                <h1>{day.data.weekday}</h1>
                                <h4>{day.data.day}</h4>
                                {
                                    selectedDay &&
                                    <div className='data'>
                                        <p>{!city ? 'Locality': 'City'}: {today.city}, {today.country}</p>
                                        { city && <p onClick={() =>  { getLocationsWeather('metric'); setCity('')}}>Current location</p>}
                                        <p onClick={() => setSelectedDay(null)}>See more current weather</p>
                                    </div>
                                }
                            </div>
                            <div className='main_wrapper'>
                                <div className="main">
                                    {selectedDay ?
                                        <Future selected={selectedDay} temp={temp}/> :
                                        <div>
                                            <div className='data'>
                                                <p>{!city ? 'Locality': 'City'}: {today.city}, {today.country}</p>
                                                { city && <p onClick={() => { getLocationsWeather('metric'); setCity('')}}>Current location</p>}
                                                <Forms setState={(value) => setCity(value)}/>

                                            </div>
                                            <TempStandard temp={temp} handleClick={updateTemp}/>
                                            <Current today={today} futureDays={futureDays} temp={temp}/>
                                        </div>
                                    }
                                </div>
                                <div className="future_wrapper">
                                    {
                                        futureDays.week.map((el, index) => {
                                            return <FutureDay key={el.dt}
                                                              day={el}
                                                              week={week}
                                                              temp={temp}
                                                              today={today}
                                                              index={index}
                                                              setSelected={updateSelected}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>}
                </Col>
            </Row>
        </Container>
    );
}

export default App;