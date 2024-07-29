import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"


export const UserDetails = () => {
    const navigate=useNavigate();
    return (<>
        <div>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
                <div className="flex flex-col items-center pb-10 gap-3">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="" alt="" />
                    <Input type='file' className='w-1/3' placeholder='upload img'></Input>
                    <Input className="w-2/3" placeholder="Enter Your Full Name"></Input>
                    <div className="flex justify-evenly w-full">
                        <Button className="dark" onClick={()=>navigate('/')}>skip</Button>
                        <Button className="dark">Update</Button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}