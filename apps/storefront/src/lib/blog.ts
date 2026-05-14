import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDirectory = path.join(process.cwd(), "src/content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  image: string
  category: string
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as {
          title: string
          date: string
          author: string
          excerpt: string
          image: string
          category: string
        }),
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as {
        title: string
        date: string
        author: string
        excerpt: string
        image: string
        category: string
      }),
    }
  } catch (e) {
    return null
  }
}
