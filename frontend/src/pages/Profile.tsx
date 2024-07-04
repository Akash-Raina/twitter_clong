import { useRef } from "react";
import { Navbar } from "../components/Navbar"
import { Posts } from "../components/Posts"
import { ProfileHeader } from "../components/ProfileHeader"
import { Searchbar } from "../components/Searchbar";
import { Suggestions } from "../components/Suggestion";

export const Profile = ()=>{
    const searchInputRef = useRef(null);
    return <div className="bg-black w-full h-full text-white flex justify-between relative">
        <div className="fixed w-[13%]">
            <Navbar searchInputRef = {searchInputRef}/>
        </div>
        <div className="w-[55%] ml-[13%] border-x border-[#657786]">
            <ProfileHeader/>
            <Posts/>
        </div>
        <div className="w-[32%] flex flex-col items-center gap-4">
            <Searchbar searchInputRef = {searchInputRef}/>
            <Suggestions/>
        </div>

    </div>
}