import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '../../lib/content'

export const metadata: Metadata = {
  title: 'Cardiovascular Health Blog — Tips & Prevention Guides | CardioGuard',
  description: 'Expert insights on advanced cardiovascular biomarkers, heart disease prevention, and navigating insurance barriers for optimal cardiac health testing.',
  alternates: {
    canonical: 'https://cardioguard.com/blog'
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-primary hover:text-primaryLight text-sm font-medium mb-4 inline-block">
            ← Back to CardioGuard
          </Link>
          <h1 className="text-3xl font-semibold text-textPrimary mb-4">Cardiovascular Health Blog</h1>
          <p className="text-textSecondary max-w-2xl">
            Expert insights on advanced cardiovascular biomarkers, heart disease prevention strategies, and navigating insurance barriers to get the cardiac testing you need for optimal health.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-textPrimary mb-4">Coming Soon</h2>
            <p className="text-textSecondary">
              We're preparing in-depth articles about cardiovascular biomarkers, advanced testing strategies, and heart disease prevention. Check back soon for expert insights.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-border rounded-lg bg-backgroundElevated p-6 hover:border-primary/50 transition-colors">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl font-semibold text-textPrimary mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-textSecondary mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  {post.date && (
                    <time className="text-sm text-textMuted">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-6">
            <Link href="/" className="text-textSecondary hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-textSecondary hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/compare" className="text-textSecondary hover:text-primary transition-colors">
              Comparisons
            </Link>
            <Link href="/faq" className="text-textSecondary hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}