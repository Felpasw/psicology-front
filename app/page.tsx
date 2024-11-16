'use client'
import Input from "@/components/input";
import { useState } from "react";



export default function Home() {
 const [email, setEmail]= useState<string>('')
 const [password, setPassword]= useState<string>('')

 
  return (
  <main className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-12 p-">
    <Input label={"E-mail"} value={email} onChange={(e) => setEmail(e.target.value)} width={"w-full"} type={"text"} />
    <Input label={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} width={"w-full"} type={"password"} />
  
  
  </main>      
  );
}
