"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDeleteNews, useNews } from "@/services/News.services";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useContext, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  useCommentaries,
  useCreateCommentary,
} from "@/services/Commentary.services";
import UserContext from "../UserConext";
import { Loading } from "@/components/Loading";

type NewsProps = {
  params: {
    id: string;
  };
};

type CommentaryData = {
  commentary: string;
};

export default function News({ params }: NewsProps): React.ReactElement {
  const { id } = params;
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const { isLoading, data: News } = useNews(id);
  const { data: Commentaries } = useCommentaries(id);
  const { mutateAsync: handleCreateCommentary } = useCreateCommentary();
  const { mutateAsync: onDeleteNews } = useDeleteNews();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CommentaryData>();
  const router = useRouter();
  const commentary = watch(["commentary"]);

  const onSubmit = (data: CommentaryData): void => {
    const commentary = { ...data, user: user.id, news: id, userId: {} };
    const promise = handleCreateCommentary(commentary, {
      onSuccess: () => {
        queryClient.invalidateQueries(`commentaries_${id}`);
        reset();
      },
    });
    toast.promise(promise, {
      loading: "Comentando...",
      success: "Comentado!!",
      error: "Opps, Ocurrio un error inesperado",
    });
  };

  const handleEditNews = (): void => router.push(`/form/${id}`);

  const handDeleteNews = (): void => {
    const deleteNew = onDeleteNews(id);
    toast.promise(deleteNew, {
      loading: "Eliminando...",
      success: "Eliminado!!",
      error: "Opps, Ocurrio un error inesperado",
    });
    router.push("/");
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [commentary]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );

  const { ref, ...rest } = register("commentary");

  return (
    <main>
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-5 ">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={News?.img ?? ""}
          alt="Picture of the author"
          className="w-full h-auto object-cover col-span-6"
        />
        <div className="text-center col-span-6 relative">
          <p className=" text-2xl font-semibold uppercase mb-5">
            {News?.title}
          </p>
          <p className="whitespace-pre-line	mb-16">{News?.content}</p>
          <div className="w-full flex justify-center lg:justify-end gap-5 absolute bottom-0 ">
            <button
              className="flex gap-2 border p-2  rounded-md  text-yellow-500 border-yellow-500 "
              onClick={handleEditNews}
            >
              Editar <BiSolidEditAlt size={25} />
            </button>
            <button
              className="flex gap-2 border  p-2 rounded-md text-red-800 border-red-800"
              onClick={handDeleteNews}
            >
              Eliminar <FaTrash size={25} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h1 className=" text-xl">Comentarios</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5">
            <textarea
              rows={1}
              placeholder="Añade un comentario"
              className="w-full border-0 border-b rounded-none p-2 focus:outline-0 overflow-hidden  resize-none"
              {...rest}
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
            />
            {errors.commentary && (
              <p className=" text-red-700">El comentario es requerido</p>
            )}
            <div className="w-full flex justify-end">
              <input
                className="cursor-pointer "
                type="submit"
                value="Comentar"
              />
            </div>
          </div>
        </form>

        <div className="my-5 break-words	">
          {Commentaries?.map((commentary) => (
            <div key={commentary.id} className="mb-4">
              <p className="block bg-gray-800 w-fit py-1 px-3 rounded-2xl whitespace-nowrap">
                {commentary.user.nickname}
              </p>
              <p className="  pl-3">{commentary.commentary}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
