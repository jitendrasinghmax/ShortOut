import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contextApi/auth"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const Header = () => {
    let [profile, setProfile] = useState({ proPic: "", name: "" })
    const navigate=useNavigate();
    const notify = (msg) => toast(msg);
    const { user, logOut } = useAuth();
    useEffect(() => {
        if (user.service == 'google') {
           
            setProfile({ proPic: user.user.photoURL, name: user.user.displayName })
            
        }
        else if (user.service == 'appwrite') {
            setProfile({ proPic: "", name: "" })

        }else{
            notify('you are logged out...')
        }
    }, [user])
    return (
        <>
        <Toaster/>
            <div className="flex justify-between px-6 py-3">
                <button><h1 className="text-3xl font-extrabold text-gray-800" onClick={()=>navigate('/')}>ShortOUT</h1></button>
                {!user.service ?  <Button onClick={()=>navigate('/createlink')}>Create Shot Link</Button> : <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border-none rounded-3xl">
                            {user.service && <Avatar>
                                <AvatarImage src={profile.proPic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=>navigate("/myurl")}>My Urls</DropdownMenuItem>
                            <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>}
            </div>
        </>
    )
}