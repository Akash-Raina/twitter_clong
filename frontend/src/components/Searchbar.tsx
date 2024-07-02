import { IoSearch } from "react-icons/io5";


interface SearchbarProps {
    searchInputRef: React.RefObject<HTMLInputElement>;
}
export const Searchbar: React.FC<SearchbarProps> = ({searchInputRef})=>{

    return <div className="flex h-12 mt-2 w-[80%] items-center gap-4 pl-3 rounded-3xl bg-[#1b1c1c]">
        <IoSearch className="text-[#7f8585]" size={25}/>
        <input ref= {searchInputRef} className="text-[#7f8585] bg-transparent outline-none" placeholder="Search"></input>       
    </div>
}