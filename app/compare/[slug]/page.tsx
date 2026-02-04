import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '../../../lib/content'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('comparison')
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('comparison', slug)
  
  if (!post) {
    return {
      title: 'Comparison Not Found | CardioGuard'
    }
  }

  return {
    title: `${post.title} | CardioGuard`,
    description: post.description,
    alternates: {
      canonical: `https://cardioguard.com/compare/${slug}`
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://cardioguard.com/compare/${slug}`
    }
  }
}

function JsonLd({ post }: { post: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: 'CardioGuard'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CardioGuard'
    },
    datePublished: post.date || new Date().toISOString()
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('comparison', slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd post={post} />
      
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-primary hover:text-primaryLight text-sm font-medium mb-4 inline-block">
            ← Back to CardioGuard
          </Link>
          <h1 className="text-3xl font-semibold text-textPrimary mb-4">{post.title}</h1>
          {post.date && (
            <time className="text-textMuted">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-textSecondary mb-4">
            Ready to access advanced cardiovascular testing without insurance barriers?
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primaryLight transition-colors"
          >
            Join Early Access Waitlist
          </Link>
        </div>
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