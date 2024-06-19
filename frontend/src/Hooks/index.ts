import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk",{headers:{
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