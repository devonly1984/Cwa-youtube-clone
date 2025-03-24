import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

//shadcn

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//UTIL helper

export const formatDuration =(duration:number)=>{
  const seconds = Math.floor((duration%60000)/1000);
  const minutes = Math.floor(duration/60000)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
export const snakeCaseToTitle = (str:string) =>{
  return str
    .replace("/_/g", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


//uploadthing

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

