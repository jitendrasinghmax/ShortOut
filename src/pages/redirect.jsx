import { getUrl } from "@/database/appwrite";
import { useEffect, useState,useRef } from "react"
import { useParams } from "react-router-dom";
export const Redirect=()=>{
    const {id}=useParams();
    let [url,SetUrl]=useState(null);
    const ref=useRef(null);
    const getUrlHandeler=async(id)=>{
        const resp=await getUrl(id)
        SetUrl(resp)
    }
    useEffect(()=>{
        getUrlHandeler(id);
    },[])
    useEffect(()=>{
        if(url){
            ref.current.href=url
            ref.current.click();
        }
       
    },[url])
    return (<>
    <a ref={ref}></a>
    <div className="text-8xl text-gray-800 font-extrabold text-center mt-[20%]">shortOUT</div>
    </>)
}