import React,{useContext,useEffect,useState} from 'react'
import { Grid,Card,CardContent,Box ,Typography,Button} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AddPeriodContext } from '../context';
import ChooseSectionInput from './ChooseSection';
import axios from 'axios';

const AddPeriodCard = (props) => {
  const [yearsData,setYearsData]=useState();
  const [courseData,setcourseData]=useState()
  const {dispatch,dispatch2,setShowAddModel}=useContext(AddPeriodContext);

  useEffect(()=>{
    const fetchRoutines = async ()=>{
      try{
        const response=await axios.get(
          `http://127.0.0.1:8000/api/courses/${props.course_id}`
        )
        
        setcourseData(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchRoutines();

    const fetchYear = async()=>{
      try{
        const response=await axios.get(
          `http://127.0.0.1:8000/api/years/${props.year}/`
        )
        // console.log("from period add card",response.data)
        setYearsData(response.data);
        }catch(err){
        console.log(err)
      };
    }
  fetchYear();
  },[])
 
  const onhandleClick=()=>{
    setShowAddModel(true);
    dispatch({type:"UPDATE",payload:{session_type:"lecture",starting_period_value:props.start_period_index,no_of_period_value:'1'}})
    dispatch2({type:"UPDATE",payload:{course:courseData.name,year:yearsData.year,year_part:props.year_part,day:props.day,section:props.section,note:props.note,alternate_bool:props.alternate}})
  }
   
  return (
    <Grid>
      
          <Grid container
            fullWidth
            mb={1}
            style={{ justifyContent: "space-between" ,height:'auto',alignItems:'center'}}
          >
            <Button fullWidth className="button-87" role="button"
              onClick={onhandleClick}
            >
                <AddTaskIcon style={{color:'lightgreen',fontSize:'3rem'}}/>
                <Typography
                  variant="h7"
                  color="white"
                  style={{ cursor: "pointer"}}
                  >
                  ADD Period
                </Typography>
            
            </Button>
          </Grid>
        
        
    </Grid>
  );
};

export default AddPeriodCard;