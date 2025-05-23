'use client'

import {SearchExercises} from '@/components/Latihan/Rekomendasi/RecommendationSearchBar'
import { BodyParts } from './RecommendationBodyParts';
import { useState } from 'react';

type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
};

export const RecomendationPage =  () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  

   return(
      <section className='relative bg-gradient-to-b from-white to-yellow-400 py-24 dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FACC15,#000000_100%)] overflow-clip'>
         <div className="container">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex justify-center">
                  <div className="text-sm inline-flex font-semibold border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20 ">
                     Pilih. Lakukan. Berkembang.
                  </div>
               </div>
               <h2 className="pb-2 text-center text-3xl md:text-[54px] md:leading-[64px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
                  Bingung Mau Latihan Apa?
               </h2>
               <p className="text-center text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
               Kami bantu pilihkan latihan yang sesuai dengan tujuan dan kemampuanmu!
               </p>

                {/*Search Bar */}
               <SearchExercises setExercises={setExercises} />


                {/*Body Parts */}
               <div className='mx-auto p-6 rounded-[24px] shadow-xl 
                 bg-white/30 backdrop-blur-md border border-white/20
                 max-w-5xl mt-5'>


                  <BodyParts setExercises={setExercises}/>
                  

               </div>

               <div className='mx-auto p-2 rounded-[24px] shadow-xl 
               bg-white/30 backdrop-blur-md border border-white/20
               max-w-5xl mt-5'>

                {/*The results of the search bar and body part should be here */}

                {exercises.length > 0 ? (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {exercises.map((exercise) => (
                      <div key={exercise.id} className="bg-white rounded-lg shadow p-4" >
                        <img src={exercise.gifUrl} alt={exercise.name} className='w-full h-40 object-contain rounded mb-2'/>
                        <h3 className="font-semibold text-lg">{exercise.name}</h3>
                        <p className="text-sm text-gray-600">Target: {exercise.target}</p>
                        <p className="text-sm text-gray-600">Equipment: {exercise.equipment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600"> Pilih bagian tubuh atau cari latihan untuk melihat hasilnya. </p>
                )} 
                  
               </div>               
            </div>
         </div>
      </section>
   );
};