"use client";

import { Card } from "@/components/Card";
import { useListNews } from "@/services/News.services";

export const ListNews = (): React.ReactElement => {
  const { data, isLoading } = useListNews();

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex items-center flex-wrap gap-6 w-full">
      {!data?.length ? (
        <div className="mt-40 text-center">
          <p className="text-[#58585888] mb-0 text-4xl font-medium">
            Parece que aun no hay noticias.
          </p>
          <p className="text-[#58585888] mt-1 text-3xl">
            {`Puedes crear una noticias en el boton "Crear Noticia"`}
          </p>
        </div>
      ) : (
        data?.map((item) => (
          <Card
            key={item.id}
            id={item.id ?? ""}
            title={item?.title ?? ""}
            content={item?.content ?? ""}
            img={item?.img ?? ""}
          />
        ))
      )}
    </div>
  );
};
