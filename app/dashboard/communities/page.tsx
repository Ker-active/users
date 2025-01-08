import { FilterHeader } from "@/components/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupList,
  AvatarImage,
  AvatarOverflowIndicator,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, Routes } from "@/lib";
import { Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Communities() {
  return (
    <section className='flex min-h-full flex-col font-inter gap-10'>
      <article className='w-full px-[22px] py-4 flex items-center overflow-hidden relative rounded-[10px]  h-auto xl:h-[246px] bg-cover bg-[#003838]'>
        <div className='md:border-[2px]  relative z-10 flex items-center md:px-4 md:py-4 rounded-[10px] border-[#F9C4A8] h-full w-full'>
          <header className='flex flex-col w-fit xl:col-span-2  gap-3'>
            <h2 className='text-white font-anton text-[40px] leading-[60px]'>
              CONNECT WITH LIKE-MINDED INDIVIDUALS
            </h2>
            <Link
              className='bg-white rounded-[15px] w-fit text-lg font-semibold py-2 text-brand px-4'
              href={Routes.communities}
            >
              Create your community
            </Link>
          </header>
        </div>
        <div className='hidden  lg:block xl:absolute relative right-5 bottom-0 w-[300px] h-full  sm:w-[400px] xl:w-[550px] '>
          <Image alt='Community Icon' fill src='/images/create-community.png' />
        </div>
      </article>
      <FilterHeader
        inputPlaceholder='Search'
        title='Discover new Communities'
      />
      <ul className={cn("grid lg:grid-cols-2 xl:grid-cols-3 gap-[28px]")}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className='bg-white pb-[18px] rounded-[5px] w-full text-[#1C1939]'
          >
            <article className='flex gap-[30px] flex-col'>
              <header>
                <div className='relative w-full h-[200px] sm:h-[187px]'>
                  <Image
                    alt='Fitness Event Image'
                    fill
                    src='/images/fitness-event.png'
                  />
                </div>
                <div className='px-[18px] flex flex-row justify-between   pt-[18px]'>
                  <div>
                    <h3 className='font-bold text-lg'>Core Cardio</h3>
                    <p className='text-[#565C78] text-sm'>
                      Tracking Adin Loyals Community Progress
                    </p>
                  </div>
                  <Button
                    style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                    variant='ghost'
                    size='icon'
                    className='bg-[#F4F2F2]  rounded-[10px] place-self-start'
                  >
                    <Bookmark size={24} color='#1C1C1C' />
                  </Button>
                </div>
              </header>

              <footer className='w-full px-[18px] justify-between gap-6 items-center flex flex-row'>
                <div className='flex items-center flex-row gap-2'>
                  <AvatarGroup limit={3}>
                    <AvatarGroupList>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Avatar key={i}>
                          <AvatarImage
                            src={`https://xsgames.co/randomusers/assets/avatars/female/${i}.jpg`}
                            alt='@shadcn'
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroupList>
                    <AvatarOverflowIndicator />
                  </AvatarGroup>
                  <p className='text-sm font-inter'>4.5k members</p>
                </div>
                <div className='flex gap-1 flex-row items-center'>
                  <Button className='font-semibold w-[93px] text-sm text-off-white '>
                    Join
                  </Button>
                  <Button
                    style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
                    variant='ghost'
                    size='icon'
                    className='min-w-[45px] bg-[#1C1939] h-[45px] rounded-[10px] place-self-end'
                  >
                    <Share2 size={26} color='white' />
                  </Button>
                </div>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
