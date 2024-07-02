
import { FaRegHeart } from "react-icons/fa";

interface User {
  username: string;
}

interface Tweet {
  user: User;
  content: string;
  likes: [string];
}
export const AllTweets = ({userData}:{userData:Tweet[]})=>{


    return <div>
        {userData.map((data) =>
            <div className="flex flex-col gap-3 border-b border-[#657786]">
                <div className="flex gap-4 px-5 pt-5 items-center">
                    <span className="border rounded-full text-lg w-9 h-9 text-center pt-1 bg-slate-500" style={{ backgroundColor: getRandomColor() }}>{data.user.username[0].toUpperCase()}</span>
                    <span className="font-bold text-xl text-slate-200">{data.user.username}</span>
                </div>

                <div className="mx-[75px] text-lg">
                    {data.content}
                </div>

                <div className="flex gap-3 justify-end pr-10 cursor-pointer pb-5">
                    <FaRegHeart size={23} className="hover:text-red-700"/>
                    <div>{data.likes.length}</div>
                </div>
            </div>
            
        )}
        </div>
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};