import { categoryNames } from "@/constants";
import db from ".";
import { categories } from "./schema";

const main = async()=>{
    console.log("Seeding database");
    try {
       const values = categoryNames.map((name) => ({
         name,
         description: `Videos related to ${name.toLowerCase()}`,
       })); 
       await db.insert(categories).values(values);
    } catch (error) {
        console.error("Error Seeding database", error);
        process.exit(1);
    }
}
main();