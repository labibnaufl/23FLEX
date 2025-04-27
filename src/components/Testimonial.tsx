import avatar1 from "@/assets/Hayabusa.png";
import avatar2 from "@/assets/Aristotle_sq.png";
import avatar3 from "@/assets/Dora.png";
import avatar4 from "@/assets/Marcus.png";
import avatar5 from "@/assets/ViktorEFrankl.png";
import avatar6 from "@/assets/Elmo.png";
import avatar7 from "@/assets/Bebek.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const testimonials = [
   { 
      text: "Latihan tanpa jejak adalah seni. Dengan 23Flex, aku mengasah ketepatan dan konsistensi gerakanku di balik bayangan.", 
      imageSrc: avatar1, 
      name: "Ninja", 
      username: "@Hayabusa420" 
   },

   { 
      text: "Kebiasaan membentuk karakter. 23Flex membantuku mengukir kebiasaan baik melalui latihan yang terarah dan terukur.", 
      imageSrc: avatar2, 
      name: "Aristoteles", 
      username: "@theOG_philosopher" 
   },

   { 
      text: "Ayo kita berpetualang! Dengan 23Flex, aku bisa melacak setiap langkah petualangan latihanku. ¡Vámonos!", 
      imageSrc: avatar3, 
      name: "Dora", 
      username: "@exploradora" 
   },

   { 
      text: "Disiplin adalah kemenangan atas diri sendiri. 23Flex menjadi alatku untuk mengamati dan memperbaiki ketekunan setiap hari.", 
      imageSrc: avatar4, 
      name: "Marcus Aurelius", 
      username: "@stoicmind" 
   },

   { 
      text: "Dalam setiap repetisi yang kucatat di 23Flex, aku menemukan makna dalam perjalanan menuju diri yang lebih kuat.", 
      imageSrc: avatar5, 
      name: "Viktor E. Frankl", 
      username: "@meaningseeker" 
   },

   { 
      text: "Elmo suka banget 23Flex! Membuat latihan jadi seru dan gampang dicatat. Elmo jadi kuat kayak superhero!", 
      imageSrc: avatar6, 
      name: "Elmo", 
      username: "@happylilmonster" 
   },

   { 
      text: "Quack! Dengan 23Flex, aku bisa berenang lebih jauh, berjalan lebih cepat, dan tentu saja... tetap kece.", 
      imageSrc: avatar7, 
      name: "Bebek", username: 
      "@quackpower" 
   },
];

const firstCol = testimonials.slice(0, 3);
const secondCol = testimonials.slice(3, 6);
const thirdCol = testimonials.slice(6); // Fix slicing

type Testimonial = {
  text: string;
  imageSrc: any;
  name: string;
  username: string;
};

type TestiFullProps = {
  className?: string;
  testimonials: Testimonial[];
};

const TestiFull = (props: TestiFullProps) => (
  <div className={twMerge(
    "flex flex-col gap-6 mt-10 [mask:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]", 
    props.className
  )}>
    {props.testimonials.map(({ text, imageSrc, name, username }, index) => (
      <div className="card" key={index}>
        <div>{text}</div>
        <div className="flex items-center gap-2 mt-5">
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-medium tracking-tight leading-5">{name}</div>
            <div className="tracking-tight leading-5">{username}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Komponen Testimonials
export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container">
         <div className="section-heading">
            <div className="flex justify-center mt-10">
               <div className="text-sm font-semibold inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20">
                  Testimonials Pengguna
               </div>
            </div>
            <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
               Apa Pendapat Mereka Tentang 23FLEX?
            </h2>
            <p className="text-center text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
               Dari babak perencanaan hingga pencatatan latihan, aplikasi kami telah menjadi alat yang esensial bagi pengguna di seluruh alam semesta.
            </p>
         </div>
        <div className="flex justify-center gap-6">
          <TestiFull testimonials={firstCol} />
          <TestiFull testimonials={secondCol} className="hidden md:flex"/>
          <TestiFull testimonials={thirdCol} className="hidden lg:flex"/>
        </div>
      </div>
    </section>
  );
};
