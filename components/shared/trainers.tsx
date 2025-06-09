"use client";

import { useGetTrainers } from "@/hooks/shared";
import { getInitials, Routes } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import { LoadingComponent } from "./loading";
import { Empty } from "./empty";

interface IProps {
  showAll?: boolean;
}

export const Trainers = ({ showAll = false }: IProps) => {
  const { data, isPending } = useGetTrainers();
  if (isPending) return <LoadingComponent />;

  if (data?.data.length == 0)
    return (
      <Empty
        desc={"No Trainers yet"}
        src={"/members.svg"}
        alt={"Members Icon"}
      />
    );

  const displayedData = (showAll ? data?.data : data?.data.slice(0, 4)) || [];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedData.map((trainer, i) => (
        <li key={i} className="flex items-center sm:items-start flex-col">
          <div className="w-full min-w-[200px] max-w-[200px] border-[7px] overflow-hidden border-brand rounded-full h-[200px] relative bg-gray-200 flex items-center justify-center">
            {trainer?.profilePhoto ? (
              <Image
                fill
                src={trainer.profilePhoto}
                alt="Trainers"
                className="object-cover"
              />
            ) : (
              <span className="text-5xl font-semibold text-black">
                {getInitials(trainer.fullname)}
              </span>
            )}
          </div>
          <p className="text-[#344054] mt-[30px] sm:mt-[40px] leading-[24px] font-inter font-semibold  text-xl">
            {trainer.fullname}
          </p>
          <p className="text-[#667085] text-base font-inter">
            Strength training, Cardio.
          </p>
          <Link
            className="underline text-sm text-orange-950"
            href={`${Routes.trainers}/${trainer._id}`}
          >
            View Profile
          </Link>
        </li>
      ))}
    </ul>
  );
};
