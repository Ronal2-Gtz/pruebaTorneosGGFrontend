"use client";

import UserContext from "@/app/UserConext";
import Link from "next/link";
import React, { useContext } from "react";

type Link = {
  id: number;
  label: string;
  route: string;
};

const links: Link[] = [
  {
    id: 1,
    label: "Crear Noticia",
    route: "/form",
  },
  {
    id: 2,
    label: "Ver Noticias",
    route: "/",
  },
];

export const Navbar = (): React.ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between gap-10 border-b-white border-b pt-5 pb-2 px- mb-10">
      <p className=" font-semibold text-xl">{user.nickname}</p>
      <ul className="lg:flex lg:items-center lg:gap-5">
        <li className=" cursor-pointer hover:underline">
          <Link href="/user">Usuarios</Link>
        </li>
        {user.id &&
          links.map((link) => (
            <li key={link.id} className=" cursor-pointer hover:underline">
              <Link href={link.route}>{link.label}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
