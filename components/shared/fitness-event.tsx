"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Bookmark, Calendar, Clock, Share2, UserRound } from "lucide-react";
import Image from "next/image";
import { LoadingComponent } from "./loading";
import { useGetEvents, useGetSpecificEvents } from "@/hooks/shared";
import { Empty } from "./empty";
import { format } from "date-fns";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
  gymId?: string;
}

export const FitnessEvent = ({ className, showAll, gymId }: IProps) => {
  const { data, isPending } = useGetEvents(gymId || "");
  const { data: specificEvents, isPending: gettingSpecificEvents } =
    useGetSpecificEvents(gymId || "");

  if (isPending || gettingSpecificEvents) return <LoadingComponent />;

  if ((data?.data.length || specificEvents?.data?.length) == 0)
    return (
      <Empty desc={"No Events yet"} src={"/members.svg"} alt={"Members Icon"} />
    );

  const displayedData =
    (gymId
      ? specificEvents?.data || []
      : showAll
      ? data?.data
      : data?.data.slice(0, 3)) || [];

  return (
    <ul className={cn("grid grid-cols-auto-fit-three gap-[28px]", className)}>
      {displayedData.map((event, i) => (
        <li
          key={i}
          className='bg-white pb-[18px] rounded-[5px] w-full text-[#1C1939]'
        >
          <article className='flex gap-[30px] flex-col'>
            <header>
              <div className='relative w-full h-[200px] sm:h-[187px]'>
                <Image
                  className='object-contain'
                  alt='Fitness Event Image'
                  fill
                  src={event.media[0]}
                />
              </div>
              <div className='px-[18px] flex flex-row justify-between items-center pt-[18px]'>
                <h3 className='font-bold text-lg'>{event.title}</h3>
                <Button
                  style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                  variant='ghost'
                  size='icon'
                  className='bg-[#F4F2F2]  rounded-[10px] place-self-end'
                >
                  <Bookmark size={24} color='#1C1C1C' />
                </Button>
              </div>
            </header>
            <section className='px-[18px] space-y-[12px] text-[#737373]'>
              <div className='flex items-center gap-2  flex-row'>
                <Calendar size={18} />
                <p>{format(new Date(event.date), "dd EEEE yyyy")}</p>
              </div>
              <div className='flex items-center gap-2  flex-row'>
                <Clock size={18} />
                <p>
                  {format(new Date(event.date), "EEE")}: {event.timeFrom} -{" "}
                  {event.timeTo}
                </p>
              </div>
              <div className='flex items-center gap-2  flex-row'>
                <UserRound size={18} />
                <p>{event.location}</p>
              </div>
            </section>

            <footer className='w-full px-[18px] justify-between gap-6 items-center flex flex-row'>
              <Button
                disabled={event.free}
                className='font-semibold text-sm text-off-white '
              >
                {event.free ? "Free" : `Get Ticket for ₦${event.price}`}
              </Button>
              <Button
                style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                variant='ghost'
                size='icon'
                className='min-w-[45px] bg-[#F4F2F2] h-[45px] rounded-[10px] place-self-end'
              >
                <Share2 size={26} color='#1C1C1C' />
              </Button>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
};
