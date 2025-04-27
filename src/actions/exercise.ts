'use server';

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type ExerciseItem = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export async function createWorkout(
  title: string,
  type: string,
  exercises: ExerciseItem[]
) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const newWorkout = await prisma.workout.create({
    data: {
      title,
      type,
      user: {
        connect: {
          clerkId: user.id,
        },
      },
      exercise: {
        create: exercises,
      },
    },
  });

  return newWorkout;
}
