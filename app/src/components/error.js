import React from 'react';
import {Button} from "react-bootstrap";
import Forms from "./form";

const Error = ({error}) => {
    return (
        <div style={{width: '50%', minHeight: 200, backgroundColor: '#dc3545', padding: '15px'}}>
            <h1 className='text-center'>Error</h1>
            <h3 className='text-light'>{error.message}, code: {error.code}</h3>
            <Button variant="outline-light">Get your location</Button>
            <h3>or enter title your city</h3>
            <Forms/>

        </div>
    );
};

export default Error;