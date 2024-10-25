'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
type UserData = {
    name: {
        first: string
        last: string
    },
    email: string,
    picture: { medium: string }
}

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [gender, setGender] = useState<string | null>(null)

    useEffect(() => {console.log("Gender: ", gender)},[gender])

  
    const fetchUserData = async () => {
        try {
            const baseUrl = "http://localhost:5000/user"
            let response
            console.log("Gender: ",gender)
            if (gender) {
                response = await fetch(`${baseUrl}?gender=${gender}`)
            } else {
                response = await fetch(baseUrl)
            }
            if (!response.ok) {
                throw new Error("Unexpected Error")
            }
            const data = await response.json();
            setUserData(data.results[0])
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }



    const [user, setUser] = useState<Partial<UserData>>()
    const [fullName, setFullName] = useState<Partial<UserData>>()
    const [email, setEmail] = useState<Partial<UserData>>()
    const [picture, setPicture] = useState<string | Partial<UserData>>('')

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        setUser(userData?.name?.first)
        setFullName(`${userData?.name?.first} ${userData?.name?.last}`)
        setEmail(userData?.email)
        setPicture(userData?.picture?.medium)
    }, [userData])

    return (
      <div className="text-slate-100 bg-slate-800 flex flex-col min-h-dvh min-w-dvw items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col justify-start items-start drop-shadow-xl border border-slate-800 rounded-xl p-2 gap-1 bg-slate-900">
            <h1 className="text-xl text-blue-300">Hello, {user}</h1>
            <div className="flex flex-row items-start gap-2 m-2">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={picture} alt="avatar" />
                    <AvatarFallback className="text-black bg-slate-200">PC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start gap-2">
                    
                    <div className="flex flex-row gap-1 items-center">
                        <h2>Name:</h2>
                        <div className="border border-slate-200 p-2 rounded-md min-w-56">{fullName}</div>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <h2>Email:</h2>
                        <div className="border border-slate-200 p-2 rounded-md min-w-56">{email}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col pt-4">
            <Select onValueChange={(v) => setGender(v)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem  value="male">Male</SelectItem>
                    <SelectItem  value="female">Female</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={fetchUserData}>Get User</Button>
        </div>
      </div>
    );
  }
  