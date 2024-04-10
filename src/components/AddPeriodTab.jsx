import React, { useEffect, useState, useReducer,useContext } from "react";
import {
    Typography,
    TextField,
    Button,
    CssBaseline,
    Grid,
    Box,
} from "@mui/material";
import { SubjectInput, DayInput, CourseInput, StartPeriodInput, NumPeriodINput, LectureTypeInp, YearInput, YearPartInput,MultiTeacherSelect } from './'
import { AddPeriodContext } from "../context";
import ChooseSectionInput from "./ChooseSection";
import AlternateFieldInput from "./AlternateFieldInput";




const AddPeriodTab = () => {
    const {formstate,formstate2,dispatch,dispatch2,addPeriod,error,setShowAddModel}=useContext(AddPeriodContext)

    let handleSubmit = async (e) => {
       addPeriod(e)
       setShowAddModel(false)
 };
    

    return (
        <>
            <CssBaseline />
      <Grid
        container
        style={{
          
          width: "20vw",
          display: "flex",
          alignItems: "center",
          height:"100%",
          borderRadius:8,

        }}
      >
                    <Grid item md={12}>
                        <Typography variant="h4" color="white" align="center">
                            ADD PERIOD
                        </Typography>
                        <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <YearInput value={formstate2.year} dispatch={dispatch2} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <YearPartInput value={formstate2.year_part} dispatch={dispatch2} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CourseInput value={formstate2.course} dispatch={dispatch2} />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            id="room_number"
                                            label="Room No"
                                            name="room_number"
                                            autoComplete="room_number"
                                            autoFocus
                                            value={formstate2.room_number}
                                            onChange={(e) =>
                                                dispatch2({
                                                    type: "UPDATE",
                                                    payload: { room_number: e.target.value },
                                                })
                                            }
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        
                                        <ChooseSectionInput value={formstate2.section} dispatch={dispatch2}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        
                                        <AlternateFieldInput value={formstate2.alternate_bool} dispatch={dispatch2}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            fullWidth
                                            id="Note"
                                            label="Note"
                                            name="note"
                                            autoComplete="note"
                                            autoFocus
                                            value={formstate2.note}
                                            onChange={(e) =>
                                                dispatch2({
                                                    type: "UPDATE",
                                                    payload: { note: e.target.value },
                                                })
                                            }
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DayInput value={formstate2.day} dispatch={dispatch2} />
                                </Grid>


                                <Grid item sx={6}>
                                    <Button
                                        onClick={(e) => dispatch2({ type: "CLEAR", payload: {} })}
                                        variant="contained"
                                        style={{ color: "#fff", background: "#f0f" }}
                                        sx={{ mt: 1, mb: 1, fontSize: 16, pt: 3, pb: 3 }}
                                    >
                                        CLEAR
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <SubjectInput value={formstate.subject} dispatch={dispatch} />
                            {/* <TeacherInput value={formstate.teacher} dispatch={dispatch} /> */}
                            <MultiTeacherSelect dispatch={dispatch} />
                            <Grid container>

                                <Grid item xs={12} md={12}>
                                    <LectureTypeInp
                                        value={formstate.session_type}
                                        dispatch={dispatch}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <StartPeriodInput
                                        value={formstate.starting_period_value}
                                        dispatch={dispatch}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <NumPeriodINput
                                        value={formstate.no_of_period_value}
                                        dispatch={dispatch}
                                    />
                                </Grid>
                            </Grid>
                            <Box>
                                {error
                                    ? Object.keys(error).map((item) => (
                                        <p color="red">{`${item}:${error[item]}`}</p>
                                    ))
                                    : ""}
                            </Box>

                            <Grid item container fullWidth spacing={2}>
                                <Grid item sx={3}>
                                    <Button
                                        onClick={(e) => dispatch({ type: "CLEAR", payload: {} })}
                                        variant="contained"
                                        style={{ color: "#fff", background: "#f0f" }}
                                        >
                                        CLEAR
                                    </Button>
                                    </Grid>
                                <Grid item sx={3}>
                                    <Button
                                        type="submit"
                            
                                        variant="contained"
                                        style={{ color: "#fff"}}
                                      >
                                        ADD
                                    </Button>
                                    </Grid>
                                    <Grid item sx={3}>
                                    <Button
                                    variant="contained"
                                        className="button-87"
                                        onClick={()=>setShowAddModel(false)}
                                      >
                                        Exit
                                    </Button>
                                    </Grid>
                                    </Grid>

                    
                        </Box>
                    </Grid>
                </Grid>
           
        </>
    );
};

export default AddPeriodTab;
