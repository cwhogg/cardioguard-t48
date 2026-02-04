import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const SITE_ID = process.env.SITE_ID || 'cardioguard'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmails = await redis.lrange(`email_signups:${SITE_ID}`, 0, -1)
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Store email in Redis list
    await redis.rpush(`email_signups:${SITE_ID}`, email)
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`)

    // Store timestamp for analytics
    await redis.hset(`email_signup_meta:${email}`, {
      timestamp: Date.now(),
      site: SITE_ID,
      ip: request.ip || 'unknown'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}