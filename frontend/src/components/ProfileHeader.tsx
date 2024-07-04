
export const ProfileHeader = ()=>{
    const username = localStorage.getItem("username");
    return <div className="flex flex-col items-center mt-5">
        <div className=" border rounded-full w-16 h-16 flex justify-center items-center text-2xl text-slate-600 bg-[#f9dc5cff]">{username? username[0].toUpperCase() : "A"}</div>
        <div className="text-slate-400">@{username}
        </div>
    </div>  
}