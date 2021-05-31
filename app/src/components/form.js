import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

const Forms = ({submit}) => {
    const [value, setValue] = useState('');

    function updateValue(e){
        e.preventDefault()
        setValue(e.target.value)
    }

    return (
        <div className='content'>
            <Form.Control
                type="text"
                value={value}
                placeholder="Enter city"
                onChange={updateValue}
            />
            <div className="button_wrapper">
            <Button variant="primary" onClick={() => submit(value)}>
                Submit
            </Button>
            </div>
        </div>
    );
};

export default Forms;