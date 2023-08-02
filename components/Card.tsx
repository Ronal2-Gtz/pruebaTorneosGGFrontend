import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  img: string;
  title: string;
  content: string;
  id: string;
};

export const Card = ({
  img,
  title,
  content,
  id,
}: CardProps): React.ReactElement => {
  return (
    <div className="max-w-[300px] border border-white rounded-lg shadow bg-gray-800">
      <Link href={`/${id}`}>
        <Image
          width={300}
          height={70}
          src={img}
          alt="Picture of the author"
          className="rounded-t-lg  h-60 object-cover"
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis ">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis ">
          {content}
        </p>
        <Link
          href={`/${id}`}
          className="text-sm font-medium hover:underline text-blue-500"
        >
          Ver mas
        </Link>
      </div>
    </div>
  );
};
