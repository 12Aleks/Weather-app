import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Current from "./components/current";
import Forms from "./components/form";
import ListDays from "./components/listDays";
import Future from "./components/future";
import {useTranslation} from "react-i18next";

import Background from './assets/background/spring.jpg'

import {convert, getLanguage, getLocation} from "./location";


const KEY = process.env.REACT_APP_KEY;

function App() {
    const [today, setToday] = useState(null);
    const [listDays, setListDays] = useState(null);
    const [temp, setTemp] = useState('metric');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [week, setWeek] = useState(null);
    const [day, setDay] = useState(null);
   

    const lang  = getLanguage();

    const {t} = useTranslation();

    const getLocationsWeather = async (temp, city) => {
        try {
            const {coords} = await getLocation(city);
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

                setListDays({
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

    const currentDay = async() => {
        setSelectedDay(null);
        setDay({
            data: await convert(today.lang),
        });
    }


    return (
        <Container fluid style={{backgroundImage: `url(${Background})`}} >
            <Row>
                <Col md={12}>
                        <div className="wrapper">
                            {loading ?  <Spinner animation="border" variant="light"  /> : <div className='main_wrapper'>
                                <h1>{day.data.weekday}, {day.data.day}</h1>
                                <div className="main">
                                    <div className='data'>
                                        <p>{!city ? `${t('Locality')}`: `${t('City')}`}: {today.city}, {today.country}</p>
                                        { city ? <p className='hover' onClick={() => { getLocationsWeather('metric'); setCity('')}}>{t('Current')}</p>: !selectedDay 
                                        &&  <Forms setState={(value) => setCity(value)} t={t}/>}
                                        {selectedDay && <p className='hover' onClick={currentDay}>{t('more')}</p>}
                                    </div>
                                    {selectedDay ?
                                        <Future selected={selectedDay} temp={temp}/> :
                                        <div>
                                            <div onClick={updateTemp} className="ToggleSwitch">
                                                <div
                                                    className={temp !== 'metric' ? 'knob active' : 'knob'}>
                                                    {temp !== 'metric' ? `\u2109` : '\u2103'}
                                                </div>
                                            </div>
                                            <Current today={today} listDays={listDays} temp={temp}/>
                                        </div>
                                    }
                                </div>
                                <div className="future_wrapper">
                                    {
                                        listDays.week.map((el, index) => {
                                            return <ListDays key={el.dt}
                                                             day={el}
                                                             week={week}
                                                             temp={temp}
                                                             t={t}
                                                             today={today}
                                                             index={index}
                                                             setSelected={updateSelected}/>
                                        })
                                    }
                                </div>
                            </div>}
                        </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;