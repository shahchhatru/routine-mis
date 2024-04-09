import {useState,useEffect,createContext} from 'react';
import axios from 'axios';

const GetTeacherContext=createContext();
export default GetTeacherContext;

export const GetTeacherContextProvider =({children})=>{
    let [teacherlist,setTeacherList]=useState([]);
    let [teacherIdmap,setTeacherIdmap]=useState();
    let [teacherNameMap,setTeacherNameMap]=useState();
    let [teacherId,setTeacherId]=useState(2);
    let [teacherOptionsarray,setTeacherOptionsArray]=useState([])
    const fetchTeachers= async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/teachers/`);
            const data =response.data;
            setTeacherList(data);
            let my_dict={}
            let my_dict2={}
            let my_optionsarray=[]
            for (var i of data){
                my_dict[i["name"]]=i["id"]
                my_dict2[i["id"]]=i["name"]
                my_optionsarray.push({value:i["id"],label:i["name"]})

            }
            console.log("myoptions array",my_optionsarray)
            setTeacherOptionsArray(my_optionsarray)
            console.log("teacherOptions state",teacherOptionsarray)
            setTeacherIdmap({...my_dict})
            setTeacherNameMap({...my_dict2})
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
    const mapTeacherIdToName=(teacherId)=>{
        return teacherNameMap[teacherId];

    }
    const updateTeacher=(teacherName)=>{
        const id=mapTeacherNameToId(teacherName);
        setTeacherId(id);
        console.log("from get teachercontext id"+id+" teacherId "+teacherId)
    }

    

    let contextData={
        teacherOptionsarray,
        updateTeacher,
        teacherId,
        setTeacherId,
        mapTeacherIdToName
    }

    return (
        <GetTeacherContext.Provider value={contextData}>
            {children}
        </GetTeacherContext.Provider>
    )
}