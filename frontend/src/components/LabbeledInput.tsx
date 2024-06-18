import { ChangeEvent } from "react";

interface LabbeledType {
    label: string;
    placeholder: string;
    type?: string;
    onchange: (e:ChangeEvent<HTMLInputElement>) => void;
}
export const LabbeledInput = ({label, placeholder, type, onchange}: LabbeledType)=>{
    return <div className="w-[270px] flex justify-between items-center">
        <label htmlFor="" className="text-white">{label}</label> 
        <input onChange={onchange} type={type || "email"} placeholder={placeholder} className="shadow-sm bg-black border border-gray-500 text-white h-10 w-[70%] text-sm rounded-lg pl-2"/>
    </div>
}