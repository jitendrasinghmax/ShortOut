import { MailIcon, PhoneIcon } from "lucide-react"

export const Footer=()=>{
    return (<>
    <div className="w-[100%] h-full bg-gray-800 flex flex-col p-4 gap-4">
        <div className="text-lg font-semibold text-white text-center">Created By Jitendra Singh</div>
        <div className="text-sm font-semibold text-white  flex gap-4 justify-center ">
            <div className="flex gap-2"><MailIcon/>js8322870@gmail.com</div>
            <div  className="flex gap-2"><PhoneIcon/>8617843959</div>
        </div>
        <div className="text-lg font-semibold text-white text-center">About</div>
        <div className="text-center text-white text-xs lg:w-[40%] mx-auto
        
        
        ">Introducing our new URL shortening service! Simplify your long and cumbersome links into concise, easy-to-share URLs in just a few clicks. Our platform ensures your links remain neat, manageable, and perfect for social media, emails, and more. Experience seamless link management with our user-friendly website today!</div>
    </div>
    </>)
}