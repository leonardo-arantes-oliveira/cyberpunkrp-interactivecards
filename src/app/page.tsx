import { Suspense } from "react";
import { Mural } from "@/components/mural/Mural";
import { MuralSkeleton } from "@/components/mural/MuralSkeleton";
import { carregarPersonagens } from "@/lib/personagens";

export default function Page() {
  return (
    <Suspense fallback={<MuralSkeleton />}>
      <Personagens />
    </Suspense>
  );
}

async function Personagens() {
  const personagens = await carregarPersonagens();
  return <Mural personagens={personagens} />;
}
