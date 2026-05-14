import { Metadata } from "next"
import { getBlogPosts } from "@lib/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart } from "@medusajs/icons"
import React from "react"

export const metadata: Metadata = {
  title: "Blog | MeowCrunch",
  description: "Latest news, tips, and guides for cat parents from the MeowCrunch team.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-secondary/30 border-b border-neutral-border">
        <div className="content-container flex flex-col items-center text-center">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 mb-8">
            <LocalizedClientLink href="/" className="hover:text-primary transition-colors">Home</LocalizedClientLink>
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="text-primary">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-display font-black text-accent mb-4 tracking-tight">
            The Meow Journal
          </h1>
          <p className="text-lg text-accent/80 max-w-2xl font-medium">
            Discover expert tips, heartfelt stories, and premium guides to help your cat live their best life.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-20">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <LocalizedClientLink 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft border border-neutral-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-accent border border-accent/10">
                      {post.category}
                    </span>
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/30" />
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-display font-black text-accent mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-main/80 mb-8 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-border/50">
                    <span className="text-xs font-black uppercase tracking-widest text-accent group-hover:text-primary transition-colors flex items-center gap-2">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                    <Heart className="w-5 h-5 text-accent/20 group-hover:text-primary/40 transition-colors" />
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
