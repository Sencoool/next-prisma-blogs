"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({
  limit,
  page,
  totalPages,
}: {
  limit: number;
  page: number;
  totalPages: number;
}) {
  const [currentPage, setPage] = useState(page);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update params when currentPage changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    params.set("limit", limit.toString());
    router.push(`/posts?${params.toString()}`);
  }, [currentPage]);
  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn"
          disabled={currentPage <= 1} // Disable if on first page
          onClick={() => setPage(currentPage - 1)} // Prevent going below 1
        >
          «
        </button>
        <button className="join-item btn ml-0.5 mr-0.5 cursor-default">
          {currentPage}/{totalPages}
        </button>
        <button
          className="join-item btn"
          disabled={currentPage >= totalPages} // Disable if on last page
          onClick={
            () => setPage(currentPage + 1) // Prevent going above totalPages
          }
        >
          »
        </button>
      </div>
    </div>
  );
}
