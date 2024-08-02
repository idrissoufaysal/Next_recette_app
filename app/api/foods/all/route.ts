import { foods } from "@/app/data"


export const  GET=async()=>{
    console.log("get all foods");
return Response.json(foods)
}