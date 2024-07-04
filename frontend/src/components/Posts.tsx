import { useState } from "react";
import { getProfile } from "../Hooks"
import { FaRegHeart } from "react-icons/fa";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Posts = ()=>{
    const {content} = getProfile();
    const [allId, setId] = useState<string[]>([""])
    const deleteTweet = async(id:string)=>{
   try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User is not authenticated");
                return;
            }

            const response = await axios.delete(`${BACKEND_URL}/user/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Remove the deleted tweet from the state
                setId((prev) => [...prev, id]);
            } else {
                console.error("Failed to delete tweet");
            }
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    }
    return <div className="">
        <div className="border-b border-slate-500 text-xl font-bold pl-2">Posts</div>
        {!content? <div>No Posts</div>: content.map((data:any)=>
            <div className="text-white pl-2 border-b border-slate-500 text-xl">
                {data.content}
                <div className="flex gap-3 justify-end pr-10 cursor-pointer pb-5">
                    <FaRegHeart size={23} className="hover:text-red-700"/>
                    <div>{data.likes.length}</div>
                </div>
                <div className="flex justify-end pr-5 pb-3">
                    <button 
                    onClick={()=>(deleteTweet(data._id))} 
                    className="rounded-xl bg-red-600 w-20 h-10"  
                    disabled={allId.includes(data._id)}>
                        {allId.includes(data._id)?"Done":"Delete"} 
                    </button>
                </div>
            </div>

        )}
    </div>
}