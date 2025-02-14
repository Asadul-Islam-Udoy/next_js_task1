"use client"
import Image from "next/image";
import LogoutButtom from "@/app/component/users/LogoutButtom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GetAllUsers from "../component/users/GetAllUsers";
interface User {
  name: string;
  email: string;
}

// React component to display users
export default function UserProfilePage() {
  const [user,setUser] = useState<User>({
    name:'',
    email:''
  });

  useEffect(()=>{
    function ProfileHandler() {
      fetch("/api/users/jwtverify/")
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "An error occurred");
        });
    }
    ProfileHandler();
  },[]);
  return (
    <div className="h-screen flex flex-col gap-4 items-center mt-10">
      <div>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="User Profile"
          className="h-24 w-24 border rounded-full"
          width={96} // Define width
          height={96} // Define height
        />
      </div>
      <div className=" flex items-center flex-col">
        <span className="-mt-3  italic">{user?.name}</span>
        <br />
        <span className=" -mt-1 italic">{user?.email}</span>
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-300 flex justify-between">
          <h1 className="font-bold ml-2">User Lists</h1>
          <LogoutButtom /> 
        </div>
        <GetAllUsers />
      </div>
    </div>
  );
}
