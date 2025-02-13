import Image from "next/image";
interface User {
  name: string;
  email: string;
}
async function GetAllUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/userdata/`,
    {
      cache: "no-store", // Prevent caching for fresh data
    }
  );
  if (!res.ok) {
    throw new Error("User not found");
  }
  const data = await res.json();
  const users: User[] = data.users;
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
            {users?.map((item, index) => (
              <>
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
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GetAllUsers;
