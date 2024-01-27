import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Box } from '@mui/material';

function SearchableUserInput({statevalue,dispatch}) {
    const [teacherslist, setTeacherslist] = useState([]);
    const [options,setOptions] = useState([]);
    const [value,setValue]=useState('');
   
    useEffect(()=>{
        const fetchTeacherList = async () => {
      
          try {
            const response = await axios.get('http://127.0.0.1:8000/user/getuser/');
            setTeacherslist(response.data);
            const teacheroption_array=response.data.map(opt=>({label:opt.email,value:opt.id}))
            setOptions(teacheroption_array)
            
          } catch (error) {
            console.error('Error fetching teacher list:', error);
          }
        }
  
        fetchTeacherList();
      },[]);

      function handleSelect(data) {
        setValue(data);
        console.log("data",data);
        // const valuesOnly = data?.map((item)=>item.value);
        // if(valuesOnly){
        //     dispatch({type:"UPDATE",payload:{'user':e.target.value}})
        // }
        
        dispatch({type:"UPDATE",payload:{'user':data.value}})
        
       
      }
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background:'rgba(0,0,0,0)',
          
          height: '56px', // Adjust the height as needed
          minHeight: '56px',
          borderRadius: '4px', // Match MUI Select border-radius
          boxShadow: 'none', // Remove the default box-shadow
          border: '1px solid #ced4da', // Match MUI Select border color
          '&:hover': {
            border: '1px solid #ced4da', // Match MUI Select border color on hover
          },
        }),
        menu: (provided, state) => ({
          ...provided,
          background: 'white', // Match MUI Select dropdown background color
        }),
        option: (provided, state) => ({
          ...provided,
          color: 'black', // Match MUI Select option text color
          '&:hover': {
            background: '#f8f9fa', // Match MUI Select option background color on hover
          },
        
        }),
      };

  return (
    <Box sx={{mb:2}}>
        <Select styles={customStyles}
        options={options}
        placeholder='Assign User'
        value={value}
        onChange={handleSelect}
        isSearchable={true}
        isMulti={false}
        >
        </Select>
    </Box>
  )
}

export default SearchableUserInput;