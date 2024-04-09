import React, {useState,createContext,useReducer} from 'react'
import axios from axios;

const SearchTeacherContext=createContext();

export default SearchTeacherContext;


export const SearchTeacherProvider=({children})=>{
    const [teacher_id,setTeacherID]=useState()

    let contextData={}

    return(
        <SearchTeacherContext.Provider value={contextData}>
            {children}
        </SearchTeacherContext.Provider>
    )
}