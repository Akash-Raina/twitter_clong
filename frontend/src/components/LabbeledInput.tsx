import { UseFormRegister } from "react-hook-form";
import { userSigningType } from "./UserSigning";

interface LabbeledType {
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<userSigningType>;
    name: keyof userSigningType;
    validation?: object
}
export const LabbeledInput = ({label, placeholder, type, register, name, validation}: LabbeledType)=>{
    return <div className="w-[270px] flex justify-between items-center">
        <label htmlFor="" className="text-white">{label}</label> 
        <input 
            {...register(name, validation)}
            type={type || "text"}
            placeholder={placeholder} 
            className="shadow-sm bg-black border border-gray-500 text-white h-10 w-[70%] text-sm rounded-lg pl-2"/>
    </div>
}