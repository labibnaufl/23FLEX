'use server';

import prisma from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'; 
import { ExerciseItem } from "./exerciseItem";

export async function getWorkoutbyId(id: string) {
   return await prisma.workout.findUnique({
      where: {id},
      include: {exercise: true},
   });
   
}

export async function updateWorkout(
   id: string,
   title: string,
   type: string,
   exercise: (ExerciseItem & {id?: string}) []
)  {

   {/*Update Data*/}

   await prisma.workout.update({
      where: {id},
      data: {
         title,
         type,
      },
   });

   const existingExercises = await prisma.exercise.findMany({
      where: {workoutId: id},
   });

   const clientExerciseIds = exercise
   .filter ((ex) => ex.id)
   .map ((ex) => ex.id!);

   const exercisesToDelete = existingExercises.filter(
      (ex) => !clientExerciseIds.includes(ex.id)
   );

   await prisma.exercise.deleteMany({
      where: {id: {in: exercisesToDelete.map((ex) => ex.id)}}
   });

   for (const ex of exercise) {
      if (ex.id) {
         await prisma.exercise.update({
            where: {id: ex.id},
            data: {
               name: ex.name,
               sets: ex.sets,
               reps: ex.reps,
               weight: ex.weight,
            },
         });
      }  else {
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

   return {success: true}
   
}

{/*Delete Data*/}

export async function deleteWorkout (id: string) {
   try{
      await prisma.exercise.deleteMany({
         where: {workoutId: id},
      });

      await prisma.workout.delete({
         where: {id},
      });

      return{success: true};
   } catch (error) {
      console.error("Gagal Menghapus Workout Kamu", error);
      return{success: false, error:"Gagal Menghapus Workout Kamu"};
   }
   
}