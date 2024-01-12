import {useState,useEffect,createContext} from 'react';

const UpdatertContext=createContext();

export default UpdatertContext;

export const UpdatertProvider=({children})=>{
    let [routine_id,setRoutineId]=useState();
    let [editOpen,setEditOpen]=useState(false);

    const toggleEditOpen=()=>{
        setEditOpen(!editOpen);
    }

    let contextData ={
        routine_id:routine_id,
        setRoutineId,
        editOpen,
        setEditOpen,
        toggleEditOpen,
    }

    return(
        <UpdatertContext.Provider value={contextData}>
            {children}
        </UpdatertContext.Provider>
    )

}