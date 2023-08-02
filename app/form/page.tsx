import { NewsForm } from "@/components/NewsForm";


export default function Create(): React.ReactElement {
  return (
    <main className="flex flex-col items-center ">
      <h1 className="text-3xl">Crear Noticia</h1>
      <NewsForm />
    </main>
  );
}
