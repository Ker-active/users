"use client";
/* eslint-disable @next/next/no-img-element */
import { cn, convert24to12 } from "@/lib";
import { ChevronRight, Clock, UserRound } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { IoShareSocial } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useMemo, useState } from "react";
import { LiaDumbbellSolid } from "react-icons/lia";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BookNowModal, CopyLink } from "../shared";
import { format } from "date-fns";
import { IClass, IClassResponse } from "@/lib/types";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const backgrounds = [
  "bg-[#F3F3F3]",
  "bg-[#DFFFFF]",
  "bg-[#ECF1FF]",
  "bg-[#FFE7DA]",
];

interface IClassArray {
  day: string;
  classes: {
    name: string;
    trainer: string;
    time: string;
    onlineLink: string;
    classId: string;
    content: IClass;
  }[];
}

function formatClass(classDetails: IClassResponse["data"]) {
  if (!classDetails) return [];
  return classDetails.reduce((acc, item) => {
    const day = format(new Date(item.date), "EEEE");
    const classDetails = {
      name: item.title,
      trainer: item.trainer?.fullname,
      time: `${convert24to12(item.timeFrom)} - ${convert24to12(item.timeTo)}`,
      classId: item._id,
      onlineLink: item.onlineLink,
      content: item,
    };

    const existingDay = acc.find((d) => d.day === day);
    if (existingDay) {
      existingDay.classes.push(classDetails);
    } else {
      acc.push({
        day,
        classes: [classDetails],
      });
    }

    return acc;
  }, [] as IClassArray[]);
}

interface IProps {
  isForTrainer?: boolean;
  classDetails?: IClassResponse["data"];
}

export const Classes = ({ isForTrainer = false, classDetails }: IProps) => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [classContent, setClassContent] = useState(null);
  const timeTable = useMemo(() => {
    const groupedData = formatClass(classDetails || []);
    return weekDays.map((day) => {
      const foundDay = groupedData.find((d) => d.day === day);
      return foundDay || { day, classes: [] };
    });
  }, [classDetails]);

  function handleBook() {
    setIsPopOverOpen(false);
  }
  return (
    <>
      <BookNowModal
        isOpen={isBookNowModalOpen}
        setIsOpen={setIsBookNowModalOpen}
        classContent={classContent as any}
      />

      <section className='flex flex-col'>
        {timeTable.map((day) => (
          <div
            key={day.day}
            className='w-full border-b text-[#1C1939] border-[#E0E0E0] flex flex-row'
          >
            <div
              className={cn(
                " min-w-[118px] bg-[#EEEEEE] grid place-content-center h-[130px]"
              )}
            >
              <p>{day.day}</p>
            </div>
            <div className='flex relative no-scrollbar  overflow-x-auto bg-white gap-[30px] px-4 w-full flex-row items-center'>
              {day.classes.map((event, index) => {
                return (
                  <div
                    className={cn(
                      "px-4 pb-[11px] min-w-[195px] pt-4 rounded-[16px]",
                      backgrounds[
                        (index + timeTable.indexOf(day)) % backgrounds.length
                      ]
                    )}
                    key={index}
                  >
                    <div className='flex mb-2 flex-row items-center justify-between'>
                      <p className='font-semibold'>{event.name}</p>
                      <Menubar className='bg-inherit p-0 h-fit border-0'>
                        <MenubarMenu>
                          <MenubarTrigger className='p-0  border-0'>
                            <img src='/dots.svg' alt='Dots Icon' />
                          </MenubarTrigger>
                          <MenubarContent>
                            <MenubarItem
                              onClick={() => {
                                setClassContent(event.content as any);
                                setIsBookNowModalOpen(true);
                              }}
                              className='flex flex-row items-center text-sm text-[#344054] justify-between w-full'
                            >
                              <div className='flex flex-row items-center gap-2'>
                                <FaRegCalendarCheck />
                                <span>Book Now</span>
                              </div>
                              <ChevronRight className='ml-auto h-4 w-4' />
                            </MenubarItem>
                            <MenubarSub>
                              <MenubarSubTrigger className='flex flex-row items-center text-sm text-[#344054] justify-between w-full'>
                                <div className='flex flex-row items-center gap-2'>
                                  <IoShareSocial />
                                  <span>Invite Friends</span>
                                </div>
                              </MenubarSubTrigger>
                              <MenubarSubContent>
                                <MenubarItem className='w-[364px] text-[#1C1939] flex flex-col items-start space-y-2 rounded-[8px]'>
                                  <CopyLink />
                                </MenubarItem>
                              </MenubarSubContent>
                            </MenubarSub>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>

                      <Popover
                        open={isPopOverOpen}
                        onOpenChange={setIsPopOverOpen}
                      >
                        <PopoverContent className='w-[240px] gap-4 flex flex-col'>
                          <button
                            onClick={handleBook}
                            className='flex flex-row items-center text-sm text-[#344054] justify-between w-full'
                          >
                            <div className='flex flex-row items-center gap-2'>
                              <FaRegCalendarCheck />
                              <span>Book Now</span>
                            </div>
                            <MdOutlineKeyboardArrowRight size={20} />
                          </button>
                          <button className='flex flex-row items-center text-sm text-[#344054] justify-between w-full'>
                            <div className='flex flex-row items-center gap-2'>
                              <IoShareSocial />
                              <span>Invite Friends</span>
                            </div>
                            <MdOutlineKeyboardArrowRight size={20} />
                          </button>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className='flex mb-1 gap-2 items-center flex-row'>
                      <Clock size={16} />
                      <span className='text-sm'>{event.time}</span>
                    </div>

                    <div className='flex gap-2 items-center flex-row'>
                      {isForTrainer ? (
                        <LiaDumbbellSolid size={18} />
                      ) : (
                        <UserRound size={16} />
                      )}
                      <span className='text-sm'>{event.trainer}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
