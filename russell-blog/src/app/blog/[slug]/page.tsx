import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function BlogPostPage({ params }: any) {
  const { slug } = await Promise.resolve(params);
  const filePath = path.join("posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync("posts");

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}