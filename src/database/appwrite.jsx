import { database, databaseID, googleUserCollectionId, urlIdCollection, urlsCollection, usersCollection } from "@/custom_appwrite/appWriteDb";
import { ID, Query } from "appwrite";


export const createDoc = async ({ data, docId }) => await database.createDocument(databaseID, googleUserCollectionId,
    docId,
    data).then((resp) => console.log("documnt created sucessfully!!!!!!   ", resp))

export const getDocs = async (query, collection) => await database.listDocuments(databaseID, collection, query);
export const getDoc= async (id)=>await database.getDocument(databaseID,usersCollection,id,[]).then((resp)=>resp).catch((error)=>error);
export const isUser = async (docId) => await database.getDocument(databaseID, googleUserCollectionId, docId, []);

export const shortLink = async ({ id ,url}) => {
    //get previous id from database, increment the id, update the current id in the document
    return await database.getDocument(databaseID, urlIdCollection, "669e1d32001e44b1d97a", []).then(async (resp) => {
        const urlID = resp.id;
        await database.updateDocument(databaseID, urlIdCollection, "669e1d32001e44b1d97a", { id: urlID + 1 }, []);
        try {
            await database.getDocument(databaseID, usersCollection, id, []).then(async(resp)=>{
                console.log("document found and document...");
                  //update: push the new url to userID documemnt in user collection
                const urlIDs=resp.URLID;
                urlIDs.push(urlID);
                await database.updateDocument(databaseID,usersCollection,id,{URLID:urlIDs},[]).then(async (resp)=>{
                    console.log("documemnt updated...");
                    try{
                        await database.createDocument(databaseID, urlsCollection,`${urlID}` ,{ clicks: 0, url: url }, []).then((resp)=>console.log("short url created"))
                    }catch(error){
                        console.log(error.message)
                    }
                });
            })
        } catch (error) {
            if (error.code == 404) {
                console.log("document not found")
                //create new user document with custom userID
                await database.createDocument(databaseID, usersCollection, id, { URLID:[urlID] ,displayName:"",photoURL:""}, []).then(async (resp) => {
                    await database.createDocument(databaseID, urlsCollection,`${urlID}` ,{ clicks: 0, url: url }, []);
                }).catch((error) => console.log(error.message))
            }
        }
        return urlID;
    })
}
export const getUrl=async (id)=>await database.getDocument(databaseID,urlsCollection,`${id}`,[]).then(async(resp)=>{
    await database.updateDocument(databaseID,urlsCollection,`${id}`,{clicks:resp.clicks+1}).then(()=>console.log("click updated..."))
    return resp.url;
}).catch((error)=>console.log(error.message));
export const getClicks=async (id)=>await database.getDocument(databaseID,urlsCollection,`${id}`,[]).then((resp)=> {
    console.log("called")
    return {clicks:resp.clicks,url:resp.url,id:resp.$id}});

