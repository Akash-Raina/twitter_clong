

export const CreateTweet = ({userName}:{userName:string})=>{

    return <div className="border-b border-[#657786] flex flex-col gap-3 items-end pr-8 py-5">
        <div className="flex gap-3 items-start w-[95%]">
            <span className="border rounded-full text-lg w-9 h-9 text-center pt-1 bg-slate-500">{userName[0].toLocaleUpperCase()}</span>
            <textarea placeholder="What is happening?!" className="w-[90%] h-20 bg-black text-2xl outline-none resize-none" name="" id="" ></textarea>
        </div>
        <button className="rounded-xl bg-sky-600 w-16 h-10 font-bold">Post</button>
    </div>
}