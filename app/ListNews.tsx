"use client";

import { Card } from "@/components/Card";
import { useListNews } from "@/services/News.services";
import UserContext from "./UserConext";
import { useContext } from "react";
import { Information } from "@/components/Information";
import { Loading } from "@/components/Loading";

export const ListNews = (): React.ReactElement => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useListNews();

  if (isLoading) return <Loading/>

  if (!user.id) {
    return (
      <Information
        text1="Parece que aun no hay un usuario seleccionado."
        text2={`Puedes seleccionar un usuario en el boton "Usuarios"`}
      />
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-6 w-full">
      {!data?.length ? (
        <Information
          text1="Parece que aun no hay noticias."
          text2={`Puedes crear una noticias en el boton "Crear Noticia"`}
        />
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
