'use server';

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
  exercises: (ExerciseItem & { id?: string })[]
) {
  // 1. Update workout
  await prisma.workout.update({
    where: { id },
    data: {
      title,
      type,
    },
  });

  // 2. Ambil semua exercise yang saat ini ada di database
  const existingExercises = await prisma.exercise.findMany({
    where: { workoutId: id },
  });

  const clientExerciseIds = exercises
    .filter((ex) => ex.id)
    .map((ex) => ex.id!);

  // 3. Hapus latihan yang tidak dikirim oleh client (dihapus di UI)
  const exercisesToDelete = existingExercises.filter(
    (ex) => !clientExerciseIds.includes(ex.id)
  );

  await prisma.exercise.deleteMany({
    where: { id: { in: exercisesToDelete.map((ex) => ex.id) } },
  });

  // 4. Update latihan yang sudah ada dan buat yang baru
  for (const ex of exercises) {
    if (ex.id) {
      await prisma.exercise.update({
        where: { id: ex.id },
        data: {
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
        },
      });
    } else {
      await prisma.exercise.create({
        data: {
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          workoutId: id,
        },
      });
    }
  }

  return { success: true };
}

export async function deleteWorkout(id: string) {
  try {
    // Hapus data terkait di tabel exercises terlebih dahulu
    await prisma.exercise.deleteMany({
      where: { workoutId: id },
    });

    // Setelah latihan dihapus, hapus data workout
    await prisma.workout.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus workout:", error);
    return { success: false, error: "Gagal menghapus workout" };
  }
}
