"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FitnessEvent } from "@/components/shared";
import { OverViewComponent, ReviewComponent } from "@/components/gyms";
import { Classes } from "@/components/classes";
import { useParams } from "next/navigation";
import { useGetSpecificClasss } from "@/hooks/shared";

export default function GymsDetails() {
  const params = useParams();
  const { data: classes } = useGetSpecificClasss(params.slug as string);
  return (
    <Tabs defaultValue='overview' className='space-y-8 w-full'>
      <TabsList className='justify-between border-b border-[#E6E6E6] min-w-full'>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='classes'>Classes</TabsTrigger>
        <TabsTrigger value='events'>Events</TabsTrigger>
        <TabsTrigger value='review'>Review</TabsTrigger>
      </TabsList>

      <TabsContent value='overview'>
        <OverViewComponent />
      </TabsContent>
      <TabsContent className='pb-40 sm:pb-0' value='classes'>
        <Classes classDetails={classes?.data || []} />
      </TabsContent>
      <TabsContent value='events'>
        <FitnessEvent gymId={params.slug as string} />
      </TabsContent>
      <TabsContent value='review'>
        <ReviewComponent />
      </TabsContent>
    </Tabs>
  );
}
