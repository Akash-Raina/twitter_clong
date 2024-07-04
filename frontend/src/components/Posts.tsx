import { getProfile } from "../Hooks"
import { FaRegHeart } from "react-icons/fa";

export const Posts = ()=>{
    const {content} = getProfile();
    return <div className="">
        <div className="w-full border-b border-slate-500 text-xl font-bold pl-2">Posts</div>
        {!content? <div>No Posts</div>: content.map((data:any)=>
            <div className="text-white pl-2 border-b border-slate-500 text-xl">
                {data.content}
                <div className="flex gap-3 justify-end pr-10 cursor-pointer pb-5">
                    <FaRegHeart size={23} className="hover:text-red-700"/>
                    <div>{data.likes.length}</div>
                </div>
            </div>
            
        )}
    </div>
}