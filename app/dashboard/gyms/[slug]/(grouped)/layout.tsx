"use client";

import { GymsTrainersDetailsHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function GymsDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <section className='flex min-h-full flex-col w-full font-inter gap-10'>
      <header className='flex flex-col gap-4 sm:flex-row items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-row w-full gap-[18px] items-center'>
            <Button
              variant='ghost'
              className='border-[1.2px] rounded-[8px] border-[#BFBFBF] '
              onClick={() => router.back()}
              size='icon'
            >
              <ArrowLeft color='#737373' />
            </Button>
            <h2 className='section-header'>Ker Fitness</h2>
          </div>
          <div className='flex flex-row gap-1 text-[#737373] items-center'>
            <p className='text-sm  font-medium'>15 mins away</p>
            <Star fill='#FFE142' size={18} color='#FFE142' />
            <p className={"font-inter text-[12px]"}>4.5</p>
          </div>
        </div>
        <GymsTrainersDetailsHeader />
      </header>
      {children}
    </section>
  );
}
