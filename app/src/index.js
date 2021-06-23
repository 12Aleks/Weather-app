import React, {createContext}  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import './style/style.scss'

import useIndex from "./store/index";


//podkluczajem store czerez hook useContext
export const Context = createContext(null)

ReactDOM.render(
   <Context.Provider value={{
       data: new useIndex(),
   }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

