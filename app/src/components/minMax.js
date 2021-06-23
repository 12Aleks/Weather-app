import React, {useContext} from 'react';
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const MinMax = observer(({state}) => {
    const {data} = useContext(Context);
    const {t} = useTranslation();

    return (
        <div className="min_max">
            <p className='min'>{t('Min')}: {Math.ceil(state.temp.min)} <span>{data.temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
            <p className='max'>{t('Max')}: {Math.ceil(state.temp.max)} <span>{data.temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
        </div>
    );
});

export default MinMax;
