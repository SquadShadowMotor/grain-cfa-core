import React,{createContext,useContext,useState} from 'react';
import {purchase} from './model';
const Context=createContext(null);
const KEY='grain-cfa-core-v1';
const EMPTY={portfolio:[],requests:[],draft:null};
function load(){try{const x=JSON.parse(localStorage.getItem(KEY));return x&&Array.isArray(x.portfolio)&&Array.isArray(x.requests)?x:EMPTY;}catch{return EMPTY;}}
export function StoreProvider({children}){
 const [state,setState]=useState(load);
 function save(next){try{localStorage.setItem(KEY,JSON.stringify(next));}catch{throw Error('Не удалось сохранить данные в браузере. Проверьте доступное место и настройки хранения.');}setState(next);}
 function buy(item,amount){save({...state,portfolio:purchase(state.portfolio,item,amount)});}
 function saveDraft(draft){save({...state,draft});}
 function submit(form){save({...state,draft:null,requests:[...state.requests,{...form,id:crypto.randomUUID(),date:new Date().toISOString(),status:'На проверке (демо)'}]});}
 return <Context.Provider value={{...state,buy,saveDraft,submit}}>{children}</Context.Provider>;
}
export function useStore(){return useContext(Context);}
