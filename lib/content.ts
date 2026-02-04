import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface ContentItem {
  slug: string
  title: string
  description: string
  type: string
  date?: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

const typeToDirectoryMap = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

const processor = remark().use(remarkHtml)

export async function getAllPosts(type: keyof typeof typeToDirectoryMap): Promise<ContentItem[]> {
  const directory = typeToDirectoryMap[type]
  
  try {
    const files = fs.readdirSync(directory)
    
    const posts = await Promise.all(
      files
        .filter(name => name.endsWith('.md'))
        .map(async (name) => {
          const slug = name.replace(/\.md$/, '')
          return await getPostBySlug(type, slug)
        })
    )
    
    return posts
      .filter(Boolean)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    return []
  }
}

export async function getPostBySlug(type: keyof typeof typeToDirectoryMap, slug: string): Promise<ContentItem | null> {
  const directory = typeToDirectoryMap[type]
  const filePath = path.join(directory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await processor.process(content)
    const htmlContent = processedContent.toString()
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type,
      date: data.date || '',
      content: htmlContent,
      targetKeywords: data.targetKeywords || [],
      ideaName: data.ideaName || '',
      status: data.status || ''
    }
  } catch (error) {
    return null
  }
}