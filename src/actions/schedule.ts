import prisma from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'; 

type ExerciseItem = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export async function getWorkoutByUser() {
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

export async function getWorkoutById(id: string) {
  return await prisma.workout.findUnique({
    where: { id },
    include: { exercise: true },
  });
}

export async function updateWorkout(
    id: string,
    title: string,
    type: string,
    exercises: (ExerciseItem & { id?: string })[] // tambahkan id opsional
  ) {
  const invalidExercise = exercises.find((ex) => !ex.id);
  if (invalidExercise) {
    throw new Error("Semua exercise harus memiliki ID. Update dibatalkan.");
  }
  
  await prisma.workout.update({
    where: { id },
    data: {
      title,
      type,
    },
  });
  
  await Promise.all(
    exercises.map((ex) => {
        prisma.exercise.update({
          where: { id: ex.id },
          data: {
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
          },
        })
    })
  );

  return { success: true };
}