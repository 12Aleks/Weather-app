import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import Loader from "./components/spiner";
import FutureDay  from "./components/futureDay";
import MinMax from "./components/minMax";
import TempStandard from "./components/tempStandard";
import Wind from "./components/wind";
import SunBackground from './assets/Images/sun.jpg'
import icons from './icons'
// import Forms from "./components/form";

import {convert, getLanguage, getLocation} from "./location";

const KEY = process.env.REACT_APP_KEY;

function App() {
    const [now, setNow] = useState({});
    const [state, setState] = useState({});
    const [temp, setTemp] = useState('metric');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState(false);
    const [loading, setLoading] = useState(true);
    const [weekday, setWeekday] = useState('');
    const [day, setDay] = useState('');


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
                    temp: Math.ceil(currentData.main.temp),
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
                            <h1>{now.day.weekday}</h1>
                            <h4>{now.day.day}</h4>
                        </div>
                        <div className='data'>
                            <p>{locality ? 'City' : 'Locality'}: {now.city}, {now.country}</p>
                            <p>Sunrise: {now.sunrise}</p>
                            <p>Sunset: {now.sunset}</p>
                        </div>
                        <div className='data_wrapper'>
                            <div className="current_data_wrapper">
                                <Image src={icons[`${now.icon}`].default} alt="weather icon"/>
                                <div className='temp_wrapper'>
                                    <Wind deg={now.wind.deg}/>
                                    <TempStandard temp={temp} handleClick={updateTemp}/>
                                    <h2 className="temp">{now.temp}
                                        <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                                    </h2>
                                    <p className='description'>{now.description}</p>
                                     <MinMax state={state.current[0]} temp={temp}/>
                                </div>
                            </div>
                            <div className="future_data_wrapper">
                                {
                                    // Object.keys(state.week).splice(1,4).map(function(key, index) {
                                    //  return <FutureWeather key={key} day={state.week[key]}></FutureWeather>
                                    // })
                                    state.week.map((el, index) => {
                                        return <FutureDay key={el.dt} day={el} temp={temp} now={now} index={index} />
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
