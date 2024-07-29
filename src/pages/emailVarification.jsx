//ui
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";

import { useEffect, useState } from "react"
import { useAuth } from "@/contextApi/auth";
import { useNavigate, useParams } from "react-router-dom";
import { account } from "@/custom_appwrite/appWriteAuth";


export const EmailVarification = () => {
    const navigate = useNavigate();
    const params=useParams();
    let [otp, setOtp] = useState();
    let [loading,setLoading]=useState(false);
    const { user, setUser } = useAuth();
    const notify = (msg) => toast(msg);
    const varify = async () => {
        try{
            setLoading(true);
            const session = await account.createSession(
                params.id,
                otp
            );
            setLoading(false)
            setUser({ service: "appwrite", user: session })
        }catch(error){
            notify(error.message)
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user.service) {
            notify('you are logged in sucessfully.')
            setTimeout(()=>{
                navigate('/')
            },1500)
        }else{
            notify('OTP sent sucessfully.')
        }
    },[user])
    return (
        <>
        <Toaster/>
            <div className="mt-[30vw] md:mt-[10vw] flex flex-col items-center">
                <div className="w-fit flex flex-col items-center my-auto">
                    <InputOTP maxLength={6} onChange={(e) => setOtp(e)}>
                        <InputOTPGroup >
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-gray-700 font-semibold">Enter One Time Password</p>
                    <Button className="w-full mt-4" onClick={varify}>{loading?<Spinner height={30} width={30} /> :"submit"}</Button>
                </div>
                
            </div>
        </>
    )
}