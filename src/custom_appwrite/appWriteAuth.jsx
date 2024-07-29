import {Account,ID as id } from "appwrite";
import { client } from "./client";


export const account = new Account(client);
export const ID=id;
export const getUser=async()=>account.get()