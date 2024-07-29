import { Oval } from "react-loader-spinner"
export const Spinner=({height,width})=>{
    return (<Oval
        visible={true}
        height={height}
        width={width}
        color="white"
        secondaryColor="white"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />)
}