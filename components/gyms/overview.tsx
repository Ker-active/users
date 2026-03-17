"use client";
import Image from "next/image";
import {
  Gyms,
  ListInfo,
  LoadingComponent,
  SectionSocialMedia,
  Trainers,
} from "../shared";
import { cn, convert24to12 } from "@/lib";
import { useParams } from "next/navigation";
import { useGetGym } from "@/hooks/shared";
import { TOperatingTimes } from "@/lib/types";

// Helper function to group consecutive days with identical hours
const getGroupedWorkingHours = (operatingTimes?: TOperatingTimes) => {
  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const formatHours = (times?: { from?: string; to?: string }) => {
    if (!times || !times.from || !times.to) return "Closed";
    return `${convert24to12(times.from)} - ${convert24to12(times.to)}`;
  };

  const grouped: { startDay: string; endDay: string; hours: string }[] = [];
  let currentGroup: { startDay: string; endDay: string; hours: string } | null =
    null;

  for (let i = 0; i < daysOrder.length; i++) {
    const day = daysOrder[i];
    // @ts-ignore
    const hours = formatHours(operatingTimes?.[day]);

    if (!currentGroup) {
      currentGroup = { startDay: day, endDay: day, hours };
    } else if (currentGroup.hours === hours) {
      currentGroup.endDay = day; 
    } else {
      grouped.push(currentGroup); 
      currentGroup = { startDay: day, endDay: day, hours }; 
    }
  }

  if (currentGroup) {
    grouped.push(currentGroup);
  }

  return grouped.map((group) => {
    const dayLabel =
      group.startDay === group.endDay
        ? capitalize(group.startDay)
        : `${capitalize(group.startDay)} - ${capitalize(group.endDay)}`;

    return { dayLabel, hours: group.hours };
  });
};

export const OverViewComponent = () => {
  const params = useParams();
  const { data, isPending } = useGetGym((params?.slug as string) || "");

  if (isPending) return <LoadingComponent />;

  const groupedWorkingHours = getGroupedWorkingHours(
    data?.data?.operatingTimes,
  );

  const hasWorkingHours = !groupedWorkingHours.every(
    (group) => group.hours === "Closed",
  );

  return (
    <section className="flex flex-col gap-[55px]">
      <section className="grid gap-4 lg:grid-cols-7">
        <div className="grid gap-2 sm:grid-cols-5 lg:col-span-5">
          <div className="flex flex-row flex-wrap w-full gap-4 sm:grid-cols-5 lg:col-span-5">
            {data?.data.media.map((media, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-full sm:w-[200px] border rounded-[5px] h-[200px]",
                )}
              >
                <Image
                  className="object-contain"
                  fill
                  alt={`${data.data.fullname} Media`}
                  src={media}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white lg:col-span-2 rounded-[5px] space-y-[18px] py-6 px-5">
          <div>
            <h2 className="text-lg font-bold">Location</h2>
            <p className="text-[#3385ff] underline text-base">
              {data?.data.location}
            </p>
          </div>

          {hasWorkingHours && (
            <div className="text-[#1C1C1C] space-y-3">
              <h2 className="text-lg font-bold">Working Hours</h2>
              <div className="space-y-3">
                {groupedWorkingHours.map((group, index) => (
                  <div key={index}>
                    <p>{group.dayLabel}</p>
                    <p className="text-[#737373]">{group.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-[28px] space-y-[28px] px-4 sm:px-[35px]">
        <article className="space-y-[10px] text-[#1C1C1C]">
          <h2 className="text-lg font-bold">About</h2>
          <p className="text-base leading-[32px] text-[#737373]">
            {data?.data.professionalSummary}
          </p>
        </article>

        <ListInfo
          title="Services"
          item={data?.data.services.map((service) => service) || []}
        />

        <ListInfo
          title="Amenities"
          item={data?.data.amenities.map((amenities) => amenities) || []}
        />

        <article className="space-y-[10px] text-[#1C1C1C]">
          <h2 className="text-lg font-bold">Contacts</h2>
          <SectionSocialMedia
            data={{
              phone: data?.data.phoneNumber || "",
              email: data?.data.email || "",
              ...data?.data.socialMedia,
            }}
          />
        </article>
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="section-header">Fitness Trainer</h2>
        <Trainers />
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="section-header">Similar Gyms and Studios</h2>
        <Gyms />
      </section>
    </section>
  );
};
