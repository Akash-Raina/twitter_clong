import { useState } from "react";
import { Authheader } from "./Authheader"
import { LabbeledInput } from "./LabbeledInput"
import axios from "axios"
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { SubmitHandler, useForm } from "react-hook-form";
import { userSigningType } from "./UserSigning";
export const SigninAuth = ({type}:{type:'signin' | 'signup' })=>{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState:{ errors }} = useForm<userSigningType>()

    const onSubmit:SubmitHandler<userSigningType> = async(userData)=>{
     
        try{
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/user/signin`, userData);
            const jwt = res.data.token;
            const username = res.data.username;
            localStorage.setItem("token", jwt);
            localStorage.setItem("username",username);
            navigate("/");
        }
        catch(err){
            alert("Wrong inputs");
            setLoading(false)
        }
    }




    return <div className="w-screen h-screen bg-black flex justify-center">
        <div className="w-[80%] flex flex-col mt-10">
            <Authheader type = {type}/>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-6 items-center">

                <LabbeledInput 
                    label="Email" 
                    placeholder="akash@gmail.com" 
                    register={register} 
                    name="email" 
                    validation={{ required: "*email is required" }}
                />
                {errors.email? <span className="text-red-500">{errors.email.message}</span>: ""}
                
                <LabbeledInput 
                    label="Password" 
                    type = "password" 
                    placeholder="*******" 
                    register={register} 
                    name="password"
                    validation={{ required: "*password is required  " }}
                /> 
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                <button type="submit" className="mt-5 bg-white rounded-xl w-[230px] h-8 text-black text-lg font-bold">{loading ? <Spinner/> : type == 'signup' ? 'Sign Up' : 'Sign In'}</button>
            </form>
        </div>

    </div>

}
