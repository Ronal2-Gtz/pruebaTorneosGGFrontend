import React from "react";

type InformationProps = {
  text1: string;
  text2: string;
};

export const Information = ({ text1, text2 }: InformationProps) => {
  return (
    <div className="mt-40 text-center">
      <p className="text-[#58585888] mb-0 text-4xl font-medium">{text1}</p>
      <p className="text-[#58585888] mt-1 text-3xl">{text2}</p>
    </div>
  );
};
