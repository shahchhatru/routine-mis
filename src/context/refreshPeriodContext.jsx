
import {useState,useEffect,createContext} from 'react';

const RefreshPeriodContext =createContext();

export default RefreshPeriodContext;

export const RefreshPeriodContextProvider =({children})=>{
    let [periodlistrefresh,setPeriodlistRefresh]=useState(false);

    const togglePRefresh=()=>{
        setPeriodlistRefresh(!periodlistrefresh)
    }
    let contextData={
        periodlistrefresh,
        setPeriodlistRefresh,
        togglePRefresh
    }

    return (
        <RefreshPeriodContext.Provider value={contextData}>
            {children}
        </RefreshPeriodContext.Provider>
    )
}