import { useAuth } from "@/contextApi/auth"
import { getUser } from "@/custom_appwrite/appWriteAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";



export const Home = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();


    useEffect(() => {
        getUser().then((resp) => {
            setUser({ service: "appwrite", user: resp })
        })
    }, [])
    return (
        <>
            <div className="flex flex-col items-center  gap-5">
            <h1 className="text-5xl text-gray-800 font-extrabold text-center grid mt-[20%] sm:mt-[10%] lg:mt-[5%]"><p>You Are In The </p><p className="text-yellow-400">Right Place</p> <p>To Shortern Your Link In Just Few Steps</p></h1>
                <div>{user.service ? <Button onClick={() => navigate("/createlink")}>create Short URL</Button> : <Button onClick={() => navigate('/login')}>login</Button>}</div>
            </div>
        </>
    )
}