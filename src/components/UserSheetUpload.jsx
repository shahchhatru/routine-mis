import { useState } from "react";
import * as XSLX from "xlsx";
import { Grid } from "@mui/material";
import axios from 'axios';

function UserSheetUpload() {
  const [error, setError] = useState([]);

  const handleFileUpLoad = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XSLX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XSLX.utils.sheet_to_json(sheet);
      
      parsedData.forEach(async (item)=>{
        try{
          const response= await axios.post('http://127.0.0.1:8000/user/register/',{
          ...item
        })
        }catch(err){
          console.log(err)
          setError(err);
        }
      })

      // Rearrange the data
    //   const headerRow = parsedData[1];
    //   const values = parsedData.slice(2);
    //   const rearrangedData = values.map((row) => {
    //     const rowData = {};
    //     if (headerRow && typeof headerRow === "object") {
    //       Object.keys(headerRow).forEach((key) => {
    //         rowData[headerRow[key]] = row[key];
    //       });
    //     }
    //     return rowData;
    //   });

    //   setData(rearrangedData);
    //   console.log(rearrangedData);
    };
  };

  return (
    <Grid>
      <input type="file" name="" accept=".xlsx,.xls" onChange={handleFileUpLoad} />
      <p style={{color:"red"}}>
        {error?error:''}
      </p>
    </Grid>
  );
}

export default UserSheetUpload;
