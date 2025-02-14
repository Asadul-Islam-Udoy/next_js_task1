"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface User {
  _id: string;
  name: string;
  email: string;
}
interface UsersInfo extends User {
  users: User[];
}
function GetAllUsers() {
  const [users, setUsers] = useState<UsersInfo[]>([]);

  useEffect(() => {
    function ProfileHandler() {
      fetch("/api/users/userdata/")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "An error occurred");
        });
    }
    ProfileHandler();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Acthon
            </th>
          </tr>
        </thead>
        {users?.map((item, index) => (
          <tbody  key={item._id || index}>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <th
                scope="row"

                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  alt="User Profile"
                  className="h-10 w-10 border rounded-full"
                  width={40} // Define width
                  height={40} // Define height
                />
              </td>
              <td className="px-6 py-4">
                <Link href={`/profile/${item?._id}`}>
                  <button className="bg-red-300 p-2 rounded-md text-white">
                    user info
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default GetAllUsers;
