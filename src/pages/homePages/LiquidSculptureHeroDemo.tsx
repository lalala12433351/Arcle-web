import { Helmet } from "react-helmet-async";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";

export default function LiquidSculptureHeroDemo() {
  return (
    <>
      <Helmet>
        <title>Liquid Sculpture Hero Demo</title>
      </Helmet>
      <SculptureHero />
    </>
  );
}
