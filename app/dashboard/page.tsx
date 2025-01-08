import {
  FitnessClasses,
  FitnessEvent,
  Gyms,
  PopularActivities,
  Trainers,
} from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Root() {
  return (
    <section className='w-full font-inter min-h-full flex flex-col gap-10 sm:gap-20'>
      <section className='flex flex-col gap-10'>
        <header className='w-full flex flex-row justify-between items-center'>
          <h2 className='section-header'>Gyms and Studios</h2>
          <Link
            href={Routes.gyms}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[100px]"
            )}
          >
            See all
          </Link>
        </header>
        <Gyms />
      </section>
      <article className='flex flex-col gap-10'>
        <h2 className='section-header'>Popular Fitness Classes</h2>
        <FitnessClasses />
      </article>
      <article className='flex flex-col gap-10'>
        <header className='w-full flex flex-row justify-between items-center'>
          <h2 className='section-header'>Trainers and Coaches</h2>
          <Link
            href={Routes.trainers}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[100px]"
            )}
          >
            See all
          </Link>
        </header>
        <Trainers />
      </article>

      <section className='flex flex-col gap-10'>
        <h2 className='section-header'>Popular Activities</h2>
        <PopularActivities />
      </section>
      <article
        className='w-full p-[35px] pb-0 xl:pb-[35px] relative rounded-[10px] grid xl:grid-cols-3 h-auto xl:h-[246px] bg-cover bg-no-repeat'
        style={{ backgroundImage: "url(/images/blue-mesh.png)" }}
      >
        <header className='flex flex-col xl:col-span-2 items-start gap-3'>
          <h2 className='text-white font-anton text-[40px] leading-[60px]'>
            CONNECT WITH LIKE-MINDED INDIVIDUALS
          </h2>
          <Link
            className='bg-white rounded-[15px] text-lg font-semibold py-2 text-brand px-4'
            href={Routes.communities}
          >
            Find your community
          </Link>
        </header>
        <div className='xl:absolute relative right-0 bottom-0  w-[300px] h-[200px] sm:w-[400px] sm:h-[250px] xl:w-[459px] xl:h-[301px]'>
          <Image alt='Community Icon' fill src='/images/like-minded.png' />
        </div>
      </article>
      <section className='flex flex-col pb-[100px] gap-10'>
        <h2 className='section-header'>Fitness Events</h2>
        <FitnessEvent />
      </section>
    </section>
  );
}
