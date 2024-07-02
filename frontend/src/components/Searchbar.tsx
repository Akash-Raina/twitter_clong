import { IoSearch } from "react-icons/io5";
export const Searchbar = ()=>{

    return <div className="flex h-12 mt-2 w-[80%] items-center gap-4 pl-3 rounded-3xl bg-[#1b1c1c]">
        <IoSearch className="text-[#7f8585]" size={25}/>
        <span className="text-[#7f8585]">Search</span>       
    </div>
}