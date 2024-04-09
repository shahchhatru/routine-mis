import React, { useState, createContext, useReducer, useContext } from 'react';
import axios from 'axios';
const EditPeriodContext = createContext();

export default EditPeriodContext;

const initialState = {
    teacher: "",
    subject: "",
    session_type: "",
    starting_period_value: "",
    no_of_period_value: "",
    season: "winter"
};

const initialStateGlobal = {
    year: "",
    course: "",
    day: "",
    section:"",
    room_number: "",
    year_part: "",
    note:""
}

const reducerfunction = (state, action) => {
    console.log("dispatch called");
    console.log(action);
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                ...action.payload,
            };
        case "CLEAR":
            return {
                teacher: "",
                subject: "",
                session_type: "",
                season: "winter",
                starting_period_value: "",
                no_of_period_value: "",
            };
        default:
            return {
                ...state,
            };
    }
};

const reducerfunction2 = (state, action) => {
    console.log("dispatch2 called");
    console.log(action);
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                ...action.payload,
            };
        case "CLEAR":
            return {

                year: "",
                course: "",
                day: "",
                section:"",
                room_number: "",
                year_part: "",
                note:""
            };
        default:
            return {
                ...state,
            };
    }
};


export const EditPeriodProvider = ({ children }) => {
    const [error,setError]=useState();
    const [formstate, dispatch] = useReducer(reducerfunction, initialState);
    const [formstate2, dispatch2] = useReducer(reducerfunction2, initialStateGlobal);

    const fetchPeriodData = (Id) => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/routines/${Id}/`);
                const ndata = response.data;
                dispatch({ type: "UPDATE", payload: { teacher: ndata.teacher, subject: ndata.subject, session_type: ndata.session_type, starting_period_value: ndata.starting_period_value, no_of_period_value: ndata.no_of_period_value } })
                dispatch2({ type: "UPDATE", payload: { year: ndata.year, course: ndata.course, day: ndata.day, room_number: ndata.room_number, year_part: ndata.year_part ,section:ndata.section,note:ndata.note} })

            } catch (err) {
                console.log(err);
                window.alert(err);
            }
        }
        getData();
    }

    const updateData = async (e, routine_id) => {
        e.preventDefault();
        const requestData = {
            ...formstate, ...formstate2
        }
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/routines/${routine_id}/`, requestData);
            window.alert("Success:", response.data);
        } catch (error) {
            console.error("Error occurred while making the POST request:", error);
            setError(error.response);
            window.alert(JSON.stringify(error.response.data));

        }


    }

    let contextData = { formstate, formstate2, dispatch, dispatch2, fetchPeriodData, updateData }
    return (
        <EditPeriodContext.Provider value={contextData}>
            {children}
        </EditPeriodContext.Provider>
    )
}