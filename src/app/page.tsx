import { CallToAction } from "@/components/CTA";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/Hero";
import { Product } from "@/components/Product";
import { Testimonials } from "@/components/Testimonial";
import { TextScroll } from "@/components/Textscroll";

export default async function Home() {
  return (
    <>
      <Hero/>
      <TextScroll/>
      <Product/>
      <Testimonials/>
      <CallToAction/>
      <Footer/>
    </>
  );
}
