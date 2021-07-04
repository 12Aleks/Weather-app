import React from 'react';
import Forms from "./form";
import {useTranslation} from "react-i18next";

const Error = () => {
    const {t} = useTranslation();
    return (
        <div className='error'>
            <h1 className='text-center'>{t('error')}</h1>
            <h3 className='text-light'>{t('Geolocation')},</h3>
            <h3>{t('title')}</h3>
            <Forms/>
        </div>
    );
};

export default Error;