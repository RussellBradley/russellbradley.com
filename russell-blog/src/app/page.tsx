import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map(({ slug, metadata }) => (
          <li key={slug} className="border-b pb-4">
            <Link href={`/${slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {metadata.title}
            </Link>
            <p className="text-sm text-gray-500">{metadata.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}