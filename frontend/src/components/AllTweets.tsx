
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";


interface User {
  username: string;
}

interface Tweet {
  user: User;
  content: string;
  likes: [string];
  _id:string
}
export const AllTweets = ({userData}:{userData:Tweet[]})=>{
  const navigate = useNavigate();
  const [liked, setLiked] = useState([""]);

  useEffect(() => {
    const storedLikedTweets = localStorage.getItem("likedTweets");
    if (storedLikedTweets) {
      setLiked(JSON.parse(storedLikedTweets));
    }
  }, []);

  const tweetLiked = async(tweetId:string)=>{
    
    try{
      const token = localStorage.getItem("token");
      if(!token){
        navigate('/signin')
        return 
      }
      await axios.put(`${BACKEND_URL}/account/like`,{},{
                headers: {
                  Authorization: `Bearer ${token}`
                },
                params: { tweetId }
            })
            const updatedLiked = [...liked, tweetId];
            setLiked(updatedLiked);
            localStorage.setItem("likedTweets", JSON.stringify(updatedLiked));
    }
    catch(e){
      console.error(e);
    }
  }

    return <div>
        {userData.map((data) =>
            <div className="flex flex-col gap-3 border-b border-[#657786]">
                <div className="flex gap-4 px-5 pt-5 items-center">
                    <span className="border rounded-full text-lg w-9 h-9 text-center pt-1 bg-slate-500" style={{ backgroundColor: getRandomColor() }}>{data.user.username[0].toUpperCase()}</span>
                    <span className="font-bold text-xl text-slate-200">{data.user.username}</span>
                </div>

                <div className="mx-[75px] text-lg">
                    {data.content}
                </div>

                <div className="flex gap-3 justify-end pr-10 cursor-pointer pb-5">
                    <FaRegHeart
                     onClick={()=>{tweetLiked(data._id)}} 
                     size={23} 
                     className="hover:text-red-700"
                     style={liked.includes(data._id)?{color:"red"}:{color:"white"}}
                     />
                    <div>{data.likes.length}</div>
                </div>
            </div>
            
        )}
        </div>
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};