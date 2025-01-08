"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleX, ListFilter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FilteredInput } from "@/components/forms";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  title: string;
  inputPlaceholder?: string;
}

const filterSchema = z.object({
  location: z.string().optional(),
  search: z.string().optional(),
  activities: z.string().optional(),
  rating: z.string().optional(),
  wheelChair: z.string().optional(),
});

type Type = z.infer<typeof filterSchema>;

export const FilterHeader = ({
  title,
  inputPlaceholder = "Search by  gym, location and activities",
}: IProps) => {
  const router = useRouter();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<Type>({
    resolver: zodResolver(filterSchema),
  });

  //update values here with searchParams, Each component will then be listening for changes in search params
  function onSubmit(values: Type) {
    const query = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        query.set(key, value);
      } else {
        query.delete(key);
      }
    });

    router.replace(`?${query.toString()}`);
  }

  return (
    <header className='flex flex-col lg:flex-row  items-start gap-4 lg:items-center justify-between'>
      <div className='flex flex-row w-full gap-[18px] items-center'>
        <Button
          variant='ghost'
          className='border-[1.2px] rounded-[8px] border-[#BFBFBF] '
          onClick={() => router.back()}
          size='icon'
        >
          <ArrowLeft color='#737373' />
        </Button>
        <h2 className='section-header'>{title}</h2>
      </div>
      <Form {...form}>
        <form
          id='form-search'
          className='w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col w-full justify-end sm:flex-row gap-[18px] sm:items-center '>
            <div className='bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 w-full sm:w-[320px]  flex flex-row px-2 items-center gap-2 rounded-[30px]'>
              <Search size={20} color='#999999' />
              <FilteredInput
                name='search'
                type='text'
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
                className='border-none py-0 placeholder:text-[#25273366] focus-visible:ring-offset-0  px-0 rounded-full outline-0  focus-visible:ring-0  text-[#737373] text-sm'
                placeholder={inputPlaceholder}
              />
            </div>
            <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
              <PopoverTrigger asChild>
                <Button
                  className=' w-full sm:w-[93px] flex flex-row gap-[6px] text-sm  h-[40px]'
                  size='sm'
                >
                  <ListFilter size={18} />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className='relative w-[350px] sm:w-[391px] space-y-2 sm:space-y-[28px] text-[#1C1939] sm:right-10'>
                <header className='flex flex-row w-full items-center justify-between'>
                  <h3 className='font-bold text-xl'>Filters</h3>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsPopOverOpen(false)}
                  >
                    <CircleX />
                  </Button>
                </header>

                <div className='flex flex-col overflow-auto pb-4  gap-1 sm:gap-4'>
                  <FilteredInput<Type> name='location' label='Location' />
                  <FilteredInput<Type> name='activities' label='Activities' />
                  <FilteredInput<Type> name='rating' label='Rating' />
                  <FilteredInput<Type>
                    name='wheelChair'
                    label='wheelChair Accessible'
                  />

                  <Button
                    onClick={() => form.handleSubmit(onSubmit)()}
                    className='mt-2 sm:mt-4'
                  >
                    Apply Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              type='button'
              onClick={() => {
                form.reset({
                  search: "",
                });
                //remove search params
                const query = new URLSearchParams(searchParams);
                query.delete("location");
                query.delete("search");
                query.delete("activities");
                query.delete("rating");
                query.delete("wheelChair");
                router.replace(`?${query.toString()}`);
              }}
              variant='outline'
              className=' w-full sm:w-[100px] flex flex-row gap-[6px] text-sm  h-[40px]'
              size='sm'
            >
              Reset Filter
            </Button>
          </div>
        </form>
      </Form>
    </header>
  );
};
