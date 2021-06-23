import React, {useContext, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Forms = observer(() => {
    const {data} = useContext(Context);
    const {t} = useTranslation();
    const [value, setValue] = useState('');

    function updateValue(e) {
        e.preventDefault();
        setValue(e.target.value)
    }

    function submitForm() {
        data.setCity(value);
        setValue('')
    }

    return (
        <div className='form'>
            <Form.Control
                type="text"
                value={value}
                placeholder={t('enter')}
                onChange={updateValue}
            />
            <Button variant="primary" onClick={() => submitForm()}>
             {t('Submit')}
            </Button>
        </div>
    );
});

export default Forms;
