import {useState,useEffect,createContext} from 'react';

const ScreenOrientationContext=createContext();

export default ScreenOrientationContext;

export const ScreenOrientationContextProvider=({children})=>{
    // let [routine_id,setRoutineId]=useState();
    let [screenRotate,setScreenRotate]=useState(false);

    const togglescreenRotate=()=>{
        setScreenRotate(!screenRotate);
    }

    let contextData ={
        screenRotate,
        togglescreenRotate

    }

    return(
        <ScreenOrientationContext.Provider value={contextData}>
            {children}
        </ScreenOrientationContext.Provider>
    )

}