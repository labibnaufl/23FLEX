'use client';

import { updateProfile } from "@/actions server/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button,  } from "../ui/button";
import { UsernameEditModal } from "./usernameModal"
import { WorkoutListClient } from "../Latihan/History/HistoryClient";


type Exercise = {
   id: string;
   name: string;
   sets: number;
   reps: number;
   weight: number;
 };
 
 type Workout = {
   id: string;
   type: string;
   title: string;
   createdAt: string;
   exercise: Exercise[];
 };
 
 type User = {
   id: string;
   name: string | null;
   username: string;
   image: string | null;
   createdAt: string;
   updateAt: string;
   workouts: Workout[];
 };

export function ProfilePageClient({user}: {user: User}) {
   const totalWorkouts = user.workouts.length;

   const [editForm, setEditForm] = useState({
      name: user.name || "",
   });




   return (
      <section className='relative bg-white py-24 overflow-clip'>
         <div className="container">
            <div className="max-w-3xl mx-auto">
               <div className="grid grid-cols-1 gap-6">
                  <div className="w-full max-w-lg mx-auto">
                     <Card className="bg-card" >
                        <CardContent className="pt-6">
                           <div className="flex flex-col items-center text-center">
                              <Avatar className="w-24 h-24">
                                 <AvatarImage src={user.image ?? "/avatar.png"}/>
                              </Avatar>

                              <UsernameEditModal currentName={user.name ?? ""}/>

                              <h1 className="mt-4 text-2xl font-bold">{user.name ?? user.username}</h1>
                              <p className="text-muted-foreground">@{user.username}</p>
                              <p className="mt-1 text-sm text-grey-500">
                                 Bergabung sejak{" "}
                                 {new Date (user.createdAt).toLocaleDateString("id-ID", {
                                    year:"numeric",
                                    month: "long",
                                    day: "numeric",
                                 })}                                 
                              </p>
                              <p className="text-sm mt-1">
                                 Total Workout: <strong>{totalWorkouts}</strong>
                              </p>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
      </section>

   );

}