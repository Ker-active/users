"use client";
import { Empty, LoadingComponent } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useGetPlans } from "@/hooks/shared";
import { showError } from "@/lib";
import { client } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { data, isPending } = useGetPlans(params!?.slug as string);
  const { mutate, isPending: isBookPending } = useMutation({
    mutationFn: (arg: string) => client.post(`/classes/${arg}/book`),
    onSuccess: () => {
      toast.success("Booked");
    },
    onError: (error) => showError(error),
  });
  if (isPending) return <LoadingComponent />;

  return (
    <section className='bg-[#F4F3F6] flex flex-col gap-[30px]'>
      <header className='flex flex-col  gap-4'>
        <Button
          variant='ghost'
          className='border-[1.2px] rounded-[8px] border-[#BFBFBF] '
          onClick={() => router.back()}
          size='icon'
        >
          <ArrowLeft color='#737373' />
        </Button>
        <h2 className='font-anton text-[60px] tracking-wide leading-[50px] text-[#1C1939]'>
          LETS&apos;S WORK OUT
        </h2>
      </header>
      <section className='grid gap-6 '>
        {data?.data.length == 0 ? (
          <Empty desc={"No Plans yet"} src={"/plan.svg"} alt={"Members Icon"} />
        ) : (
          <>
            {" "}
            {data?.data.map((plan) => (
              <article
                className='border p-[30px] rounded-[7px] bg-white border-[#E2E2E2]'
                key={plan._id}
              >
                <header className='flex flex-row items-center gap-2'>
                  <Image
                    alt='Plan Icon'
                    src='/plan.svg'
                    width={40}
                    height={40}
                  />
                  <p className='text-xl text-[#1D1C20] font-bold'>
                    {plan.packageName}
                  </p>
                </header>
                <p className='text-[#707991] mt-[12px] text-sm'>
                  {plan.description}
                </p>
                <p className='font-bold mt-[30px] text-[#1D1C20] text-xl'>
                  {Number(plan.price).toLocaleString()} NGN
                </p>
                <Button
                  disabled={isBookPending}
                  onClick={() => mutate(plan._id)}
                  className='mt-[40px]'
                >
                  Book Now
                </Button>
              </article>
            ))}
          </>
        )}
      </section>
      <section className='space-y-4'>
        <h2 className='font-anton text-[30px] leading-[50px] tracking-[1px]'>
          Special classes
        </h2>
        <ul className='flex flex-col gap-8'>
          {Array.from({ length: 2 }).map((_, index) => (
            <li
              className='bg-white flex flex-row py-[20px] px-4 w-full items-center text-[#1C1C1C] justify-between sm:px-[40px] font-semibold text-xl'
              style={{ boxShadow: "0px 4px 4px 0px #0000000A" }}
              key={index}
            >
              <p className=''>Core Cardio</p>
              <p className='text-[#767676]'>Sept 16, 7:00 AM</p>
              <p>30,000 NGN</p>
              <Button className='w-fit' size='sm'>
                Book Now
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
