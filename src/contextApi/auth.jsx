import { createContext, useContext, useEffect, useState } from "react";
import { account, ID ,getUser} from "@/custom_appwrite/appWriteAuth";
import { signOutGoogle } from "@/googleAuth/googleAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/googleAuth/googleAuth"

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
    let [user, setUser] = useState({
        service: null,
        userId: null,
    })
    const logOut = async () => {
        if (user.service == 'appwrite') {
            await account.deleteSession('current').then((resp) => {
                setUser({ service: null, user: null })
            })
        }
        if (user.service == 'google') {
            signOutGoogle(auth)
            setUser({ service: null, user: null })
        }
    }
    useEffect(() => {
        onAuthStateChanged(auth, (googleUser) => {
            if (googleUser) {
                setUser({ service: 'google', user: googleUser })
            }
        })
        getUser().then((resp) => {
            setUser({ service: "appwrite", user: resp })
        })
    },[])
    return (
        <AuthContext.Provider value={{
            user, setUser, logOut
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}