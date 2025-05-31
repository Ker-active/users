"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { IClass } from "@/lib/types";
import { format } from "date-fns";
import { convert24to12 } from "@/lib";
import { useBookClass } from "@/hooks/book";

import { showError } from "@/lib";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CacheKeys } from "@/lib";
import { useParams } from "next/navigation";
import { useInitiatePayment } from "@/hooks/useInitiatePayment";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classContent: IClass | null;
}
export const BookNowModal = ({ isOpen, setIsOpen, classContent }: IProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  // const { mutate: initiatePayment, isPending: isInitiatingPayment } =
  //   useInitiatePayment();

  const { mutate: bookClass, isPending: isBookPending } = useMutation({
    mutationFn: (arg: string) => client.post(`/classes/${arg}/book`),
    onSuccess: (data) => {
      const { data: result, message } = data.data;
      toast.success(message || "Class booked successfully");
      if (result.authorization_url) {
        window.location.href = result.authorization_url;
        return;
      }
      queryClient.invalidateQueries({
        queryKey: [CacheKeys.CLASSES, params.slug],
      });
      setIsOpen(false);
    },
    onError: (error) => showError(error),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90vw] sm:min-w-[850px] overflow-y-auto max-h-[80dvh]  flex flex-col sm:flex-row gap-4 sm:gap-[30px]">
        <div className="min-w-[300px] relative min-h-[350px]">
          <Image
            className="object-contain"
            fill
            alt={classContent?.title ?? "Trainers' Image"}
            src={classContent?.media?.[0] ?? ""}
            loading="lazy"
          />
        </div>
        <article className="w-full gap-2 grid">
          <p className="text-[#1C1939] font-bold tracking-[0.5px] text-2xl">
            {classContent?.title}{" "}
          </p>
          <h3 className="text-[#008080]  font-semibold font-inter">
            {classContent && (
              <>
                {format(new Date(classContent.date), "EEEE, MMM d")}{" "}
                {convert24to12(classContent.timeFrom)} -
                {convert24to12(classContent.timeTo)}
              </>
            )}
          </h3>
          <p>{classContent?.location}</p>
          <div className="flex flex-row items-center gap-3">
            {classContent?.free ? (
              <Button
                disabled={isBookPending}
                onClick={() => bookClass(classContent!._id)}
                className="w-auto"
                size="sm"
              >
                free
              </Button>
            ) : (
              <Button
                disabled={isBookPending}
                onClick={() => bookClass(classContent!._id)}
                className="w-auto"
                size="sm"
              >
                {Number(classContent?.price).toLocaleString()} NGN
              </Button>
            )}
            <p className="text-sm flex flex-row items-center gap-1 text-[#737373]">
              {classContent?.availableSlot} slots available
            </p>
          </div>
          <section className="space-y-2 mt-[28px] text-[#1C1939]  ">
            <h3 className="font-semibold">Description</h3>
            <p className="text-[#737373] leading-[30px]">
              {classContent?.description}
            </p>
          </section>
        </article>
      </DialogContent>
    </Dialog>
  );
};
