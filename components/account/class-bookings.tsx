"use client";
import { useGetBookings } from "@/hooks/shared";
import { LoadingComponent } from "../shared";
import { format } from "date-fns";

export const ClassBookings = () => {
  const { data, isPending } = useGetBookings();

  return (
    <article className="space-y-4 px-[20px] py-[15px] bg-white">
      <header>
        <h3 className="text-[#1C1939] text-[22px] font-semibold font-inter">
          Class Bookings
        </h3>
      </header>
      <hr />
      {isPending ? (
        <LoadingComponent />
      ) : data?.data.length == 0 ? (
        <p>No Bookings yet</p>
      ) : (
        <div className="flex gap-1 w-full overflow-x-auto flex-col">
          {data?.data.map((booking, i) => (
            <div
              className="bg-[#F8F7FA] py-[20px] flex flex-row items-center justify-between gap-4 px-4  text-sm [60px] rounded-[8px]"
              key={booking._id}
            >
              <p className="text-[#686868] min-w-fit">
                {format(new Date(booking.bookingDate), "dd, MMM yyyy")}
              </p>
              <p className="min-w-fit">{booking.class?.title}</p>
              <p className="underline min-w-fit text-[#377DFF]">
                {booking.class?.trainer?.fullname}
              </p>

              <p className="text-[#686868] min-w-fit text-bold font-bold font-inter">
                50,000
              </p>
              <p className="text-red-500 min-w-fit">Not Attended</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
