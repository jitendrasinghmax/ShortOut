
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,signInWithPopup,getAuth, signOut} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { account } from "@/custom_appwrite/appWriteAuth";
import { createDoc, isUser } from "@/database/appwrite";

const firebaseConfig = {

  apiKey:import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "shortner-c26d3.firebaseapp.com",
  projectId: "shortner-c26d3",
  storageBucket: "shortner-c26d3.appspot.com",
  messagingSenderId: "851418499297",
  appId: "1:851418499297:web:c667e31b4496105976cfa0",
  measurementId: "G-JVK25VRQW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider()
export const signInWithGoogle=async()=>{
    await signInWithPopup(auth,googleProvider).then(async(resp)=>{
        try{
            await isUser(resp.user.uid).then((resp)=>console.log(resp))
        }catch(error){
            console.log(error.message)
            await account.create(
                resp.user.uid, // userId
                resp.user.email, // email
                "75849677", // password
            )
            await createDoc({data:{email:resp.user.email},docId:resp.user.uid})
        }
       
    })
    
};
export const signOutGoogle=()=>signOut(auth);