"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox({
  defaultValue = "",
}: {
  defaultValue?: string;
}) {
  const [search, setSearch] = useState(defaultValue); // Initialize with defaultValue
  const router = useRouter(); // Hook for navigation
  const searchParams = useSearchParams(); // Hook to access current URL search params

  // Update params when search state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // Create a copy of current search params
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`/posts?${params.toString()}`); // Navigate to the updated URL
  }, [search]);

  return (
    <input
      type="text"
      className="input input-bordered w-full max-w-xs"
      placeholder="Search posts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
