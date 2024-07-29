import { Button } from "@/components/ui/button";
import { useAuth } from "@/contextApi/auth"
import { getClicks, getDoc } from "@/database/appwrite"
import { useState, useEffect ,useRef} from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { QRCodeDownload } from "./downloadQr";

export const MyUrls = () => {
    const navigate=useNavigate();
    const qrCodeRef=useRef(null);
    let [urlIds, setUrlIds] = useState(null);
    let [urlDetails, setUrlsDetails] = useState([]);
    const { user } = useAuth();
    const getClicksHandeler = async (id) => await getClicks(id);
    const getDocHandeler = async () => {
        await getDoc(user.service=='appwrite'?user.user.$id:user.user.uid).then((resp) => setUrlIds(() => resp.URLID.map((item) => item)))
    }
    useEffect(()=>{
        if(urlIds){
        urlIds.map(async(item)=>await getClicksHandeler(item).then((resp)=> setUrlsDetails((prev)=>{
            prev[prev.length]=resp;
            return prev.map((item)=>item);
        })))  
        }
    },[urlIds])
    useEffect(()=>{
        getDocHandeler()
    },[])
    useEffect(()=>{
        if(!user.service){
        navigate('/')
        }
    },[user])
    console.log(urlDetails)
    console.log(urlIds)
    return (<>
        {urlDetails.length>0?<div className="flex flex-col items-center gap-4 h-fit ">
            {urlDetails.map((item) => <div key={crypto.randomUUID()} className="flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-3 sm:gap-2 w-[90%] lg:w-[60%] h-fit sm:h-[250px] p-2 bg-gray-700  border-gray-400 border-[solid] border-[2px] rounded-xl">
                <div className="row-span-3 w-full h-full flex flex-col gap-2 justify-center items-center">
                   <div ref={qrCodeRef}>
                   <QRCode
                        className="h-fit  w-fit "
                        size={180}
                        value={`${window.location.protocol}//${window.location.hostname}:${window.location.port ? window.location.port : ""}/` +item.id}
                        viewBox={`0 0 256 256`} />
                    </div>
                    <QRCodeDownload url={`${window.location.protocol}//${window.location.hostname}:${window.location.port ? window.location.port : ""}/` +item.id}/>
                </div>
                <div className=" h-fit text-white font-extrabold w-full col-span-2">CLICKS:  {item.clicks}</div>
                <div className=" h-fit text-white font-extrabold w-full col-span-2">Short Url:<a href={`${window.location.protocol}//${window.location.hostname}:${window.location.port ? window.location.port : ""}/` +item.id} className="text-xl text-blue-400">{`${window.location.protocol}//${window.location.hostname}:${window.location.port ? window.location.port : ""}/` +item.id}</a></div>
                <div className=" h-fit text-white font-extrabold w-full col-span-2 overflow-hidden">Url:<a href={item.url} className="text-xl  text-blue-400">{item.url}</a></div>
            </div>)}
        </div>:<div className="flex flex-col items-center gap-4 h-fit w-full ">
            {[1.2,3,4,5,6].map((item)=><Skeleton className="w-[60%] h-[200px] bg-slate-400"></Skeleton>)}
            </div>}
    </>)
}