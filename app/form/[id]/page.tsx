'use client'

import { NewsForm } from "@/components/NewsForm";

type UpdateProps = {
  params:{
    id: string
  }
}

export default function Update({params}:UpdateProps): React.ReactElement {
  
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl">Actualizar Noticia</h1>
      <NewsForm id={params.id} />
    </main>
  );
}
