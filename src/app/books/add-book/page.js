import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import SubmitButton from "@/components/SubmitButton";
import { getGenres } from "@/utils/utils";

export default async function Page() {
  // becuase this function is used in the form action attribute, it's 'contents' are passed automatically (the formData)
  async function handleAddBook(formData) {
    "use server";
    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const quote = formData.get("quote");
    const img_url = formData.get("img_url");

    // .get only returns one
    const genres = formData.getAll("genres");
    // console.log('genres selected: ' + genres)
    // console.log(genres)

    // await sql`INSERT INTO book_genres `
    // await sql`INSERT INTO books (title, author, description, quote) VALUES (${title}, ${author}, ${description}, ${quote}) RETURNING id;`

    const bookResult = (
      await sql`INSERT INTO books (title, author, description, quote, img_url) VALUES (${title}, ${author}, ${description}, ${quote}, ${img_url}) RETURNING id;`
    ).rows;
    const bookId = bookResult[0].id;
    genres.forEach(async (genreId) => {
      await sql`INSERT INTO book_genres (book_id, genre_id) VALUES (${bookId}, ${genreId});`;
    });

    // tell next to go revalidate that /books now has the correct content
    revalidatePath("/books");

    // redirect them to /books after submitting.
    redirect("/books");
  }

  let genres = await getGenres();
  return (
    <div className="bg-hero-image bg-cover bg-no-repeat bg-center flex min-h-screen flex-col items-center">
      <h2 className="text-3xl py-2 px-6 bg-yellow-600 w-screen text-black font-bold shadow-xl mb-4">
        Add Book to DB
      </h2>
      <form
        action={handleAddBook}
        className="w-6/12 flex flex-col justify-center text-black bg-gray-800 p-5 rounded-xl"
      >
        <label className="text-amber-400 text-lg">Name</label>
        <input
          name="title"
          placeholder="Title"
          className="rounded-xl p-1 px-2 m-1"
        />

        <label className="text-amber-400 text-lg">Author</label>
        <input
          name="author"
          placeholder="Author"
          className="rounded-xl p-1 px-2 m-1"
        />

        <label className="text-amber-400 text-lg">Description</label>
        <input
          name="description"
          placeholder="Description"
          className="rounded-xl p-1 px-2 m-1"
        />

        <label className="text-amber-400 text-lg">Quote</label>
        <input
          name="quote"
          placeholder="Quote"
          className="rounded-xl p-1 px-2 m-1"
        />

        <label className="text-amber-400 text-lg">Image Link</label>
        <input
          name="img_url"
          placeholder="img url"
          className="rounded-xl p-1 px-2 m-1"
        />

        <label htmlFor="genres" className="text-amber-400 text-lg">
          Select genres (hold shift to select multiple)
        </label>
        <select
          className="rounded-xl p-2 overflow-auto overscroll-contain"
          name="genres"
          id="genres"
          multiple
        >
          {genres.map((genre) => (
            <option
              className="hover:text-yellow-500 hover:bg-gray-500"
              value={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>
        <SubmitButton thing="book" />
      </form>
    </div>
  );
}

// {
//     title: 'Ready Player One',
//     author: 'Ernest Cline',
//     description: 'something',
//     quote: "No one in the world gets what they want and that is beautiful."
// }
