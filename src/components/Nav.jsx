import Link from "next/link";
export default function Nav() {
  return (
    <div className="bg-gray-800">
      <ol className="flex flex-row p-3">
        <li className="m-4 hover:text-yellow-600">
          <Link href="/">Home</Link>
        </li>
        <li className="m-4 hover:text-yellow-600">
          <Link href="/books">Library</Link>
        </li>
        <li className="m-4 hover:text-yellow-600">
          <Link href="/books/add-book">Add Book</Link>
        </li>
        <li className="m-4 hover:text-yellow-600">
          <Link href="/add-genre"> Add/View Genres</Link>
        </li>
      </ol>
    </div>
  );
}
