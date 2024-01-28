import React, {useState,useContext,useEffect, createContext} from 'react';

const ZoomContext=createContext();

export default ZoomContext;

export const ZoomContextProvider =({children})=>{
    let [scalesize,setScalesize]=useState(1);

    const zoomOut =()=>{
        if(scalesize<3){
            setScalesize(scalesize+0.1);
        }
    }

    const zoomIn=()=>{
        if(scalesize>0.1){
            setScalesize(scalesize-0.1);
        }

    }

    const contextData={
        zoomOut,
        zoomIn,
        scalesize,
    }

    return (
        <ZoomContext.Provider value={contextData}>
           {children} 
        </ZoomContext.Provider>
    )
}