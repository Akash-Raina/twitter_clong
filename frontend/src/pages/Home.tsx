import { useBackend } from "../Hooks"
import { AllTweets } from "../components/AllTweets";
import { CreateTweet } from "../components/CreateTweet";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Searchbar } from "../components/Searchbar";
import { Suggestions } from "../components/Suggestion";


export const Home = ()=>{
    const {loading, bkend} = useBackend();

    if(loading){
        return <div>
            Loading please wait
        </div>
    }
    
    return <div className="bg-black w-screen h-screen text-white flex justify-between">
        <Navbar/>
        <div className="w-[50%]">
            <Header/>
            <CreateTweet/>
            <AllTweets userData={bkend}/>
        </div>
        <div className="w-[30%] border-l border-[#657786] flex flex-col items-center">
            <Searchbar/>
            <Suggestions/>
        </div>
        
    </div>
}