"use client";

import { useCreateUser, useListUser } from "@/services/User.services";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import UserContext, { User } from "../UserConext";

type FormData = {
  name: string;
  lastname: string;
  nickname: string;
  password: string;
  id?: string
};

type ChangeUser = {
  user: string;
};

export default function User() {
  const { data: Users } = useListUser();
  const { mutateAsync: createUser } = useCreateUser();
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: ErrorUser },
    reset: ResetUser,
  } = useForm<ChangeUser>();

  const onSubmit = (data: FormData): void => {
    const user = createUser(data, {
      onSuccess: () => reset(),
    });

    toast.promise(user, {
      loading: "Creando usuario...",
      success: "Usuario creado!!",
      error: "Opps, Ocurrio un error inesperado",
    });
  };

  const changeUser = (data: ChangeUser): void => {
    const user = Users?.find((user) => user.nickname === data.user) as User;

    setUser(user!)
    ResetUser()
  };

  return (
    <main className="grid grid-cols-12 gap-10">
      <div className="col-span-6">
        <div className="flex w-full justify-center">
          <h1 className=" text-2xl font-semibold mb-5">Crear usuario</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className=" text-red-700">El nombre es requerido</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Apellidos"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <p className=" text-red-700">El apellido es requerido</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Nickname"
              {...register("nickname", { required: true })}
            />
            {errors.nickname && (
              <p className=" text-red-700">El nickname es requerido</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className=" text-red-700">La contraseña es requerida</p>
            )}
          </div>
          <div className="flex w-full justify-end">
            <input
              className="border border-blue-700 text-blue-700 p-2 w-fit rounded-sm cursor-pointer"
              type="submit"
              value="Crear usuario"
            />
          </div>
        </form>
      </div>
      <div className="col-span-6">
        <div className="flex flex-col w-full items-center justify-center">
          <h1 className=" text-2xl font-semibold mb-5">Usuarios</h1>
          <form onSubmit={handleSubmitUser(changeUser)} className="w-full">
            <select {...registerUser("user", { required: true })}>
              <option value="">--Seleccione usuario--</option>
              {Users?.map((user) => (
                <option key={user.id} value={user.nickname}>
                  {user.nickname}
                </option>
              ))}
            </select>
            {ErrorUser.user && (
              <p className=" text-red-700">El usuario es requerido</p>
            )}
            <div className="flex w-full justify-end">
              <input
                className="border border-blue-700 text-blue-700 p-2 w-fit rounded-sm cursor-pointer mt-5"
                type="submit"
                value="Seleccionar usuario"
              />
            </div>
          </form>

          <h1 className=" text-2xl font-semibold mb-1 mt-10">USUARIO ACTUAL</h1>
          <p>- {user.nickname} -</p>
        </div>
      </div>
    </main>
  );
}
