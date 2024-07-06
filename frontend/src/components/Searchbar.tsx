import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BACKEND_URL } from "../config";


interface SearchbarProps {
    searchInputRef: React.RefObject<HTMLInputElement>;
}
interface userType{
    username: string
}
export const Searchbar: React.FC<SearchbarProps> = ({searchInputRef})=>{

    const [userinfo, setUserInfo] = useState<userType[]>([])
    const [user, setUser] = useState("");

    const token = localStorage.getItem("token");


    useEffect(() => {
        const fetchUsers = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${BACKEND_URL}/account/search`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: { user },
                    });
                    setUserInfo(response.data.users);
                } catch (e) {
                    console.error(e);
                }
            } else {
                setUserInfo([]);
            }
        };

        fetchUsers();
    }, [user, token]);

    return <div className="flex flex-col w-[80%] ">
        <div className="flex h-12 mt-2 items-center gap-4 pl-3 rounded-3xl bg-[#1b1c1c]">
            <IoSearch className="text-[#7f8585]" size={25}/>
            <input onChange={(e)=>{setUser(e.target.value)}} ref= {searchInputRef} className="text-[#7f8585] bg-transparent outline-none" placeholder="Search"></input>       
        </div>
        <div style={user ?{borderWidth:"1px"} :{border:"none"}} className=" flex flex-col rounded-md mt-1 gap-2 cursor-pointer">{userinfo.map((user, index) => <div key={index} className="text-center font-bold text-xl border-b border-slate-400 p-1 mx-4 hover:border-red-400">{user.username}</div>)}</div>
    </div>
}