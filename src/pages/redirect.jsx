import { getUrl } from "@/database/appwrite";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export const Redirect=()=>{
    const {id}=useParams();
    let [url,SetUrl]=useState(null);
    const getUrlHandeler=async(id)=>{
        const resp=await getUrl(id)
        SetUrl(resp)
    }
    useEffect(()=>{
        getUrlHandeler(id);
    },[])
    useEffect(()=>{
        if(url){
            window.location.href=url;
        }
       
    },[url])
    return (<>
    <div className="text-8xl text-gray-800 font-extrabold text-center mt-[20%]">shortOUT</div>
    </>)
}