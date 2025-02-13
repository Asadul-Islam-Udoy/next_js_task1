"use client";
import axios from "axios";
import { useEffect, useState } from "react";
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}
interface UsersPageProps {
  users: User[];
}
export default async function GetAllUsers() {
  const [usersInfo, setUsersInfo] = useState< UsersPageProps| []>([]);
  const [lodding, setLodding] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
        try {
          const res = await axios.get('/api/users/userdata/');
          if (!res) {
            throw new Error("User not found");
          }
          setUsersInfo(res.data.users);
          setLodding(false);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLodding(false);
        }
      }
    fetchUser();
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
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}



