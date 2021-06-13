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
import icons from "./icons";
import MinMax from "./components/minMax";

const KEY = process.env.REACT_APP_KEY;

function App() {
    const [today, setToday] = useState(null);
    const [futureDays, setFutureDays] = useState(null);
    const [temp, setTemp] = useState('metric');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [week, setWeek] = useState(null);
    const [day, setDay] = useState(null);

    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation();
            const lang = await getLanguage();
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;
                let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;
                let apiUrl3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;
                const [currentData, futureData, rez] = await Promise.all([
                    fetch(apiUrl1).then(response => response.json()),
                    fetch(apiUrl2).then(response => response.json()),
                    fetch(apiUrl3).then(response => response.json()),
                ]);

                setToday({
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
                });

                setDay({
                    data:  await convert(lang),
                })

                setFutureDays({
                    week: futureData.daily.slice(0, 5),
                    current: futureData.daily.slice(0, 1),
                });
                setWeek(rez)
                setSelectedDay(null);
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
        setFutureDays(value);
        setCity('');
        setLoading(false)
    };



    const updateSelected = (val) => {
        setSelectedDay(val);
        setDay({
            data:  {
                weekday: val.dayDate.weekday,
                day: val.dayDate.long
            },
        })
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className="wrapper">
                        <div className="weekDay" onClick={() => getLocationsWeather('metric') }>
                            <h1>{day.data.weekday}</h1>
                            <h4>{day.data.day}</h4>
                        </div>
                        <div className='main_wrapper'>
                            <div className="main">
                                { selectedDay ?
                                    <Future selected={selectedDay} temp={temp}/> :
                                    <div>
                                        <div className='data'>
                                            <p>{locality ? 'City' : 'Locality'}: {today.city}, {today.country}</p>
                                            <p>Sunrise: {today.sunrise}</p>
                                            <p>Sunset: {today.sunset}</p>
                                        </div>
                                        <TempStandard temp={temp} handleClick={updateTemp} />
                                        <Current today={today} futureDays={futureDays} temp={temp} />
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
                                {/*<Forms temp={temp} setState={futureDays} setCity={updateCity} setLoading={() => setLoading(true)}/>*/}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;