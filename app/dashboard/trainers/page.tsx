import { FilterHeader, Trainers } from "@/components/shared";

export default function TrainersPage() {
  return (
    <section className='flex min-h-full flex-col font-inter gap-10'>
      <FilterHeader title='Trainers and Coaches' />
      <Trainers showAll />
    </section>
  );
}
