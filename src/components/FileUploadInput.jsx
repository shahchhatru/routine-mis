import { useState } from "react";
import * as XSLX from "xlsx";
import { Grid } from "@mui/material";
import axios from "axios";

function FileUploadInput() {
  const [data, setData] = useState([]);

  const handleFileUpLoad = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XSLX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XSLX.utils.sheet_to_json(sheet);
      console.log(parsedData);

      const fetchUserlist = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/user/getuser/"
          );
          console.log("data", response.data);
          const userIdmap = {};
          response.data.forEach((user) => {
            userIdmap[user.email] = user.id;
          });
          parsedData.forEach((teacher) => {
            const userEmail = teacher.email;
            if (userIdmap.hasOwnProperty(userEmail)) {
              const teacherpush = async () => {
                try {
                  const res = await axios.post(
                    "http://127.0.0.1:8000/api/teachers/",
                    {
                      ...teacher,

                      user: userIdmap[userEmail],
                    }
                  );
                } catch (err) {
                  console.log(err.response.data);
                }
              };
              teacherpush();
            }
          });
        } catch (err) {
          console.log(err.response.data);
        }
      };
      fetchUserlist();
    };
  };

  return (
    <Grid>
      <input
        type="file"
        name=""
        accept=".xlsx,.xls"
        onChange={handleFileUpLoad}
      />
    </Grid>
  );
}

export default FileUploadInput;
