import { useState } from "react"
import { Authheader } from "./Authheader"
import { LabbeledInput } from "./LabbeledInput"
import axios from "axios";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface SignupType{
    username: string;
    email: string;
    password: string;
}
export const SignupAuth = ({type}:{type:'signin' | 'signup'})=>{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<SignupType>({
        username: "",
        email: "",
        password: ""
    })

    async function hitbackend(){

        try{
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}user/signup`, userData);
            const jwt = res.data.token;
            localStorage.setItem("token", jwt);
            navigate("/")
        }
        catch(err){
            alert(err);
            setLoading(false)
        }
    }
    

    return <div className="w-screen h-screen bg-black flex justify-center">
        <div className="w-[80%] flex flex-col ">
            <Authheader type = {type}/>
            <div className="mt-10 flex flex-col gap-6 items-center">

                <LabbeledInput label="Username" placeholder="Akash..." onchange={(e)=>{
                    setUserData({
                        ...userData,
                        username: e.target.value
                    })
                }}/>
                <LabbeledInput label="Email" type="email" placeholder="akash@gmail.com" onchange={(e)=>{
                    setUserData({
                        ...userData,
                        email: e.target.value
                    })
                }}/>
                <LabbeledInput label="Password" type="password" placeholder="*******" onchange={(e)=>{
                    setUserData({
                        ...userData,
                        password: e.target.value
                    })
                }}/>

                <button onClick={hitbackend} className="mt-5 bg-white rounded-xl w-[230px] h-8 text-black text-lg font-bold">{loading ? <Spinner/> : type == 'signup' ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </div>
        
    </div>
}