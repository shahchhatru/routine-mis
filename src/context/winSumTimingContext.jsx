import {useState,createContext} from 'react';

const TimingContext=createContext();

export default TimingContext;


export const TimingContextProvider =({children})=>{
    const [isWinTrue,setWinTrue]=useState(true);
    const ToggleTiming = ()=>{
        setWinTrue(!isWinTrue)
    }

    const winter_period_time = ['10:15', '11:00', '11:45', '12:30', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30']
    const summer_period_time = ['10:15', '11:05', '11:55', '12:45', '13:35', '14:25', '15:15', '16:05', '16:55', '17:45', '18:35']
 

    const get_winter_timing=(id)=>{
        return winter_period_time[id]
    }
    
    const get_summer_timing=(id)=>{
        return summer_period_time[id]
    }

    let contextData={
        isWinTrue,
        ToggleTiming,
        get_summer_timing,
        get_winter_timing,
    }
    return (
        <TimingContext.Provider value={contextData}>
            {children}
        </TimingContext.Provider>
    )   
}