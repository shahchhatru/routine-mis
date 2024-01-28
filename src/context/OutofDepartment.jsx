
import {useState,useEffect,createContext} from 'react';
import axios from 'axios';
const OutofDepartmentContext =createContext();

export default OutofDepartmentContext;

export const OutofDepartmentContextProvider =({children})=>{
    let [teacherlist,setTeacherList]=useState([]);
    let [teacherDepartMap,setTeacherDepartMap]=useState();

    const fetchTeachers= async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/teachers/`);
            // console.log(response.data);
            const data =response.data;
            let my_dict={};
            for (var i of data){
                //console.log({name:i["name"],out_of_dep:i["out_of_department"]});
                my_dict[i["name"]]=i["out_of_department"]
                setTeacherDepartMap({...my_dict});
            }
            // console.log({my_dict});
          
        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(()=>{
        fetchTeachers();
    },[])
   
    const checkOutofDep =(teacherlist)=>{
        let set_value=false
        for (var i of teacherlist){
           if  (teacherDepartMap[i]){
                set_value=teacherDepartMap[i];
           }
        }
        return set_value;
    }

    let contextData={
        teacherlist,
        teacherDepartMap,
        fetchTeachers,
        checkOutofDep,
    }

    return (
        < OutofDepartmentContext.Provider value={contextData}>
            {children}
        </ OutofDepartmentContext.Provider>
    )
}