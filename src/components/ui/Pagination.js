"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ page, lastPage }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const goToPage = (targetPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-6 justify-center">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 rounded ${
            p == page ? "bg-emerald-500 text-white" : "bg-gray-100"
          } cursor-pointer`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page >= lastPage}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
