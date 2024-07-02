import { MdHomeFilled } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuPenSquare } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    searchInputRef: React.RefObject<HTMLInputElement>;
}

export const Navbar: React.FC<NavbarProps> = ({searchInputRef})=>{
    const navigate = useNavigate();
    
    const handleSearchClick = ()=>{
        if(searchInputRef && searchInputRef.current){
            searchInputRef.current.focus();
        }
    }
    return <div className="flex flex-col gap-6 items-end pt-3 pr-5 cursor-pointer">
        <FaXTwitter onClick={()=>{window.scrollTo(0, 0);navigate('/')}} size={30}/>
        <MdHomeFilled onClick={()=>{window.scrollTo(0, 0);}} size={30}/>
        <IoSearch onClick={handleSearchClick} size={30}/>
        <IoPersonOutline size={30}/>
        <LuPenSquare size={30} />
    </div>
}