
import { CssBaseline, createTheme, ThemeProvider, Button, Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css'
import { AuthProvider } from './context/authContext'
import LoginPage from './pages/LoginPage'
import { orange } from '@mui/material/colors'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage'
import SignUpPage from './pages/SignupPage'
import ResetMail from './pages/ResetMail'
import ViewRoutine from './pages/ViewRoutine'
import RegisterTeacher from './pages/RegisterTeacher'
import AddSubject from './pages/AddSubject'
import AddPeriod from './pages/AddPeriod'
import AddUser from './pages/AddUser';
import ViewTeacherRoutine from './pages/ViewTeacherRoutine';
import ClassRoutine from './pages/ClassRoutine';
import ResetPassword from './pages/ResetPassword';
import EditRoutine from './pages/EditRoutine';
import {motion} from 'framer-motion';
import { UpdatertProvider } from './context/updatertContext';
import { TimingContextProvider } from './context/winSumTimingContext';
import { AddPeriodProvider, RefreshPeriodContextProvider ,EditPeriodProvider, ZoomContextProvider,ScreenOrientationContextProvider,OutofDepartmentContextProvider} from './context';
function App() {

  const theme = createTheme(
    {
      palette: {
        mode: "dark",
        primary: {
          main: orange[500]
        }
      }
    }
  )


  return (
    <>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <UpdatertProvider>
            <TimingContextProvider>
              <ZoomContextProvider>
                <AddPeriodProvider>
                  <RefreshPeriodContextProvider>
                  <EditPeriodProvider>
                   <ScreenOrientationContextProvider>
                    <OutofDepartmentContextProvider>
                    <CssBaseline />
                   
                    <Routes>
                      <Route path="/" element={<Home />}>
                      </Route>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/reset_email" element={<ResetMail />} />
                      <Route path="/view_routine" element={<ViewRoutine />} />
                      <Route path="/register_teacher" element={<RegisterTeacher />} />
                      <Route path="/add_subject" element={<AddSubject />} />
                      <Route path="/add_period" element={<AddPeriod />} />
                      <Route path="/view_routine_t/:id" element={<ViewTeacherRoutine />} />
                      <Route path="/view_routine_course/:id/:section/:year/:year_part" element={<ClassRoutine />} />
                      <Route path="/changepassword" element={<ResetPassword />} />
                      <Route path="/add_user" element={<AddUser />} />
                      <Route path="/edit_period/:id" element={<EditRoutine />} />
                    </Routes>
                    </OutofDepartmentContextProvider>
                    </ScreenOrientationContextProvider>
                    </EditPeriodProvider>
                  </RefreshPeriodContextProvider>
                </AddPeriodProvider>
                </ZoomContextProvider>
              </TimingContextProvider>
            </UpdatertProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>

    </>
  )
}

export default App
