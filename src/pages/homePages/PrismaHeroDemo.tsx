import { Helmet } from "react-helmet-async";
import { PrismaHero } from "@/components/ui/prisma-hero";

export default function DemoOne() {
  return (
    <>
      <Helmet>
        <title>Prisma Hero Demo</title>
      </Helmet>
      <PrismaHero />
    </>
  );
}
