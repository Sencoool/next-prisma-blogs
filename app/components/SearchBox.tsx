"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  const [search, setSearch] = useState(defaultValue); // Initialize with defaultValue
  const router = useRouter(); // Hook for navigation
  const searchParams = useSearchParams(); // Hook to access current URL search params

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // Create a copy of current search params
    if (search) {
      params.set("search", search);
      console.log("Search params updated: ", params.toString());
    } else {
      params.delete("search");
    }
    router.push(`/posts?${params.toString()}`); // Navigate to the updated URL
  }, [search]);

  return (
    <div className="flex">
      <p className="mr-2 mt-2 ">🔎</p>
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        className="input w-full max-w-xs"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
