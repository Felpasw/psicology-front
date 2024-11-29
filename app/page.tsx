'use client'
import {Input} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface login {
  email: string,
  password: string
}

export default function Home() {
  const [login, setLogin] = useState({} as login)

  const submit = (): void => {
    
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[100vh] gap-12">
      <img src="./logo.png" alt="" />
        <Input type="email" label="Email" value={login.email} onChange={((e) => setLogin({...login, email: e.target.value}))}/>
        <Input type="password" label="Senha" value={login.password} onChange={((e) => setLogin({...login, email: e.target.value}))}/>
        <Button color="primary" variant="light" className="w-full">
        Enviar
      </Button> 
    </main>
  );
}
