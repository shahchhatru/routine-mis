import {useState} from "react";
import * as XSLX from "xlsx";
//import { Input,Grid } from "@mui/material";
import { Input, Grid, styled, InputAdornment, SvgIcon } from "@mui/material";

const CircularInput = styled(Input)(({ theme }) => ({
  borderRadius: "50px", // Adjust the border-radius for a circular input
  padding: theme.spacing(1),
}));

function FileUploadInput(){

    const [data,setData]=useState([])

    const handleFileUpLoad=(e)=>{
        const reader=new FileReader()
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload((e)=>{
            const data=e.target.result;
            const workbook = XLSX.read(data,{type:"binary"});
            const sheetName= workbook.SheetNames[0];
            const sheet=workbook.Sheets[sheetName];
            const parsedData=XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            console.log(parsedData);
        })
    }

    return(
            <Grid>
             <CircularInput
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpLoad}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon>
              {/* Your custom icon goes here */}
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </SvgIcon>
          </InputAdornment>
        }
      />
            </Grid>
          
        
    )
}

export default FileUploadInput