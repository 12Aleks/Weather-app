import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'
import Circle from "./components/circle";

import GetLocations from "./components/getLocations";






function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')
    const [locality, setLocality] =useState(false)




    // const icon_url = `http://openweathermap.org/img/w/`+` dataDecoded["weather"]["icon"] +".png`

    const updateCity = value => {
        if (value.length > 2) {
            setCity(value)
        }
    }

    const updateState = value => {
            setState(value);
            setCity('');
    }

    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className='wrapper'>
                        <Circle/>
                        <div className="data">
                            {/*<img src={require(`http://openweathermap.org/img/w/`)} alt=""/>*/}
                            <p>{locality?'City':'Locality'}: {state.city}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>
                            <GetLocations setLocations={updateState}/>
                        </div>
                        <Forms temp={temp} setState={updateState} setCity={updateCity}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
