'use client'

import { ExerciseOptions, FetchData } from "@/actions server/fetchdata"
import { useEffect, useState } from "react"
import { BicepsFlexed } from "lucide-react";

type Exercise = {
   id: string;
   name: string;
   bodyPart: string;
   target: string;
   equipment: string;
   gifUrl: string;
 };

 type Props = {
   setExercises: (exercises: Exercise[]) => void;
 };
 

export const BodyParts = ({setExercises}: Props) => {
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<string>('all');

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
         const bodyPartsData = await FetchData(
           'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
           ExerciseOptions
         );
         setBodyParts(['all', ...bodyPartsData]);
       } catch (error) {
         console.error("Error Fetching Body Parts:", error);
       }
      };


    

    fetchExerciseData();
  }, []);

  const handleClick = async (part: string) => {
    setSelectedPart(part);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

    try {
      const exercises = await FetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`,
        ExerciseOptions
      );
      setExercises(exercises);
      
    } catch (error) {
      console.error("Error fetching exercises for part:", part, error);
    }
  };

  return (
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4'>
         {bodyParts.map((part, idx) => (
         <div
            key={idx}
            onClick={() => handleClick(part)}
            className="flex flex-col items-center justify-center bg-[#f7f7d3]
             border border-gray-300 border-solid rounded-lg p-4 shadow-sm 
             hover:shadow-md transition cursor-pointer 
             hover:bg-yellow-300 h-[100px] sm:h-[150px] md:h-[200px]"
         >
            <BicepsFlexed className="text-orange-400 w-10 h-10 mb-5" />
            <span className="text-[20px] font-medium text-black">
               {part.charAt(0).toUpperCase() + part.slice(1)}
            </span>
         </div>
         ))}
      </div>
  );
};
