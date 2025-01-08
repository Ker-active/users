import { FilterHeader, Gyms } from "@/components/shared";

export default function GymsPage() {
  return (
    <section className='flex min-h-full flex-col font-inter gap-10'>
      <FilterHeader title='Gyms and Studios' />
      <Gyms showAll />
    </section>
  );
}
