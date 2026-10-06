import { client } from "../../../sanity/lib/client";
import LibraryClient from "./LibraryClient";

async function getTextbooks() {
  const query = `*[_type == "library"] | order(title asc) {
    _id,
    title,
    author,
    "fileUrl": file.asset->url,
    externalUrl
  }`;

  try {
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching textbooks from Sanity:", error);
    return [];
  }
}

export default async function LibraryPage() {
  const textbooks = await getTextbooks();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0c0d10" }}>
      <LibraryClient initialTextbooks={textbooks} />
    </main>
  );
}