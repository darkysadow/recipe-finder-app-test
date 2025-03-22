"use server";

import EmptyResponse from "@/components/recipes/EmptyResponse";
import Image from "next/image";
import Link from "next/link";

interface ReceiptListItemInterface {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

interface ResponseReceiptsInterface {
  results: ReceiptListItemInterface[] | [];
  offset: number;
  number: number;
  totalResults: number;
}

export default async function Recipes({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const {
    query = "",
    cuisine = "Eastern European",
    maxReadyTime = "60",
    postsOffset = '0',
    postsNumber = '12'
  } = await searchParams;

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const data = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}60&apiKey=${apiKey}&offset=${postsOffset}&number=${postsNumber}`
  );

  const baseLink = `/recipes?preparationTime=${maxReadyTime}&cuisine=${cuisine}&query=${query}`

  const posts: ResponseReceiptsInterface = await data.json();
  console.log(posts);

  const {number, offset, results, totalResults} = posts

  const totalPages = Math.ceil(totalResults / number);
  const currentPage = Math.floor(offset / number) + 1;

  return (
    <section className="max-w-1024 mx-auto flex flex-col gap-10">
      {totalResults > 0 ? (
        <>
          <div>
            <p className="sm:text-2xl">
              Found recipes: <span>{totalResults}</span>
            </p>
          </div>
          <div className="grid max-sm:grid-cols-1 gap-9 sm:grid-cols-3 max-2xl:grid-cols-3">
            {results && results.map((item, index) => (
                <Link href={`/recipes/${item.id}`} key={index} className="flex flex-col gap-3 hover:[&>p]:decoration-secondary">
                    <figure className="w-full h-[190px] relative overflow-hidden rounded-2xl">
                        <Image src={item.image} alt={item.title} fill className="absolute object-cover object-center" />
                    </figure>
                    <p className="transition duration-200 hover:transition hover:duration-200 underline decoration-transparent underline-offset-2">{item.title}</p>
                </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6">
          <nav>
            <ul className="flex items-center space-x-4 [&>li>a]:duration-200">
              {currentPage > 1 && (
                <li>
                  <Link
                    href={baseLink + `&postsOffset=${(currentPage - 2) * number}&postsNumber=${number}`}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg hover:bg-primary/90 hover:text-white"
                  >
                    &laquo; Prev
                  </Link>
                </li>
              )}

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <li key={page}>
                    <a
                      href={baseLink + `&postsOffset=${(page - 1) * number}&postsNumber=${number}`}
                      className={`px-4 py-2 text-gray-700 ${page === currentPage ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-primary/90 hover:text-white'} rounded-lg`}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}

              {currentPage < totalPages && (
                <li>
                  <a
                    href={baseLink + `&postsOffset=${currentPage * number}&postsNumber=${number}`}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-r-lg hover:bg-primary/90 hover:text-white"
                  >
                    Next &raquo;
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        </>
      ) : (
        <EmptyResponse />
      )}
    </section>
  );
}
