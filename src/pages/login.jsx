import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { account, ID } from "@/custom_appwrite/appWriteAuth"
import { signInWithGoogle } from "@/googleAuth/googleAuth"
import { useAuth } from "@/contextApi/auth"

//ui components
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



//icons
import { FaGoogle } from "react-icons/fa";
import { Spinner } from "@/components/ui/Spinner"

export const Login = () => {
    let [email, setEmail] = useState();
    let [id, setId] = useState(null);
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user}=useAuth();


    const sendEmail = async () => {
        try {
            setLoading(true)
            const sessionToken = await account.createEmailToken(
                ID.unique(),
                email
            )
            setId(sessionToken.userId)

        } catch (error) {
            setLoading(false)
            throw newError(error)
        }
    }
    useEffect(() => {
        if (id) {
            navigate(`/emailvarify/${id}`)
        }
    }, [id])
    useEffect(()=>{
       if(user.service){
        navigate('/')
       }
    },[user])
    return (
        <>
            <h1 className="text-center text-6xl px-5 font-extrabold text-gray-600">Just One Step To short Your URL</h1>
            <div className="flex flex-col items-center justify-center my-10">
                <Card className="w-[90%] sm:w-2/3 lg:w-1/3 h-1/2 px-4">
                    <CardHeader className=''>
                        <CardTitle>Log in to your Account</CardTitle>
                        <CardDescription>one step login/create account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="justify-center flex flex-col items-center">
                            <Input className="w-2/3 mb-5" type={email} value={email} placeholder="enter emial" onChange={(e) => setEmail(e.target.value)} />
                            <Button onClick={sendEmail} className="w-2/3">{loading ? <Spinner height={30} width={30} /> : "Login"}</Button>
                        </div>
                        <p className="text-center mt-1">OR</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={signInWithGoogle} className='w-2/3 mx-auto'><FaGoogle /><p className="ml-3">Google</p></Button>
                    </CardFooter>
                </Card>

            </div>

        </>
    )
}

