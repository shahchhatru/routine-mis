import { Typography,Box, Paper, Button } from '@mui/material'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


function createData(id,name, url) {
    return { id, name, url };
  }
  
  const rows = [
    createData(122,'Arun Kumar Timalsina', '/routine'),
    createData(237,'Basanta Joshi','/routine'),
    createData(262,'Dibakar Raj Panta','/routine'),
    createData(305,'Nischal Acharya','/routine'),
  ];

  const classrows=[
    createData('001',"076BEI",'/routine'),
    createData('002','076BCTAB','/routine'),
    createData('003','076BCTCD','/routine')
  ]

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

  ]
const MuiTable = () => {
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
                    <Link to={"/view_routine_t/"+row.id}>
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                   View Routine
                    </Button>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <Button variant="outlined" startIcon={<DriveFileRenameOutlineIcon/>}>
                                   Edit Details
                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
             </TableContainer>
        </Paper>
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
                <Link to={`/view_routine_course/${row.course_id}/${row.section}/${row.year_id}/${row.part}`} >
                    <Button variant="outlined" startIcon={<CalendarMonthIcon/>}>
                                   View Routine
                    </Button>
                    </Link>
                </TableCell>
                <TableCell align="center">
                    <Button variant="outlined" startIcon={<DriveFileRenameOutlineIcon/>}>
                                   Edit Details
                    </Button>
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