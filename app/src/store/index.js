import {makeAutoObservable} from "mobx";

export default class useIndex {
    constructor() {
        this._today = null;
        this._day = null;
        this._listDays = null;
        this._temp = 'metric';
        this._selectedDay = null;
        this._city = '';
        this._week = null;
        makeAutoObservable(this)
    }

    setToday(today) {
        this._today = today
    }

    setDay(day){
        this._day = day
    }

    setListDays(listDays){
        this._listDays = listDays;
    }

    setTemp(temp){
        this._temp = temp
    }

    setSelectedDay(selectedDay){
        this._selectedDay = selectedDay
    }
    setCity(city){
        this._city = city
    }

    setWeek(week){
        this._week = week
    }

    get today() {
        return this._today
    }


    get day() {
        return this._day
    }

    get listDays() {
        return this._listDays
    }

    get temp(){
        return this._temp
    }

    get selectedDay(){
        return this._selectedDay
    }

    get city(){
        return this._city
    }

    get week(){
        return this._week
    }
}
