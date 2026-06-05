import CTASection from "@/components/CTASection";
import FeaturesJob from "@/components/FeaturesJob";
import HeroStats from "@/components/HeroStats";
import JobDiscovery from "@/components/JobDiscovery";
import Pricing from "@/components/Pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroStats />
      <JobDiscovery />
      <FeaturesJob />
      <Pricing />
      <CTASection />
    </div>
  );
}
