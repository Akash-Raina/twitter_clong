import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios,{ AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

export const CreateTweet = ()=>{
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const [isPosted, setIsPosted] = useState(false);
    const [content, setContent] = useState("")
    const onSubmit = async()=>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
                navigate('/signin')
            }
            await axios.post(`${BACKEND_URL}/user/tweet`,{ content },{headers:{
                Authorization: `Bearer ${token}`
            }});
            setIsPosted(true);
            setTimeout(() => {
                setIsPosted(false);
            }, 2000);
            setContent('');
        }
        catch(err){
            console.error(err)
            navigate('/signin');
        }
    }
    return <div className="border-b border-[#657786] flex flex-col gap-3 items-end pr-8 py-5">
        <div className="flex gap-3 items-start w-[95%]">
            <span className="border rounded-full text-lg w-9 h-9 text-center pt-1 bg-slate-500">{userName?userName[0].toLocaleUpperCase():"A"}</span>
            <textarea
            value={content} 
            onChange={(e)=>{
                setContent(e.target.value)
            }}
            placeholder="What is happening?!" 
            className="w-[90%] h-20 bg-black text-2xl outline-none resize-none"></textarea>
        </div>
        <button onClick={onSubmit} className="rounded-xl bg-sky-600 w-16 h-10 font-bold">{isPosted?<TiTick className="text-center ml-5" size={30}/> : "Post"}</button>
    </div>
}