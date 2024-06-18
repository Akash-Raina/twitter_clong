import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
export const Authheader = ({type}:{type: 'signup' | 'signin'})=>{

    return <div className="flex flex-col items-center gap-2">
        <FaXTwitter className="text-white mt-12" size={60}/>
        <span className="text-white font-sans font-bold text-3xl">{type == 'signin' ? 'Sign In to Twitter' : 'Sign Up to Twitter'}</span>
        <div className="flex gap-2 justify-end text-sm">
            <div className="text-white">
                {type == 'signup' ? 'Already have an account ?' : 'Create new Account ?'}
          </div>
            <Link to={type == 'signup' ? "/signin" : "/signup"} className="text-white underline">{type == 'signup' ? "signin" : "signup"}</Link>
        </div>
    </div>
}