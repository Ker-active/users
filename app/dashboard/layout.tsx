"use client";

import { Sidebar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Bell, Route, SquareMenu } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { getInitials, Routes } from "@/lib";
import { useGetUser } from "@/hooks/shared";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useGetUser();

  return (
    <main className='h-svh w-screen overflow-hidden bg-off-white'>
      <header className='h-[70px] bg-white w-full flex flex-row items-center justify-between border-[1px] sm:px-[40px] px-4 border-b-[#F3F3F3]'>
        <Link href={Routes.home}>
          <Image
            alt='Ker Active Logo'
            src='/green-logo.svg'
            width={139}
            height={20}
          />
        </Link>
        <div className='flex-row flex items-center gap-6'>
          <Bell fill='#5B5971' color='#5B5971' size={20} />
          <Link href={Routes.account}>
            <Avatar className='w-10 h-10'>
              <AvatarImage src={data?.data.media[0]} />
              <AvatarFallback>
                {getInitials(data?.data.fullname || "")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Sheet onOpenChange={setIsSidebarOpen} open={isSidebarOpen}>
            <SheetTrigger asChild>
              <Button className='flex sm:hidden' variant='outline' size='icon'>
                <SquareMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <Sidebar
                setIsSidebarOpen={setIsSidebarOpen}
                className='border-0'
              />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <section className='h-full flex flex-row w-full'>
        <Sidebar className='hidden sm:block' />
        <div className='px-4  overflow-y-auto w-full flex-grow lg:px-[48px] pt-6 pb-24 sm:pt-[35px] sm:pb-[100px]'>
          <div className='max-w-[1120px]'>{children}</div>
        </div>
      </section>
    </main>
  );
}
