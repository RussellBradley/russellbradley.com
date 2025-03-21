import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const files = fs.readdirSync("posts");
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}