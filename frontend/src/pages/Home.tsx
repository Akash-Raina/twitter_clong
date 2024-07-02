import { getProfile, useBackend } from "../Hooks"
import { AllTweets } from "../components/AllTweets";
import { CreateTweet } from "../components/CreateTweet";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Searchbar } from "../components/Searchbar";
import { Suggestions } from "../components/Suggestion";


export const Home = ()=>{
    const {loading, bkend} = useBackend();
    const {username} = getProfile();
    console.log(username)
    if(loading){
        return <div>
            Loading please wait
        </div>
    }
    
    return <div className="bg-black w-full h-full text-white flex justify-between">
        <Navbar/>
        <div className="w-[55%]">
            <Header/>
            <CreateTweet userName = {username}/>
            <AllTweets userData={bkend}/>
        </div>
        <div className="w-[32%] border-l border-[#657786] flex flex-col items-center gap-4">
            <Searchbar/>
            <Suggestions/>
        </div>
        
    </div>
}