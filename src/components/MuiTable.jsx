import { Typography,Box, Paper, Button ,Grid} from '@mui/material'
import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {ScreenOrientationContext} from '../context'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import SearchableTeacherRedirect from './SearchableTeacherRedirect';

function createData(id,name, url) {
    return { id, name, url };
  }
  
 

  const courses=[
    {
    id:1,
    year:'4th',
    name:'BCTAB',
    section:'AB',
    year_id:5,
    course_id:1,
    part:2,
    },
    {
      id:2,
      year:'4th',
      name:'BCTCD',
      section:'CD',
      year_id:5,
      course_id:1,
      part:2,
    },
    {
      id:3,
      year:'4th',
      name:"BEI",
      section:"AB",
      course_id:2,
      part:2,
      year_id:5,

    }
    ,
    {
      id:4,
      year:'1st',
      name:'BCTAB',
      section:'AB',
      year_id:2,
      course_id:1,
      part:2,
    },
    {
      id:5,
      year:'1st',
      name:'BCTCD',
      section:'CD',
      year_id:2,
      course_id:1,
      part:1,
    },
    {
      id:6,
      year:'2nd',
      name:'BCTCD',
      section:'CD',
      year_id:3,
      course_id:1,
      part:1,
    }
    ,
    {
      id:7,
      year:'2nd',
      name:'BCTAB',
      section:'AB',
      year_id:3,
      course_id:1,
      part:1,
    }
    ,{
      id:8,
      year:'3rd',
      name:'BCTCD',
      section:'CD',
      year_id:4,
      course_id:1,
      part:1,
    }
    ,
    {
      id:9,
      year:'3rd',
      name:'BCTAB',
      section:'AB',
      year_id:4,
      course_id:1,
      part:1,
    }

  ]
const MuiTable = () => {
    const {togglescreenRotate}=useContext(ScreenOrientationContext)
    const [teacherslist,setTeacherList]=useState([])
    //const [courses,setCourses]=useState([]);
    useEffect(()=>{
      const fetchTeacherList = async () => {
    
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/teachers/');
          //const response2= await axios.get('http://127.0.0.1:8000/api/courses/');
          setTeacherList(response.data);
          //setCourses(response2.data);
          console.log(teacherslist);
        } catch (error) {
          console.error('Error fetching teacher list:', error);
        }
      }

      fetchTeacherList();
    },[]);

  
    const columns=[
        {
            id:'id',
            name:"Id",
        },
        {
            id:"Name",
            name:"Teacher Name",

        },
    ]

    const classes=[
        {
            id:'id',
            name:"Course Id",

        },
        {
          id:'year',
          name:"Year"
        },
        {
            id:"ClassId",
            name:"Class",

        },       
    ]
  return (
   <Box align="center">
        <Typography variant='h2'>Routine MIS</Typography>
         
           
        <Paper sx={{width:"80%",marginTop:10}}>
             <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                classes.map((column)=>(
                                    <TableCell key={column.id}>
                                       <Typography variant="h6" >{column.name}</Typography> 
                                    </TableCell>
                                ))
                            }
                            <TableCell colSpan={2} align='right'>
                            
                                <Button variant="outlined" startIcon={<PersonAddAltIcon/>}>
                                    ADD 
                                </Button>
                                
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
          {courses.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell><Typography>{row.year}</Typography></TableCell>
              <TableCell><Typography>{row.name}</Typography></TableCell>
              <TableCell align='center'>
                <Link to={`/view_routine_course/${row.course_id}/${row.section}/${row.year_id}/${1}`} >
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                    1st Part
                    </Button>
                    </Link>
                </TableCell>
                <TableCell align="center">
                <Link to={`/view_routine_course/${row.course_id}/${row.section}/${row.year_id}/${2}`} >
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                   2nd Part
                    </Button>
                    </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
             </TableContainer>
        </Paper>
        <Grid>
          <SearchableTeacherRedirect/>
          </Grid>
        <Paper sx={{width:"80%",marginTop:10}}>
             <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column)=>(
                                    <TableCell key={column.id}>
                                       <Typography variant="h6" >{column.name}</Typography> 
                                    </TableCell>
                                ))
                            }
                            <TableCell colSpan={2} align='right'>
                            <Link to="/register_teacher">
                                <Button variant="outlined" startIcon={<PersonAddAltIcon/>}>
                                    ADD 
                                </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
          {teacherslist.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right"><Typography>{row.name}</Typography></TableCell>
              <TableCell align='center'>
                    <Link to={"/view_routine_t/"+row.id+"/1"}>
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                   1st part 
                    </Button>
                    </Link>
                </TableCell>
                <TableCell align="center">
                <Link to={"/view_routine_t/"+row.id+"/2"}>
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                   2nd part
                    </Button>
                    </Link>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
             </TableContainer>
        </Paper>
        
       
   </Box>
  )
}

export default MuiTable