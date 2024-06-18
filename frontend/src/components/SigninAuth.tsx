import { useState } from "react";
import { Authheader } from "./Authheader"
import { LabbeledInput } from "./LabbeledInput"

interface SigninType{
    email: string;
    password: string;
}
export const SigninAuth = ({type}:{type:'signin' | 'signup' })=>{
    const [userData, setUserData] = useState<SigninType>({
        email: "",
        password: ""
    })
    function hitbackend(){
        
    }
    return <div className="w-screen h-screen bg-black flex justify-center">
        <div className="w-[80%] flex flex-col mt-10">
            <Authheader type = {type}/>
            <div className="mt-10 flex flex-col gap-6 items-center">

                <LabbeledInput label="Email" placeholder="akash@gmail.com" onchange={(e)=>{
                    setUserData({
                        ...userData,
                        email: e.target.value
                    })
                }}/>
                <LabbeledInput label="Password" placeholder="*******" onchange={(e)=>{
                    setUserData({
                        ...userData,
                        password: e.target.value
                    })
                }}/>

                <button className="mt-5 bg-white rounded-xl w-[230px] h-8 text-black text-lg font-bold">{type == 'signup' ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </div>

    </div>

}
