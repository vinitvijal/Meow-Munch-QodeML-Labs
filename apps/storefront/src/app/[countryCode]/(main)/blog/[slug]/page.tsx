import { Metadata } from "next"
import { getBlogPostBySlug, getBlogPosts } from "@lib/blog"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart } from "@medusajs/icons"
import React from "react"

interface Props {
  params: Promise<{
    slug: string
    countryCode: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | MeowCrunch Blog`,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  }
}

import { getRegion, listRegions } from "@lib/data/regions"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  const regions = await listRegions()

  if (!regions) return []

  const countryCodes = regions
    .map((r) => r.countries?.map((c) => c.iso_2))
    .flat()

  return countryCodes.flatMap((countryCode) => 
    posts.map((post) => ({
      countryCode,
      slug: post.slug,
    }))
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="bg-background-light min-h-screen">
      {/* Article Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full pb-20">
          <div className="content-container">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 mb-8">
                <LocalizedClientLink href="/" className="hover:text-primary transition-colors">Home</LocalizedClientLink>
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <LocalizedClientLink href="/blog" className="hover:text-primary transition-colors">Blog</LocalizedClientLink>
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <span className="text-primary">{post.category}</span>
              </nav>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-accent mb-6 leading-[1.1] tracking-tight text-balance">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-neutral-border text-accent font-black text-xs">
                    MC
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent">{post.author}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{post.date}</p>
                  </div>
                </div>
                
                <div className="h-8 w-px bg-neutral-border/50 hidden sm:block" />
                
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-accent text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="pb-32 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-soft border border-neutral-border/40 p-8 md:p-20 relative">
            <button className="absolute top-10 right-10 size-12 rounded-2xl bg-background-light border border-neutral-border flex items-center justify-center text-accent hover:text-primary hover:border-primary transition-all shadow-sm group">
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
            </button>

            <div className="prose-custom">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-20 pt-12 border-t border-neutral-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Share Article:</span>
                <div className="flex gap-2">
                  {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                    <button key={platform} className="px-4 py-2 rounded-xl bg-background-light border border-neutral-border text-[10px] font-black uppercase tracking-widest text-accent hover:bg-secondary transition-colors">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
              
              <LocalizedClientLink 
                href="/blog" 
                className="text-xs font-black uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-2"
              >
                &larr; Back to Blog
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Markdown Rendering */}
      <style dangerouslySetInnerHTML={{ __html: `
        .prose-custom {
          color: #4A3728;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .prose-custom h1, .prose-custom h2, .prose-custom h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #4A3728;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .prose-custom h2 { font-size: 2rem; }
        .prose-custom h3 { font-size: 1.5rem; }
        .prose-custom p { margin-bottom: 1.5rem; }
        .prose-custom ul, .prose-custom ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose-custom ul { list-style-type: disc; }
        .prose-custom ol { list-style-type: decimal; }
        .prose-custom li { margin-bottom: 0.5rem; }
        .prose-custom hr {
          border: 0;
          border-top: 1px solid #E8DED3;
          margin: 3rem 0;
        }
        .prose-custom strong { font-weight: 800; color: #4A3728; }
        .prose-custom blockquote {
          border-left: 4px solid #967E67;
          padding-left: 1.5rem;
          font-style: italic;
          margin: 2rem 0;
          color: #967E67;
        }
        .prose-custom img {
          border-radius: 2rem;
          margin: 2.5rem 0;
          box-shadow: 0 10px 40px -10px rgba(74, 55, 40, 0.08);
        }
      `}} />
    </article>
  )
}
