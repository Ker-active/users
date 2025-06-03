"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Clock, UserRound } from "lucide-react";
import { useGetClasss } from "@/hooks/shared";
import { LoadingComponent } from "./loading";
import { Empty } from "./empty";
import { format } from "date-fns";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

interface IProps extends HTMLAttributes<HTMLUListElement> {
  showAll?: boolean;
}

export const FitnessClasses = ({ className, showAll }: IProps) => {
  const router = useRouter();

  const { data, isPending } = useGetClasss();

  if (isPending) return <LoadingComponent />;

  if (data?.data.length == 0)
    return (
      <Empty
        desc={"No Classes yet"}
        src={"/members.svg"}
        alt={"Members Icon"}
      />
    );

  const displayedData = (showAll ? data?.data : data?.data.slice(0, 4)) || [];
  return (
    <ul className={cn("flex flex-row flex-wrap gap-6", className)}>
      {displayedData.map((classData, i) => (
        <li
          key={i}
          className="bg-white w-full sm:w-[280px] text-[#1C1939] rounded-[16px] p-4"
        >
          <article className="flex gap-4 flex-col">
            <h3 className="font-semibold text-lg">{classData.title}</h3>
            <div>
              <div className="flex items-center gap-2  flex-row">
                <Clock size={18} />
                <p>
                  {format(new Date(classData.date), "EEE")}:{" "}
                  {classData.timeFrom} - {classData.timeTo}
                </p>
              </div>
              <div className="flex items-center gap-2  flex-row">
                <UserRound size={18} />
                <p className="line-clamp-1 text-ellipsis">
                  {classData.trainer.fullname}
                </p>
              </div>
            </div>
            <Button
              // href={`${Routes.gyms}/${classData.gym}`}
              onClick={() => router.push(`${Routes.gyms}/${classData.gym}`)}
              className="rounded-[20px] text-sm font-normal border border-brand text-brand"
              size="sm"
              variant={"outline"}
            >
              View Profile
            </Button>
          </article>
        </li>
      ))}
    </ul>
  );
};
