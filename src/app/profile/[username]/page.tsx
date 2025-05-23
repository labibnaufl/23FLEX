import { getProfilebyUsername } from "@/actions server/profile.action";
import { notFound } from "next/navigation";
import { ProfilePageClient } from "@/components/Profile Page/ProfilePageClient";

export async function generateMetadata({params}: {params:  {username: string}}) {
   const user = await getProfilebyUsername(params.username);
   if(!user) return;

   return{
      title: `${user.name ?? user.username}`,
   }
   
}


async function ProfilePage({params}: {params: {username: string}}) {
   const user = await getProfilebyUsername(params.username);

   if (!user) return notFound;
   const totalWokouts = user.workouts.length;

   

  return <ProfilePageClient user={user}/>;
  
}

export default ProfilePage
