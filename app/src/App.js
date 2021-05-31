import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Forms from "./components/form";
import Context from "./context";

const KEY = process.env.REACT_APP_KEY

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
                    sunrise: rez.sys.sunrise,
                    sunset: rez.sys.sunset
                })
                console.log(rez)
                setCity('')
            }

        } catch (e) {
            console.log('Error', e)
        }

    }

    const updateData = e => {
        e.preventDefault();
        const newData = e.target.elements.city.value;
        if (newData.length > 2) {
            setCity(newData)
        }
    }

    useEffect(() => {
        getWeather(city, temp)
    }, [city, temp])

    return (
            <Context.Provider value={{city}}>
              <Container>
                <Row>
                    <Col  className="app">
                        <p>{state.city}</p>
                    </Col>
                    <Col >

                        <Forms submit={updateData}/>
                    </Col>
                </Row>
              </Container>
            </Context.Provider>
    );
}

export default App;
