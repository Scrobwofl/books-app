import SubmitButton from "@/components/SubmitButton";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const genres = (await sql`SELECT * from genres`).rows;
  console.log(genres);

  async function handleAddGenre(formData) {
    "use server";
    const name = formData.get("name");
    const descripton = formData.get("description");

    await sql`INSERT INTO genres (name, description) VALUES (${name}, ${descripton})`;

    // You need these to clear the cache so it updates properly
    revalidatePath("/add-genre");
    revalidatePath("/book/add-book");
  }
  return (
    <div className="flex flex-col justify-start items-center bg-hero-image bg-cover bg-center min-h-screen">
      <h1 className="text-3xl py-2 px-6 bg-yellow-600 w-screen text-black font-bold shadow-xl">
        Add A Genre
      </h1>
      <form
        action={handleAddGenre}
        className="flex flex-col w-6/6 p-5 text-black bg-gray-800 rounded-xl my-3 shadow-md"
      >
        <input
          className="rounded-md p-1 m-1"
          type="text"
          name="name"
          placeholder="Genre Name"
          required
        />
        <input
          className="rounded-md p-1 m-1"
          type="text"
          name="description"
          placeholder="Genre Description"
        />
        <SubmitButton thing="genre" />
      </form>
      <div className="rounded-2xl p-5 bg-gray-800 flex flex-col mx-20 shadow-md">
        <h3 className="text-center text-3xl mb-4 text-yellow-500 font-bold">
          Current Genres:
        </h3>
        {genres.map((genre) => (
          <div className="m-2">
            <h3 className="text-xl text-yellow-500 font-bold">{genre.name}</h3>
            <p className="text-md">{genre.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
