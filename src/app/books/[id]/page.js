import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page({ params }) {
  const book = (await sql`SELECT * FROM books WHERE id = ${params.id}`).rows[0];
  const genres = (
    await sql`
        SELECT g.* FROM genres g
        JOIN book_genres bg ON g.id = bg.genre_id
        WHERE bg.book_id = ${params.id}`
  ).rows;

  let genresDisplay =
    genres.length > 0
      ? genres.map((genre) => genre.name).join(", ")
      : "No genres";

  return (
    <div className="bg-hero-image bg-cover bg-no-repeat bg-center flex min-h-screen flex-col items-center p-2 z-0 text-center ">
      <div className="flex flex-col max-w-xl items-center bg-gray-800 m-5 rounded-2xl ">
        <div>
          <h2 className="text-2xl p-2 text-yellow-600 font-bold">
            {book.title}
          </h2>
          <p className="font-medium italic">{book.author}</p>
          <p className="italic text-sm font-light p-2">
            Genres: {genresDisplay}
          </p>
        </div>
        {book.img_url && (
          <Image
            src={book.img_url}
            width={500}
            height={500}
            className="rounded-xl border-2 border-yellow-500 border-opacity-100 border-solid"
          />
        )}
        <br />
        <div className="p-4 m-2 bg-gray-300 rounded-xl text-black text-left">
          <p className="">{book.description}</p>
          <br></br>
          <p className="italic text-">"{book.quote}"</p>
        </div>
      </div>
    </div>
  );
}

// find out what page Im on
// write a sql query to get data about the page im osn
