'use server';

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProfilebyUsername(username: string) {
   try {
      const user = await prisma.user.findUnique({
         where: {username: username},
         select: {
            id: true,
            name: true,
            username: true,
            image: true,
            createdAt: true,
            updateAt: true,
            workouts: {
               select: {
                  id: true,
                  type: true,
                  title: true,
                  createdAt: true,
                  exercise: {
                     select: {
                        id: true,
                        name: true,
                        sets: true,
                        reps: true,
                        weight: true,
                     }
                  }
               }
            }
         }
      });

      if (!user) return null;

      return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updateAt: user.updateAt.toISOString(),
      workouts: user.workouts.map(w => ({
         ...w,
         createdAt: w.createdAt.toISOString(),
         })),
      };
   }  catch (error) {
      console.error("Terjadi kesalahan dalam menganbil profil:", error);
      throw new Error("Gagal mengambil data user");
   }
   
}

export async function updateProfile(formData: FormData) {
   try {
      const {userId: clerkId} = await auth();
      if (!clerkId) throw new Error("User Tidak Ditemukan");

      const name = formData.get('name') as string;

      const user = await prisma.user.update({
         where: {clerkId},
         data: {
            name,
         },
      });

      revalidatePath("/profile");
      return{success: true, user};
   }  catch (error) {
      console.error("Error memperbarui nama");
      return {success: false, error: "Gagal memperbarui profil"};
   }
}