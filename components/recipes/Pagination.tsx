import Link from "next/link";
import React from "react";

interface PaginationPropsInterface {
  currentPage: number;
  baseLink: string;
  number: number;
  totalPages: number;
}

const Pagination = ({ baseLink, currentPage, number, totalPages }: PaginationPropsInterface) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex flex-col gap-2.5">
        <ul className="flex items-center space-x-1 sm:space-x-2 [&>li>a]:duration-200">
          {currentPage > 1 && (
            <li className="hidden sm:block">
              <Link
                href={`${baseLink}&postsOffset=${(currentPage - 2) * number}&postsNumber=${number}`}
                className="px-3 sm:px-4 py-1 sm:py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-primary/90 hover:text-white text-sm sm:text-base"
              >
                &laquo; Prev
              </Link>
            </li>
          )}

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <li key={index + "j"} className="px-2 py-1 text-gray-500 text-sm sm:text-base">...</li>
            ) : (
              <li key={page + "i"}>
                <Link
                  href={`${baseLink}&postsOffset=${(Number(page) - 1) * number}&postsNumber=${number}`}
                  className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base ${
                    page === currentPage
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-primary/90 hover:text-white"
                  } rounded-lg`}
                >
                  {page}
                </Link>
              </li>
            )
          )}

          {currentPage < totalPages && (
            <li className="hidden sm:block">
              <Link
                href={`${baseLink}&postsOffset=${currentPage * number}&postsNumber=${number}`}
                className="px-3 sm:px-4 py-1 sm:py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-primary/90 hover:text-white text-sm sm:text-base"
              >
                Next &raquo;
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Navigation Buttons */}
        <div className="sm:hidden flex flex-row items-center gap-2.5 w-full">
          {currentPage > 1 && (
            <Link
              href={`${baseLink}&postsOffset=${(currentPage - 2) * number}&postsNumber=${number}`}
              className="w-full px-2 py-1 text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-primary/90 hover:text-white text-xs"
            >
              &laquo; Prev
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              href={`${baseLink}&postsOffset=${currentPage * number}&postsNumber=${number}`}
              className="w-full px-2 py-1 text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-primary/90 hover:text-white text-xs"
            >
              Next &raquo;
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
