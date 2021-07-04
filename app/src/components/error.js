import React from 'react';
import {Button} from "react-bootstrap";
import Forms from "./form";
import {useTranslation} from "react-i18next";

const Error = ({error, getLocationsWeather}) => {
    const {t} = useTranslation();
    return (
        <div className='error'>
            <h1 className='text-center'>{t('error')}</h1>
            <h3 className='text-light'>{t('Geolocation')}, {t('code')}: {error.code}</h3>
            <Button variant="outline-light" onClick={() => getLocationsWeather()}>{t('location')}</Button>
            <h3>{t('title')}</h3>
            <Forms/>
        </div>
    );
};

export default Error;