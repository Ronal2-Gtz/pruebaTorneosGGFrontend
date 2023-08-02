"use client";

import { useForm } from "react-hook-form";
import {
  useCreateNews,
  useNews,
  useUpdateNews,
} from "../services/News.services";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/app/UserConext";

type FormData = {
  title: string;
  content: string;
  img: string;
};

type NewsFormProps = {
  id?: string;
};

export const NewsForm = ({ id }: NewsFormProps) => {
  const { data } = useNews(id);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { mutateAsync: handleCreateNews } = useCreateNews();
  const { mutateAsync: handleUpdateNews } = useUpdateNews();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const onSubmit = (data: FormData): void => {
    const news = { ...data, user: user.id, id };

    if (id) {
      const updateNews = handleUpdateNews(news);

      toast.promise(updateNews, {
        loading: "Actualizando noticia Noticia...",
        success: "Noticia actualizada con exito",
        error: "Oops, ocurrio un error inesperado",
      });     
      
      router.push(`/${id}`)
      
    } else {
      const createNews = handleCreateNews(news, {
        onSuccess: () => reset(),
      });

      toast.promise(createNews, {
        loading: "Creando Noticia...",
        success: "Noticia creada con exito",
        error: "Oops, ocurrio un error inesperado",
      });

      router.push(`/`)
    }

  };

  useEffect(() => {
    if (data) {
      setValue("title", data.title, {
        shouldValidate: true,
      });
      setValue("img", data.img, {
        shouldValidate: true,
      });
      setValue("content", data.content, {
        shouldValidate: true,
      });
    }
  }, [data, setValue]);

  return (
    <form className="flex flex-col gap-4 w-9/12" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>Titulo</p>
        <input type="text" {...register("title", { required: true })} />
        {errors.title && (
          <p className=" text-red-700">El titulo es requerido</p>
        )}
      </div>

      <div>
        <p>Url imagen</p>
        <input type="text" {...register("img", { required: true })} />
        {errors.img && (
          <p className=" text-red-700">La Url de la imagen es requerida</p>
        )}
      </div>

      <div>
        <p>Contenido</p>
        <textarea rows={10} {...register("content", { required: true })} />
        {errors.content && (
          <p className=" text-red-700">El contenido es requerido</p>
        )}
      </div>

      <input className="border border-blue-700 text-blue-700 p-2 rounded-sm cursor-pointer mt-5" type="submit" />
    </form>
  );
};
