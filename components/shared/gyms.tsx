"use client";

import { useGetGyms, useGetParams } from "@/hooks/shared";
import { Routes } from "@/lib";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { LoadingComponent } from "./loading";
import { Empty } from "./empty";
import { useSearchParams } from "next/navigation";

interface IProps extends HTMLAttributes<HTMLUListElement> {}

interface IProps {
  showAll?: boolean;
}

export const Gyms = ({ showAll = false }: IProps) => {
  const params = useGetParams();
  const { data, isPending } = useGetGyms(params);

  if (data?.data.length == 0) return null;

  if (isPending) return <LoadingComponent />;

  if (data?.data.length == 0)
    return (
      <Empty desc={"No Gyms yet"} src={"/members.svg"} alt={"Members Icon"} />
    );

  const displayedData = (showAll ? data?.data : data?.data.slice(0, 6)) || [];

  return (
    <ul className={cn("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6")}>
      {displayedData.map((gym) => (
        <li
          key={gym._id}
          style={{
            background: `linear-gradient(180deg, rgba(49, 49, 49, 0) 0%, #313131 100%), url(${gym.media[0]})`,
          }}
          className={cn(
            " w-full sm:w-[320px] px-5 py-3 flex items-end  overflow-hidden rounded-[30px] h-[200px] relative"
          )}
        >
          <Link
            href={`${Routes.gyms}/${gym._id}`}
            className='flex w-full flex-row justify-between items-center'
          >
            <div className='text-off-white'>
              <p className={cn("font-inter text-base font-bold")}>
                {gym.fullname}
              </p>
              <p className='text-[12px]'>15 mins away</p>
            </div>
            <div
              style={{
                boxShadow: "0px 4.83px 29px 0px #00000033",
                background:
                  "linear-gradient(142.59deg, rgba(217, 217, 217, 0.18) -18.46%, rgba(217, 217, 217, 0.23) 56.86%, rgba(217, 217, 217, 0) 122.24%)",
              }}
              className={cn(
                "w-[60px] flex flex-row gap-1 font-inter items-center justify-center text-sm text-off-white h-[26px] rounded-[20px]"
              )}
            >
              <Star fill='#FFE142' size={14} color='#FFE142' />
              <p className={cn("font-inter", "text-[10px]")}>4.5</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
