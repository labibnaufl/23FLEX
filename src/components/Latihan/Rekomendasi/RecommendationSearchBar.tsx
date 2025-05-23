'use client';

import { useEffect, useState } from "react";
import { FetchData, ExerciseOptions } from "@/actions server/fetchdata";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";

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

export const SearchExercises = ({setExercises}: Props) => {
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    if (!search) return;

    try {
      const exerciseData = await FetchData(
         'https://exercisedb.p.rapidapi.com/exercises',
        ExerciseOptions);

      const searchedExercises = exerciseData.filter(
         (exercise: any) => exercise.name.toLowerCase().includes(search)
         ||exercise.target.toLowerCase().includes(search)
         ||exercise.equipment.toLowerCase().includes(search)
         ||exercise.bodyPart.toLowerCase().includes(search)
      
      );

      

      setSearch('');
      setExercises(searchedExercises);

    } catch (error) {
      console.error("API error:", error);
      }
  };

  return (
  <>
      {/* Search Bar */}
      <div className="flex flex-col items-center">
         <div className="flex items-center bg-[#fffff3] w-full max-w-2xl px-4 py-2 mb-4 rounded-lg mt-5">
            <div className="flex flex-row items-center w-full mr-4">
               <input
                className="bg-transparent text-sm font-medium outline-none w-full py-1"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                   if (e.key === 'Enter') handleSearch();
                }}
                placeholder="Masukin Judul Latihan Kamu"
               />
               <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-black -mr-6"
                onClick={handleSearch}>
                  <Search className="w-3 h-3" />
               </Button>
            </div>
         </div>
      </div>
   </>
  );
};
