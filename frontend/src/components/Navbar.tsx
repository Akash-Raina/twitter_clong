import { MdHomeFilled } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuPenSquare } from "react-icons/lu";
export const Navbar = ()=>{

    
    return <div className="border-r border-[#657786] w-[13%] flex flex-col gap-6 items-end pt-3 pr-5 cursor-pointer">
        <FaXTwitter size={30}/>
        <MdHomeFilled size={30}/>
        <IoSearch size={30}/>
        <IoPersonOutline size={30}/>
        <LuPenSquare size={30} />
    </div>
}