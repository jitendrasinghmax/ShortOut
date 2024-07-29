import { Outlet } from "react-router-dom"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export const Layout = () => {
    return (
        <>
            <div className="min-h-screen">
                <div className='h-[60px] bg-yellow-200'>
                <Header/>
                </div>
           
            <div className="bg-green-300 min-h-[500px] sm:min-h-[530px] row-span-5 py-8">
            <Outlet/>
            </div>
          
            <div className="">
            <Footer/>
            </div>
            </div>
        </>
    )
}