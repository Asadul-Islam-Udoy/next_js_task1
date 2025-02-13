import Image from "next/image";
import GetAllUsers from '@/app/component/users/GetAllUsers'
function ProfilePage() {
    return (
        <>
         <div className="h-screen flex flex-col gap-4 items-center mt-10">
            <div>
               <Image src='' className="h-24 w-24 border rounded-full"/>
            </div>
            <div>
            <span className="m-4 italic">User Name:</span>
            <br/>
            <span className="m-4 italic">User Email:</span>
            </div>
         </div>
         <div>
            <GetAllUsers/>
            </div>
        </>
    )
}

export default ProfilePage
