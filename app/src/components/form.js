import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";


const Forms = ({setState}) => {
    const [value, setValue] = useState('');

    function updateValue(e) {
        e.preventDefault();
        setValue(e.target.value)
    }

    function submitForm() {
        setState(value);
        setValue('')
    }

    return (
        <div className='form'>
            <Form.Control
                type="text"
                value={value}
                placeholder="Enter city"
                onChange={updateValue}
            />
            <Button variant="primary" onClick={() => submitForm()}>
                Submit
            </Button>
        </div>
    );
};

export default Forms;