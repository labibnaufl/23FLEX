'use server';

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ExerciseItem } from "@/actions server/exerciseItem";

export async function getWorkoutByUser() {
   const user = await currentUser();
   if (!user) return [];

   const workouts = await prisma.workout.findMany({
      where : {
         user : {
            clerkId : user.id,
         },
      },
      include: {
         exercise: true,
      },
      orderBy: {
         createdAt: "desc",
      },
      
   });

   return workouts; 
   
}

