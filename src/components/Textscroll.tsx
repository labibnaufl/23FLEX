export const TextScroll = () => {
   return (
     <div className="py-8 md:py-12 bg-white dark:bg-black overflow-hidden relative">
       <div
         className="whitespace-nowrap text-yellow-400 text-2xl font-extrabold "
         style={{
           maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
           WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
         }}
       >
         {"JOIN US! ".repeat(20)}
       </div>
     </div>
   );
 };
 