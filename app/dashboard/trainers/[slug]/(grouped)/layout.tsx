"use client";

import { GymsTrainersDetailsHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function TrainersDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <section className='flex min-h-full flex-col w-full font-inter gap-10'>
      <header className='flex flex-col gap-4 sm:flex-row items-start justify-between'>
        <Button
          variant='ghost'
          className='border-[1.2px] rounded-[8px] border-[#BFBFBF] '
          onClick={() => router.back()}
          size='icon'
        >
          <ArrowLeft color='#737373' />
        </Button>

        <GymsTrainersDetailsHeader />
      </header>
      {children}
    </section>
  );
}
