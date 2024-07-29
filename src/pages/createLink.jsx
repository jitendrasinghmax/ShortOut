import { useEffect, useState, useReducer, useRef } from "react";
import { Input } from "@/components/ui/input";
import { shortLink } from "@/database/appwrite";
import { useAuth } from "@/contextApi/auth";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { QRCodeDownload } from "./downloadQr";

//ui
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";


export const CreateLink = () => {
    let navigate = useNavigate();
    let [url, setUrl] = useState();
    let [userDetails, setUserDetails] = useState({ id: "" });
    let [shortLinkId, setShortLinkId] = useState(null);
    let [shortLinkUrl, setShortLinkUrl] = useState(null)
    let [loading, setLoading] = useState(false);
    let [showQR, setShowQr] = useState(false)
    let qrCodeRef = useRef(null);
    const { user } = useAuth();
    const createShortLink = async () => {
        setLoading(true)
        const resp = await shortLink({ id: userDetails.id, url: url }).then((resp) => resp)
        setLoading(false)
        if (resp) {
            setShortLinkId(resp)
        }
    }
    useEffect(() => {
        console.log(user)
        if (user.service == "google") {
            setUserDetails({ id: user.user.uid })
        }
        else if (user.service == 'appwrite') {
            setUserDetails({ id: user.user.$id })
        } else {
            navigate('/login')
        }
    }, [user])
    useEffect(() => {
        if (shortLinkId) {
            setShortLinkUrl(`${window.location.protocol}//${window.location.hostname}:${window.location.port ? window.location.port : ""}/` + shortLinkId)
        }
    }, [shortLinkId])
    return (
        <>
        
            <h1 className="text-gray-700 text-5xl font-extrabold text-center mt-[5%]">Redy to Create your URL</h1>
            <div className="flex flex-col items-center mt-[10%] justify-center gap-3">
                {loading ? <Skeleton className="w-[50%] h-[30px] rounded-xl"></Skeleton> : shortLinkUrl ? <><h1 className="text-gray-700 text-2xl font-extrabold ">hear is your shortest URL</h1> <a href={shortLinkUrl}>{shortLinkUrl}</a></> : ""}
                <Input className="w-[50%] mb-5" placeholder="Enter URL" onChange={(e) => setUrl(e.target.value)}></Input>
                <Button className="px-3" onClick={createShortLink}>{loading ? <Spinner height={30} width={30}></Spinner> : "CREATE Short URL"}</Button>
                {shortLinkUrl ?showQR?<QRCodeDownload url={shortLinkUrl}/>:<Button onClick={() => setShowQr((prev) => !prev)}>Create QR</Button> :""}
                {showQR ? <div className="h-fit w-full">
                    <QRCode
                        className="h-1/2  w-1/2 sm:h-1/3 sm:w-1/3 lg:w-1/4 lg:h-1/4 mx-auto"
                        size={180}
                        // style={{height:"30%",width:"30%"}}
                        value={shortLinkUrl}
                        viewBox={`0 0 256 256`} />
                </div> : ""}
            </div>
        </>
    )
}