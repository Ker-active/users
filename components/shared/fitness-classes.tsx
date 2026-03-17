"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react"; 
import { Button } from "../ui/button";
import { Clock, UserRound } from "lucide-react";
import { useGetClasss } from "@/hooks/shared";
import { LoadingComponent } from "./loading";
import { Empty } from "./empty";
import { format, isToday, isTomorrow } from "date-fns";
import { BookNowModal } from "../shared"; 

const getNextOccurrenceInfo = (item: any) => {
  const now = new Date();
  const [hours, minutes] = (item.timeFrom || "00:00").split(":").map(Number);

  if (!item.isRecurring) {
    if (!item.date) return { time: Infinity, label: "" };
    const classDate = new Date(item.date);
    classDate.setHours(hours, minutes, 0, 0);
    if (classDate.getTime() < now.getTime())
      return { time: Infinity, label: "" };
    return {
      time: classDate.getTime(),
      label: format(classDate, "EEE"),
      actualDate: classDate,
    };
  }

  if (!item.rangeStart || !item.rangeEnd) return { time: Infinity, label: "" };
  const rangeEnd = new Date(item.rangeEnd);
  rangeEnd.setHours(23, 59, 59, 999);
  if (now.getTime() > rangeEnd.getTime()) return { time: Infinity, label: "" };

  let current = new Date(
    Math.max(now.getTime(), new Date(item.rangeStart).getTime()),
  );
  current.setHours(hours, minutes, 0, 0);

  if (current.getTime() < now.getTime()) current.setDate(current.getDate() + 1);

  for (let i = 0; i < 365; i++) {
    if (current > rangeEnd) break;
    const dayName = format(current, "EEEE");
    let matches = false;

    if (item.recurrencePattern === "DAILY") {
      const start = new Date(item.rangeStart).setHours(0, 0, 0, 0);
      const diffDays = Math.floor(
        (current.getTime() - start) / (1000 * 60 * 60 * 24),
      );
      matches = diffDays % (item.interval || 1) === 0;
    } else if (item.recurrencePattern === "WEEKLY") {
      matches = item.weekDays?.some(
        (d: string) => d.toLowerCase() === dayName.toLowerCase(),
      );
    } else if (item.recurrencePattern === "MONTHLY" && item.monthlyRule?.day) {
      if (item.monthlyRule.day.toLowerCase() === dayName.toLowerCase()) {
        const occurrence = Math.ceil(current.getDate() / 7);
        const weekMap: Record<number, string> = {
          1: "First",
          2: "Second",
          3: "Third",
          4: "Fourth",
          5: "Fifth",
        };
        const currentWeek = weekMap[occurrence] || "Last";
        const nextWeek = new Date(current);
        nextWeek.setDate(current.getDate() + 7);
        const isLast = nextWeek.getMonth() !== current.getMonth();
        matches =
          item.monthlyRule.week === currentWeek ||
          (item.monthlyRule.week === "Last" && isLast);
      }
    }

    if (matches) {
      let label = format(current, "EEE");
      if (isToday(current)) label = "Today";
      if (isTomorrow(current)) label = "Tomorrow";
      return { time: current.getTime(), label, actualDate: current };
    }
    current.setDate(current.getDate() + 1);
  }
  return { time: Infinity, label: "" };
};

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
  searchTerm?: string;
}

export const FitnessClasses = ({
  className,
  showAll,
  searchTerm = "",
}: IProps) => {
  const { data, isPending } = useGetClasss();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  if (isPending) return <LoadingComponent />;

  if (!data?.data || data?.data.length === 0)
    return (
      <Empty
        desc={"No Classes yet"}
        src={"/members.svg"}
        alt={"Members Icon"}
      />
    );

  const classesWithTiming = data.data.map((item: any) => ({
    ...item,
    nextInfo: getNextOccurrenceInfo(item),
  }));

  const lowerSearch = searchTerm.toLowerCase();
  const filteredClasses = classesWithTiming
    .filter((item: any) => item.nextInfo.time !== Infinity)
    .filter((item: any) => {
      if (!searchTerm) return true;
      return (
        item.title?.toLowerCase().includes(lowerSearch) ||
        item.gym?.fullname?.toLowerCase().includes(lowerSearch) ||
        item.trainer?.fullname?.toLowerCase().includes(lowerSearch)
      );
    });

  const sortedClasses = filteredClasses.sort(
    (a: any, b: any) => a.nextInfo.time - b.nextInfo.time,
  );
  const displayedData = showAll ? sortedClasses : sortedClasses.slice(0, 4);

  const handleBookClick = (classData: any) => {
    setSelectedClass({
      ...classData,
      selectedDate: classData.nextInfo.actualDate,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <BookNowModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        classContent={selectedClass}
      />

      <ul
        className={cn(
          "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {displayedData.map((classData: any, i: number) => (
          <li
            key={i}
            className="bg-white w-full text-[#1C1939] rounded-[16px] p-4 shadow-sm"
          >
            <article className="flex gap-4 flex-col">
              <h3 className="font-semibold text-lg">{classData.title}</h3>
              <div>
                <div className="flex items-center gap-2 flex-row">
                  <Clock size={18} />
                  <p>
                    {classData.nextInfo.label}: {classData.timeFrom} -{" "}
                    {classData.timeTo}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-row">
                  <UserRound size={18} />
                  <p className="line-clamp-1 text-ellipsis">
                    {classData.trainer?.fullname || classData.gym?.fullname}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleBookClick(classData)}
                className="rounded-[20px] text-sm font-normal border border-brand text-brand"
                size="sm"
                variant={"outline"}
              >
                View Class
              </Button>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};
