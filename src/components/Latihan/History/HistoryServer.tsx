'use server';

import { getWorkoutByUser } from "@/actions server/schedule";
import { WorkoutListClient } from "./History/HistoryClient";
import asset1 from '@/assets/Dumbell.png'
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const HistoryLatihan = async () => {
  const workouts = await getWorkoutByUser();

  if (workouts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Kamu belum latihan loh!
      </p>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-yellow-400 py-24 dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FACC15,#000000_100%)] overflow-clip">
      <div className="container">
        {/* Header Section */}
        <div className="max-w-[540px] mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="text-sm inline-flex font-semibold border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20">
              Setiap latihan yang kamu lakukan membawa kamu lebih dekat ke tujuan.
            </div>
          </div>

          <h2 className="pb-2 text-center flex items-center justify-center gap-3 text-3xl md:text-[54px] md:leading-[64px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
            Kilas Balik Latihanmu
          </h2>

          <p className="text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
            Riwayat latihanmu tersimpan di sini — pantau progres dan konsistensimu setiap hari!
          </p>
        </div>


         <div className="mx-auto p-2 rounded-[24px] shadow-xl 
           bg-white/30 backdrop-blur-md border border-white/20 
            max-w-md sm:max-w-lg lg:max-w-2xl mt-5">

               {/* Searchbar & List*/}
               <WorkoutListClient workouts={workouts} />

               <Button variant="default" className="flex items-center gap-2 mt-5" asChild>
                <Link href="/exercise">
                  <PlusIcon className="w-4 h-4" />
                  <span>Catat Latihan Baru</span>
                </Link>
               </Button>

               <div>
                <Image
                  width={150}
                  height={150}
                  src={asset1}
                  alt='dumbell 1'
                  className="lg:block absolute  -left-[200px] -top-[50px] transform rotate-[-30deg]
                  hidden blur-sm opacity-95" 
                 />
              </div>

              <div>
              <Image
                width={200}
                height={200}
                src={asset1}
                alt='dumbell 2'
                className="lg:block absolute  -right-[250px] -top-[30px] transform rotate-[-30deg]
                blur-sm opacity-95" 
              />
            </div>

            <div>
              <Image
                width={250}
                height={250}
                src={asset1}
                alt='dumbell 3'
                className="lg:block absolute  -left-[230px] -bottom-[20px] transform rotate-[-30deg]
                blur-sm opacity-95" 
              />
            </div>

            <div>
              <Image
                width={300}
                height={300}
                src={asset1}
                alt='dumbell 4'
                className="lg:block absolute -right-[280px] 
                -bottom-[100px] transform rotate-[30deg]
                blur-sm opacity-95" 
              />
            </div>
         </div>
      </div>
   </section>
  );
};
