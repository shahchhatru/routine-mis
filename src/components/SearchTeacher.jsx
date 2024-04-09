import React,{useContext,useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import { GetTeacherContext } from '../context';

// const optionsArray = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ];


const SearchTeacher = () => {
    const {teacherOptionsarray,setTeacherId,teacherId}=useContext(GetTeacherContext);
    const [selectedOption, setSelectedOption] = useState(teacherId);
    console.log({teacherOptionsarray,setTeacherId,teacherId})
   
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
        //   placeholder: (provided, state) => ({
        //     ...provided,
        //     color: 'white', // Set placeholder text color to white
        //   }),
        //   singleValue: (provided, state) => ({
        //     ...provided,
        //     color: 'white', // Set selected value text color to white
        //   }),
        }),
      };

      const handleChange = (option) => {
         setSelectedOption(option);
        setTeacherId(option.value);
        console.log(`Option selected:`, option);
      };
  return (
    <div>
    <Select
    styles={customStyles}
      value={selectedOption}
      onChange={ handleChange}
      options={teacherOptionsarray}
      placeholder={"Search Teacher"}
    />
  </div>
  )
}

export default SearchTeacher