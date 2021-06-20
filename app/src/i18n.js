import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {getLanguage} from "./location";
import React from "react";
const lang = getLanguage();
const resources = {
    en: {
        translation: {
            "Sunrise": "Sunrise",
            "Sunset": "Sunset",
            "Locality":"Locality",
            "City":"City",
            "Wind": "Wind speed",
            "M": "M/S",
            "H": "miles/hour",
            "Current": "Current location",
            "Min": "Min",
            "Max":"Maks",
            "more":"See more current weather",
            "enter": "Enter city name",
            "Submit":"Send",
            "Today": "Today",

        }
    },
    pl: {
        translation: {
            "Sunrise": "Wschód",
            "Sunset": "Zachód słońca",
            "Locality":"Miejscowość",
            "City":"Miasto",
            "Wind": "Prędkość wiatru",
            "M": "M/S",
            "H": "mil/god",
            "Current": "Aktualna lokalizacja",
            "Min": "Min",
            "Max":"Max",
            "more":"Obecna pogoda",
            "enter": "Nazwa miasta",
            "Submit":"Wysyłać",
            "Today": "Dzisiaj"
        }
    },
    ru: {
        translation: {
            "Sunrise": "Восход",
            "Sunset": "Заход солнца",
            "Locality":"Mестность",
            "City":"Город",
            "Wind": "Скорость ветра",
            "M": "M/Cек",
            "H": "Миль/час",
            "Current": "Текущее местоположение",
            "Min": "Мин",
            "Max":"Макс",
            "more":"Текущая погода",
            "enter": "Hазвание города",
            "Submit":"Отправить",
            "Today": "Сегодня"
        }
    },
    uk: {
        translation: {
            "Sunrise": "Схід",
            "Sunset": "Захід сонця",
            "Locality":"Mісцевість",
            "City":"Місто",
            "Wind": "Швидкість вітру",
            "M": "M/Cек",
            "H": "Миль/год",
            "Current": "Поточне місце розташування",
            "Min": "Мін",
            "Max":"Макс",
            "more":"Поточна погода",
            "enter": "Hазвa міста",
            "Submit":"Висилати",
            "Today": "Сьогодні"
        }
    },
    fr: {
        translation: {
            "Sunrise": "Soleil",
            "Sunset": "Coucher de soleil",
            "Locality":"Région",
            "City":"Cité",
            "Wind": "Vitesse du vent",
            "M": "M/S",
            "H": "miles/heure",
            "Current": "Emplacement actuel",
            "Min": "Min",
            "Max":"Max",
            "more":"Météo actuelle",
            "enter": "Nom de la ville",
            "Submit":"Envoyer",
            "Today": "Aujourd'hui"
        }
    }
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: `${lang}`,
        fallbackLng: 'en'
    });

export default i18n;