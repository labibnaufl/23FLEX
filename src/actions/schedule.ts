import prisma from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'; 

export async function getWorkoutsByUser() {
  const user = await currentUser();
  if (!user) return [];

  // Ambil semua workout milik user tersebut + exercise-nya
  const workouts = await prisma.workout.findMany({
    where: {
      user: {
        clerkId: user.id,
      },
    },
    include: {
      exercise: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return workouts;
}
