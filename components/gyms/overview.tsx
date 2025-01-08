"use client";
import Image from "next/image";
import {
  Gyms,
  ListInfo,
  LoadingComponent,
  SectionSocialMedia,
  Trainers,
} from "../shared";
import { cn } from "@/lib";
import { useParams } from "next/navigation";
import { useGetGym } from "@/hooks/shared";

export const OverViewComponent = () => {
  const params = useParams();
  const { data, isPending } = useGetGym((params?.slug as string) || "");
  if (isPending) return <LoadingComponent />;

  return (
    <section className='flex flex-col gap-[55px]'>
      <section className='grid gap-4 lg:grid-cols-7'>
        <div className='grid gap-2 sm:grid-cols-5 lg:col-span-5'>
          <div className='flex flex-row  flex-wrap w-full gap-4 sm:grid-cols-5 lg:col-span-5 '>
            {data?.data.media.map((media, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-full sm:w-[200px] border rounded-[5px] h-[200px]"
                )}
              >
                <Image
                  className='object-contain'
                  fill
                  alt={`${data.data.fullname} Media`}
                  src={media}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white lg:col-span-2 rounded-[5px] space-y-[18px] py-6 px-5'>
          <div>
            <h2 className='text-lg font-bold'>Location</h2>
            <p className='text-[#3385ff] underline text-base'>
              {data?.data.location}
            </p>
          </div>
          <div className='text-[#1C1C1C] space-y-3'>
            <h2 className='text-lg font-bold'>Working Hours</h2>
            <div className='space-y-3'>
              <div>
                <p>Monday - Friday</p>
                <p className='text-[#737373]'>8am - 8pm</p>
              </div>
              <div>
                <p>Saturdays</p>
                <p className='text-[#737373]'>8am - 8pm</p>
              </div>
              <div>
                <p>Sundays</p>
                <p className='text-[#737373]'>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white py-[28px] space-y-[28px] px-4 sm:px-[35px]'>
        <article className='space-y-[10px] text-[#1C1C1C]'>
          <h2 className='text-lg font-bold'>About</h2>
          <p className='text-base leading-[32px] text-[#737373]'>
            {data?.data.professionalSummary}
          </p>
        </article>
        <ListInfo
          title='Services'
          item={data?.data.services.map((service) => service) || []}
        />

        <ListInfo
          title='Amenities'
          item={data?.data.amenities.map((amenities) => amenities) || []}
        />

        <article className='space-y-[10px] text-[#1C1C1C]'>
          <h2 className='text-lg font-bold'>Contacts</h2>
          <SectionSocialMedia
            data={{
              phone: data?.data.phoneNumber || "",
              email: data?.data.email || "",
              ...data?.data.socialMedia,
            }}
          />
        </article>
      </section>
      <section className='flex flex-col gap-10'>
        <h2 className='section-header'>Fitness Trainer</h2>
        <Trainers />
      </section>
      <section className='flex flex-col gap-10'>
        <h2 className='section-header'>Similar Gyms and Studios</h2>
        <Gyms />
      </section>
    </section>
  );
};
