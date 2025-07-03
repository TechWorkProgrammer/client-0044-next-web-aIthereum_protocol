import React from "react";
import Banner from "@/components/section/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TelegramBanner from "@/components/section/TelegramBanner";
import ProductionSection from "@/components/section/ProductSection";
import PlanSection from "@/components/section/PlanSection";
import StudioSection from "@/components/section/StudioSection";
import PromptExample from "@/components/section/PromptExample";
import LogoSlider from "@/components/LogoSlider";

const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow subpixel-antialiased mb-24 bg-black overflow-hidden">
                <Banner/>
                <PromptExample/>
                <ProductionSection/>
                <StudioSection/>
                <PlanSection/>
                <TelegramBanner/>
            </main>
            <LogoSlider/>
            <Footer/>
        </>
    );
};

export default Home;
