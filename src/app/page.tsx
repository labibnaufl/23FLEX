import { CallToAction } from "@/components/Landing page/CTA";
import { Hero } from "@/components/Landing page/Hero";
import { Product } from "@/components/Landing page/Product";
import { Testimonials } from "@/components/Landing page/Testimonial";
import { TextScroll } from "@/components/Landing page/Textscroll";

export default async function Home() {
  return (
    <>
      <Hero/>
      <TextScroll/>
      <Product/>
      <Testimonials/>
      <CallToAction/>
    </>
  );
}
