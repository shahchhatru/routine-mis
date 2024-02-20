import {useContext,useState,useEffect, createContext} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children})=>{
    let [authenticated,setAuthenticated] = useState(localStorage.getItem("authtokens")?true:false);
    let [tokendata,setTokendata]=useState(localStorage.getItem("authTokens")?JSON.parse(localStorage.getItem("authTokens")):null)
    const [user,setUser]=useState(localStorage.getItem("authTokens")?jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access):null);
    const [loading,setLoading]=useState(true);
    const [error,rtinesetError]=useState('');

    let history=useNavigate();

    const logoutUser= async (e)=>{
        setAuthenticated(false);
        setTokendata(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history('/login');
    }

    const updateToken = async ()=>{
        console.log("update token called tokendata.refresh :",tokendata.refresh)
        console.log("update token called");
        let response = await axios.post('http://127.0.0.1:8000/user/token/refresh/',{
            'refresh':tokendata.refresh

        },{
            headers:{
                Authorization:"Bearer"+tokendata.access,
            }
        })

        let data =  response.data;

        if(response.status===200){
            console.log({"data":response.data});
            setTokendata(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            setAuthenticated(true);
        }else{
            logoutUser();
            setAuthenticated(false);
        }

        
    }

    const registerUser = async(e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget)
        console.log(
            {
                name:formdata.get('name'),
                email:formdata.get("email"),
                password:formdata.get("password"),
                password2:formdata.get("password2"),
                tc:formdata.get('is_admin')
            }
        )

        
        const response= await axios.post('http://127.0.0.1:8000/user/register/',{
        name:formdata.get('name'),
        email: formdata.get('email'),
        password: formdata.get('password'),
        password2:formdata.get("password2"),
        tc:formdata.get('is_admin')
        })

        let data =response.data.token;
        console.log("data",data);
        console.log("response",response);

        if(response.status === 201){
            console.log("ok response")
            alert('registration succesful')
            history('/signup');
        }


    }

    let loginUser= async(e) =>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        console.log({
        email: formdata.get('email'),
        password: formdata.get('password'),
        });
    const response= await axios.post('http://127.0.0.1:8000/user/login/',{
        email: formdata.get('email'),
        password: formdata.get('password'),
    })

        let data =response.data.token;
        console.log("data",data);
        console.log("response",response);

        if(response.status === 200){
            // console.log("ok response")
            setAuthenticated(true);
            setTokendata(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens',JSON.stringify(data));
            history('/');
        }else{
            // console.log("request failed")
            // console.log(response);
            logoutUser();
        }

    };

    let contextData = {
        loginUser:loginUser ,
        authenticated:authenticated,
        tokendata:tokendata,
        user:user,
        logoutUser:logoutUser,
        registerUser:registerUser,

    }

    useEffect(()=>{
        let interval= setInterval(()=>{
             if(tokendata){
                 updateToken();
             }else{
 
             }
         },5000*60*5)
 
         return ()=>clearInterval(interval);
 
     },[tokendata,loading])

    //  console.log("from authcontext",contextData);
     return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}