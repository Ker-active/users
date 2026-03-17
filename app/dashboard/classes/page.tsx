"use client";

import { useState } from "react";
import { FilterHeader, FitnessClasses } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <section className="flex min-h-full flex-col font-inter gap-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-row w-full gap-[18px] items-center">
          <Button
            variant="ghost"
            className="border-[1.2px] rounded-[8px] border-[#BFBFBF] "
            onClick={() => router.back()}
            size="icon"
          >
            <ArrowLeft color="#737373" />
          </Button>
          <h2 className="section-header">Popular Fitness Classes</h2>
        </div>

        <div className="relative w-full sm:w-[320px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full border-gray-300 focus-visible:ring-brand"
          />
        </div>
      </div>

      <FitnessClasses showAll searchTerm={search} />
    </section>
  );
}
