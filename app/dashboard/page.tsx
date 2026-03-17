import { FitnessClasses, Gyms, Trainers } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Root() {
  return (
    <section className="w-full font-inter min-h-full flex flex-col gap-10 sm:gap-20">
      <section className="flex flex-col gap-10">
        <header className="w-full flex flex-row justify-between items-center">
          <h2 className="section-header">Gyms and Studios</h2>
          <Link
            href={Routes.gyms}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[100px]",
            )}
          >
            See all
          </Link>
        </header>
        <Gyms />
      </section>

      <article className="flex flex-col gap-10">
        <header className="w-full flex flex-row justify-between items-center">
          <h2 className="section-header">Popular Fitness Classes</h2>
          <Link
            href={Routes.classes}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[100px]",
            )}
          >
            See all
          </Link>
        </header>
        <FitnessClasses />
      </article>

      <article className="flex flex-col gap-10">
        <header className="w-full flex flex-row justify-between items-center">
          <h2 className="section-header">Trainers and Coaches</h2>
          <Link
            href={Routes.trainers}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[100px]",
            )}
          >
            See all
          </Link>
        </header>
        <Trainers />
      </article>
    </section>
  );
}
