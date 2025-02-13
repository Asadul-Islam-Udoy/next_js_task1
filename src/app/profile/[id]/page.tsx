import Image from "next/image";
import GetAllUsers from "@/app/component/users/GetAllUsers";
import LogoutButtom from "@/app/component/users/LogoutButtom";
interface User {
  name: string;
  email: string;
}

// React component to display users
export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // Get ID from URL

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/userdata/${id}`,
    {
      cache: "no-store", // Prevent caching for fresh data
    }
  );
  if (!res.ok) {
    throw new Error("User not found");
  }
  const data = await res.json();
  const user: User = data.user;

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
          <h1 className="  font-bold">User Lists</h1>
          <LogoutButtom />
        </div>
        <GetAllUsers />
      </div>
    </div>
  );
}
