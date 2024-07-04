import { useRef } from "react";
import { getProfile, useBackend } from "../Hooks"
import { AllTweets } from "../components/AllTweets";
import { CreateTweet } from "../components/CreateTweet";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Searchbar } from "../components/Searchbar";
import { Suggestions } from "../components/Suggestion";


export const Home = ()=>{
    const searchInputRef = useRef(null);
    const {loading, bkend} = useBackend();

    if(loading){
        return <div>
            Loading please wait
        </div>
    }

    
    return <div className="bg-black w-full h-full text-white flex justify-between relative">
        <div className="fixed w-[13%]">
            <Navbar searchInputRef = {searchInputRef}/>
        </div>
        
        <div className="w-[55%] ml-[13%] border-x border-[#657786]">
            <Header/>
            <CreateTweet/>
            <AllTweets userData={bkend}/>
        </div>
        <div className="w-[32%] flex flex-col items-center gap-4">
            <Searchbar searchInputRef = {searchInputRef}/>
            <Suggestions/>
        </div>
        
    </div>
}