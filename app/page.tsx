'use client'

import { Hero } from "@/components/Hero/Hero";
import { Header } from '../components/Header/Header'
import { Footer } from "@/components/Footer/Footer";
import { ArticlesCardsGrid, ArticlesHeader } from "@/components/Articles/Articles";
import { ContactUs } from "@/components/Contact/Contact";

export default function HomePage() {
  return (
    <>
      <Header/>
      <Hero/>
      <ArticlesHeader/>
      <ArticlesCardsGrid/>
      <ContactUs/>
      <Footer/>
    </>
  );
}
