import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function AddDestination() {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const saveDestination = async () => {
    const { error } = await supabase
      .from("destinations")
      .insert([
        {
          name,
          state,
          category,
          description,
          image_url: imageUrl,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Destination Added Successfully");

    setName("");
    setState("");
    setCategory("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Destination
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Destination Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button
        onClick={saveDestination}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Destination
      </button>
    </div>
  );
}