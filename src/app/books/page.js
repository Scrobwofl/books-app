import DeleteButton from "@/components/DeleteButton";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const books = (await sql`SELECT * FROM books`).rows;
  // console.log(books)
  return (
    <div className="bg-hero-image bg-cover bg-no-repeat bg-center flex min-h-screen flex-col items-center ">
      <h1 className="text-3xl py-2 px-6 bg-yellow-600 w-screen text-black font-bold shadow-xl">
        Books:
      </h1>
      <div className="flex flex-row flex-nowrap justify-items-start">
        {books.map((book) => (
          <div
            key={book.id}
            className="m-8 p-2 bg-gray-900 rounded-xl flex flex-col items-end"
          >
            <div className="bg-gray-800 p-2 rounded-md shadow-md flex flex-col items-center">
              {book.img_url && (
                <Image
                  src={book.img_url}
                  width={150}
                  height={150}
                  className="rounded-xl border-2 border-yellow-500 border-opacity-100 border-solid"
                />
              )}
              <h3 className="font-bold text-yellow-500">{book.title}</h3>
              <p className="italic text-sm mt-1">{book.author}</p>
              <div className="flex items-stretch gap-1 mt-2">
                <Link
                  href={`/books/${book.id}`}
                  className="text-sm text-yellow-500 p-2 bg-gray-700 rounded-md"
                >
                  More info...
                </Link>
                <DeleteButton id={book.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
