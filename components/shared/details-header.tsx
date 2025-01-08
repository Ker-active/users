"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Bookmark, MessageCircleMore, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Routes, cn } from "@/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyLink } from "./copy-link";

export const GymsTrainersDetailsHeader = () => {
  const pathname = usePathname();
  const isComponentUsedInGym = pathname.includes("gyms");
  const params = useParams();

  const id = params.slug;

  return (
    <div className='flex flex-row gap-[11px] items-center'>
      <Link
        className={buttonVariants({ className: "font-normal", size: "sm" })}
        href={
          isComponentUsedInGym
            ? Routes.gyms + `/${id}/plans`
            : Routes.trainers + `/${id}/plans`
        }
      >
        View Plans
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              variant='ghost'
              size='icon'
              className='bg-white min-w-[45px]  rounded-[10px] place-self-end'
            >
              <Bookmark size={24} color='#008080' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bookmark</p>
          </TooltipContent>
        </Tooltip>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              variant='ghost'
              size='icon'
              className='bg-white min-w-[45px] rounded-[10px] place-self-end'
            >
              <Share2 size={24} color='#008080' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-[364px] text-[#1C1939] space-y-2 rounded-[8px]'
            side='left'
          >
            <CopyLink />
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`${
                isComponentUsedInGym ? Routes.gyms : Routes.trainers
              }/${id}/chat`}
              style={{ boxShadow: "0px 4px 4px 0px #BED8FF40" }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "bg-white min-w-[45px] rounded-[10px] place-self-end"
              )}
            >
              <MessageCircleMore size={24} color='#008080' />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
