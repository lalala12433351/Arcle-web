import { Helmet } from "react-helmet-async";
import FooterV1 from "../../components/footer/FooterV1";
import { PrismaHero } from "@/components/ui/prisma-hero";

export default function DemoOne() {
  return (
    <>
      <Helmet>
        <title>Prisma Hero Demo</title>
      </Helmet>
      <PrismaHero />
      <FooterV1 />
    </>
  );
}
