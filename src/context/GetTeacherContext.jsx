import {useState,useEffect,createContext} from 'react';
import axios from 'axios';

const GetTeacherContext=createContext();
export default GetTeacherContext;

export const GetTeacherContextProvider =({children})=>{
    let [teacherlist,setTeacherList]=useState([]);
    let [teacherIdmap,setTeacherIdmap]=useState();
    let [teacherId,setTeacherId]=useState(2);

    const fetchTeachers= async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/teachers/`);
            const data =response.data;
            setTeacherList(data);
            let my_dict={}
            for (var i of data){
                my_dict[i["name"]]=i["id"]
            }
            setTeacherIdmap({...my_dict})
            console.log("teacherlist",teacherlist);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchTeachers();
        
    },[teacherId])

    const mapTeacherNameToId=(teacherName)=>{
        return teacherIdmap[teacherName];

    }
    const updateTeacher=(teacherName)=>{
        const id=mapTeacherNameToId(teacherName);
        setTeacherId(id);
        console.log("from get teachercontext id"+id+" teacherId "+teacherId)
    }

    

    let contextData={
        updateTeacher,
        teacherId,
        setTeacherId,
    }

    return (
        <GetTeacherContext.Provider value={contextData}>
            {children}
        </GetTeacherContext.Provider>
    )
}