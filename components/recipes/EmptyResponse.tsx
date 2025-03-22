"use server"

import Link from "next/link";
import React from "react";

const EmptyResponse = () => {
  return (
    <div className="w-full text-center flex flex-col gap-5 items-center">
      <p>
        We&apos;re sorry, but no recipes were found based on your parameters.
      </p>

      <Link
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        href="/"
      >
        Back to search
      </Link>
    </div>
  );
};

export default EmptyResponse;
