"use client";
import {
  AddReview,
  LoadingComponent,
  SectionSocialMedia,
  Trainers,
} from "@/components/shared";
import { ReviewComponent } from "@/components/gyms";
import Image from "next/image";
import { Classes } from "@/components/classes";
import { Button } from "@/components/ui/button";
import { useGetSpecificClasss, useGetTrainer } from "@/hooks/shared";

const TrainersMedia = [
  {
    grid: "area-one",
    url: "/images/trainers/trainer1.png",
  },
  {
    grid: "area-two",
    url: "/images/trainers/trainer2.png",
  },
  {
    grid: "area-three",
    url: "/images/trainers/trainer3.png",
  },
  {
    grid: "area-four",
    url: "/images/trainers/trainer4.png",
  },
  {
    grid: "area-five",
    url: "/images/trainers/trainer5.png",
  },
];

export default function TrainersDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { data, isPending } = useGetTrainer(params.slug);
  const { data: classes } = useGetSpecificClasss(params.slug as string);

  if (isPending) return <LoadingComponent />;

  return (
    <section className='flex  flex-col gap-[40px]'>
      <section className='bg-white flex flex-col lg:flex-row gap-4 lg:gap-8 xl:gap-[50px] px-[23px] py-[34px] rounded-[10px]'>
        <div className='w-full relative max-w-[279px] h-[292px]'>
          <Image fill alt="Trainers' Image" src={"/images/trainer.png"} />
        </div>

        <article className='flex flex-col w-full gap-[22px]'>
          <header>
            <h2 className='text-[#1C1939] font-bold text-lg lg:text-2xl'>
              {data?.data.fullname}
            </h2>
            <p className='text-[#737373]'>{data?.data.services.join(", ")}</p>
            <a className='text-[#3385FF]' href='#'>
              @ker-Fitness
            </a>
          </header>
          <p className='text-[#6B6868]'>{data?.data.professionalSummary}</p>
          <article className='space-y-[10px] text-[#1C1C1C]'>
            <h2 className='text-lg font-bold'>Contact</h2>
            <SectionSocialMedia
              data={{
                phone: data?.data.phoneNumber || "",
                email: data?.data.email || "",
                ...data?.data.socialMedia,
              }}
              className='mt-2 sm:mt-0'
            />
          </article>
        </article>
      </section>
      {(data?.data.media?.length || 0) > 0 && (
        <section className='flex flex-col gap-6'>
          <h2 className='section-header'>Media</h2>
          <section className='bg-white gap-4 grid-container p-4'>
            {data?.data.media.map((media, index) => (
              <div key={index} className='relative border w-full'>
                <Image fill src={media} alt="Trainer's media" />
              </div>
            ))}
            {/* {TrainersMedia.map((trainer) => (
                <div key={trainer.grid} className={`relative w-full ${trainer.grid}`}>
                  <Image fill src={trainer.url} alt="Trainer's media" />
                </div>
              ))} */}
          </section>
        </section>
      )}
      <section className='flex flex-col gap-6'>
        <header className='w-full flex-row flex items-center justify-between'>
          <h2 className='section-header'>Classes</h2>
          <Button className='w-fit px-6'>Available Slots</Button>
        </header>
        <Classes classDetails={classes?.data || []} isForTrainer />
      </section>
      <section className='flex flex-col gap-6'>
        <header className='w-full justify-between flex flex-row'>
          <h2 className='section-header'>Reviews</h2>
          <AddReview className='bg-brand text-white' />
        </header>
        <ReviewComponent hideAddButton />
      </section>
      <section className='flex flex-col gap-6'>
        <h2 className='section-header'>Similar Fitness Trainer</h2>
        <Trainers />
      </section>
    </section>
  );
}
