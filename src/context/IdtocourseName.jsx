import {useState,useEffect,createContext} from 'react'
import axios from 'axios'

const GetCourseNameContext=createContext()
export default GetCourseNameContext;


export const GetCourseNameProvider=({children})=>{
    let [courselist,setCourseList]=useState([]);
    let [idToCourseMap,setIDtoCourseMap]=useState();

    const fetchCourses=async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:8000/api/courses/");
            const data = response.data;
            setCourseList(data);
            console.log("from fetch courses" + response.data)
            let my_dict={};
            for (var i of data){
                my_dict[i["id"]]=i["name"]
            }
            setIDtoCourseMap({...my_dict});
        }catch(err){
            console.log(err)
            window.alert(JSON.parse(err))
        }
    }


    useEffect(()=>{
        fetchCourses();
    },[])

    const mapIdtoCourseName =(courseId)=>{
        console.log(idToCourseMap);
        return idToCourseMap[courseId]
    }


    let contexData={
        mapIdtoCourseName,
    }

    return(
        <GetCourseNameContext.Provider value={contexData}>
            {children}
        </GetCourseNameContext.Provider>
    )
}
