import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
export interface bkendType{
    user: string,
    content: string,
    likes: [string],
}

export const useBackend = ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bkend, setBkend] = useState<bkendType | any >([]);

    useEffect(()=>{
        const hitbackend= async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
                return;
            }
            try{
                const res = await axios.get(`${BACKEND_URL}/user/bulk`,{headers:{
                    Authorization: `Bearer ${token}`
                }})
                if(res && res.data){
                    setBkend(res.data.tweets);
                }
                else{
                    navigate("/signin")
                }
            }
            catch(err){
                console.error(err) 
                navigate("/signin")
            }finally{
                setLoading(false)
            }
        }
        hitbackend()
    }, [loading])

    return{
        loading,
        bkend
    }
}

export const getProfile = ()=>{
    const navigate = useNavigate();
    const [content, setContent] = useState<bkendType | any >([]);
        useEffect(()=>{
        const hitbackend= async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                navigate("/signin");
                return;
            }
            try{
                const res = await axios.get(`${BACKEND_URL}/user/profile`,{headers:{
                    Authorization: `Bearer ${token}`
                }})
                if(res && res.data){
                    if(res.data.tweets.length === 0){
                        setContent("")
                    }
                    else{
                        setContent(res.data.tweets)
                    }
                    
                }
                else{
                    navigate('/signin')
                }
            }
            catch(err){
                console.error(err) 
                navigate("/signin")
            }
        }
        hitbackend()
    }, [])

    return{
        content
    }
}