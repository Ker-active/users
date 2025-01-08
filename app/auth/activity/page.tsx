"use client";

import { updateActivities } from "@/actions/auth";
import { AuthHeader } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { cn, Routes } from "@/lib";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Suspense, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

const activitiesArray = [
  "Muay Thai",
  "HIIT",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Tennis",
  "Football",
  "Kickboxing",
  "Cycling",
  "Swimming",
  "Flag Football",
];

const backgrounds = [
  "bg-[#EDD67B]",
  "bg-[#03234C]",
  "bg-[#F77A36]",
  "bg-[#4BBCFA]",
  "bg-[#F7A172]",
];

export default function Activity() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedActivities, setSelectedActivities] = useState([] as string[]);

  const handleActivityClick = (activity: string) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activity)
        ? prevSelected.filter((item) => item !== activity)
        : [...prevSelected, activity]
    );
  };

  const groupedActivities = useMemo(() => {
    const groupedActivities = [];
    for (let i = 0; i < activitiesArray.length; i += 2) {
      groupedActivities.push(activitiesArray.slice(i, i + 2));
    }
    return groupedActivities;
  }, []);

  function onClick(token: string | null, userId: string | null) {
    startTransition(() => {
      updateActivities(selectedActivities, token, userId).then(
        ({ error, success }) => {
          if (error) toast.error(error);
          else {
            toast.success(success);
            router.replace(Routes.login);
          }
        }
      );
    });
  }

  return (
    <main className='min-h-dvh px-4 w-full gap-8 sm:gap-[102px] flex py-[120px] flex-col items-center bg-off-white'>
      <AuthHeader
        title="Tell us the activities you're into"
        desc='Click on the bubble to select the activities'
      />
      <div className='max-w-screen-lg mx-auto p-4'>
        <div className='flex gap-6 flex-wrap'>
          {groupedActivities.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex flex-col ${
                groupIndex % 2 === 1 ? " sm:mt-10" : ""
              }`}
            >
              {group.map((activity, index) => {
                const backgroundClass =
                  backgrounds[(groupIndex * 2 + index) % backgrounds.length];
                const isSelected = selectedActivities.includes(activity);

                return (
                  <button
                    key={index}
                    onClick={() => handleActivityClick(activity)}
                    className='relative text-white'
                  >
                    <div
                      className={cn(
                        `p-4 text-sm sm:text-base grid place-content-center rounded-full w-[90px] sm:w-[130px] h-[90px] sm:h-[130px] ${backgroundClass}`,
                        index === 1 ? "mt-4" : "",
                        isSelected &&
                          "bg-[#003838] text-white border-[7px] border-brand"
                      )}
                    >
                      {activity}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Wrap useSearchParams logic in a Suspense boundary */}
      <Suspense fallback={<p>Loading...</p>}>
        <ActivityButton onClick={onClick} isPending={isPending} />
      </Suspense>
    </main>
  );
}

function ActivityButton({
  onClick,
  isPending,
}: {
  onClick: (token: string | null, userId: string | null) => void;
  isPending: boolean;
}) {
  const searchParams = useSearchParams();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        onClick(searchParams.get("token"), searchParams.get("userId"))
      }
      className='max-w-[554px] mx-auto'
    >
      Submit
    </Button>
  );
}
