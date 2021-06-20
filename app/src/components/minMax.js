import React from 'react';
import {useTranslation} from "react-i18next";

const MinMax = ({state, temp}) => {
    const {t} = useTranslation();

    return (
        <div className="min_max">
            <p className='min'>{t('Min')}: {Math.ceil(state.temp.min)} <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
            <p className='max'>{t('Max')}: {Math.ceil(state.temp.max)} <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
        </div>
    );
};

export default MinMax;