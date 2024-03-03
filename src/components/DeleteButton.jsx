"use client";
import { handleDelete } from "@/utils/utils";
import { useFormStatus } from "react-dom";

export default function DeleteButton({ id }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="text-sm bg-gray-700 py-1 px-2 rounded-md text-red-600"
      onClick={() => handleDelete(id)}
    >
      {pending ? `Deleting` : `Delete`}
    </button>
  );
}
