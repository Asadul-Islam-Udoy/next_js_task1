"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function LogoutButtom() {
  const router = useRouter();
  async function logoutHandler() {
    const response = await fetch("/api/users/logout");
    if (!response.ok) {
      throw new Error("User not found");
    }
    toast.success("logout successfully!");
    router.push("/");
  }
  return (
    <div>
      <button
        onClick={logoutHandler}
        className="bg-blue-700 m-1 p-1 rounded-md text-white font-serif cursor-pointer border border-white"
      >
        logout
      </button>
    </div>
  );
}

export default LogoutButtom;
