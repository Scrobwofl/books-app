import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-hero-image bg-cover bg-no-repeat bg-center flex min-h-screen flex-col items-center p-24 z-0">
      <div className="bg-gray-900 p-5 rounded-xl text-center filter shadow-lg">
        <h1 className="text-xl font-bold p-2 text-yellow-600 z-10">
          The Magical Book Emporium at the End of the Universe
        </h1>
        <br />
        <p>
          Welcome to our luxurious literature lounge.
          <br />
          <br />
          Unfortunately our records have been destroyed, so you'll have to add
          your own books to the database for now.
        </p>
      </div>
    </main>
  );
}
