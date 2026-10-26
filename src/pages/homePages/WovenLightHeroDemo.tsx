import { Helmet } from "react-helmet-async";
import FooterV1 from "../../components/footer/FooterV1";
import { WovenLightHero } from "@/components/ui/woven-light-hero";

export default function DemoOne() {
  return (
    <>
      <Helmet>
        <title>Woven Light Hero Demo</title>
      </Helmet>
      <WovenLightHero />
      <FooterV1 />
    </>
  );
}
