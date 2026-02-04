'use client'

import { useState } from 'react'
import { JsonLd } from '@/components/content/JsonLd'

const FAQ_DATA = [
  {
    question: "What are the best markers for cardiovascular health?",
    answer: "Beyond basic cholesterol, ApoB and Lp(a) are the most predictive biomarkers for heart disease risk. ApoB measures the actual number of atherogenic particles, while Lp(a) identifies genetic cardiovascular risk that affects 20% of the population but is rarely tested."
  },
  {
    question: "Does insurance cover LP(a) and ApoB testing?",
    answer: "Most insurance plans don't cover advanced biomarkers like Lp(a) and ApoB unless you already have cardiovascular disease. This leaves prevention-focused individuals paying out-of-pocket or going without these crucial tests that cardiologists increasingly recommend."
  },
  {
    question: "What is the best indicator of cardiovascular risk?",
    answer: "Traditional cholesterol tests miss 70% of the cardiovascular risk picture. ApoB levels correlate much better with actual heart attack risk than LDL cholesterol, while Lp(a) reveals inherited risk factors that can't be managed through lifestyle alone."
  },
  {
    question: "Are advanced cardiac biomarkers worth the cost?",
    answer: "For health-conscious individuals aged 30-55, advanced biomarkers provide critical risk information that can guide prevention strategies for decades. Early detection of elevated ApoB or Lp(a) can prevent heart attacks through targeted interventions that basic cholesterol panels miss."
  }
]

interface SignupFormData {
  email: string;
}

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setEmail('')
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <JsonLd 
        type="Organization"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CardioGuard",
          "url": "https://cardioguard.com",
          "description": "Advanced cardiovascular biomarkers testing without insurance barriers"
        }}
      />
      <JsonLd 
        type="WebSite"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CardioGuard",
          "url": "https://cardioguard.com"
        }}
      />
      <JsonLd 
        type="FAQPage"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_DATA.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="px-6 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
              Advanced Cardiovascular Biomarkers <span className="text-primary">Without Insurance Barriers</span>
            </h1>
            <p className="text-xl text-textSecondary mb-8 max-w-3xl mx-auto leading-relaxed">
              Get the heart disease prevention blood tests cardiologists recommend but insurance won't cover. ApoB, Lp(a), and specialized cardiac markers with expert guidance.
            </p>
            
            {isSuccess ? (
              <div className="bg-primary/20 border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-primary font-semibold">✓ You're on the waitlist!</p>
                <p className="text-textSecondary mt-2">We'll notify you when early access opens.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-backgroundElevated border border-border rounded-lg text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Joining...' : 'Join Early Access Waitlist'}
                </button>
              </form>
            )}
            
            {error && (
              <p className="text-accent mt-4 text-sm">{error}</p>
            )}
          </div>
        </section>

        {/* Value Propositions */}
        <section aria-label="Key Benefits" className="px-6 py-16 bg-backgroundElevated">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Advanced Biomarkers Matter for Heart Health</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <article className="bg-background p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Insurance Gap Solution</h3>
                <p className="text-textSecondary leading-relaxed">
                  Access ApoB, Lp(a), and hs-CRP testing without physician orders or insurance pre-approval. No more fighting with your doctor for tests you know you need.
                </p>
              </article>
              
              <article className="bg-background p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Specialized Cardiac Risk Assessment</h3>
                <p className="text-textSecondary leading-relaxed">
                  Beyond basic cholesterol panels—get the biomarkers that actually predict cardiovascular events, with interpretation focused specifically on heart health optimization.
                </p>
              </article>
              
              <article className="bg-background p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Longitudinal Risk Tracking</h3>
                <p className="text-textSecondary leading-relaxed">
                  Monitor how your cardiac risk evolves over time with specialized tracking of advanced biomarkers and personalized recommendations for risk reduction strategies.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section aria-label="The Problem" className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Your Basic Cholesterol Test is Missing 70% of the Picture</h2>
            <p className="text-xl text-textSecondary mb-8 leading-relaxed">
              Insurance covers reactive care, but you deserve proactive prevention. ApoB levels predict heart attacks better than total cholesterol—here's why that matters for you.
            </p>
            <div className="bg-backgroundElevated p-8 rounded-lg border border-border text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-lg mb-4">What you're missing with standard lipid panels:</h3>
              <ul className="space-y-3 text-textSecondary">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-textPrimary">ApoB:</strong> Actual count of atherogenic particles causing plaque buildup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-textPrimary">Lp(a):</strong> Genetic risk factor present in 20% of people, undetected by basic tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-textPrimary">hs-CRP:</strong> Inflammatory markers indicating arterial damage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-label="Frequently Asked Questions" className="px-6 py-16 bg-backgroundElevated">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {FAQ_DATA.map((faq, index) => (
                <article key={index} className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-3 text-textPrimary">{faq.question}</h3>
                  <p className="text-textSecondary leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Don't Wait for a Heart Attack to Get the Tests You Need</h2>
            <p className="text-xl text-textSecondary mb-8">
              Join thousands of health-conscious professionals taking control of their cardiovascular future.
            </p>
            
            {!isSuccess && (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-backgroundElevated border border-border rounded-lg text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Joining...' : 'Get Early Access'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      
      <footer className="px-6 py-12 border-t border-border bg-backgroundElevated">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CardioGuard</h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                Advanced heart testing without insurance barriers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <nav className="space-y-2">
                <a href="/blog" className="block text-textSecondary hover:text-primary text-sm">Heart Health Blog</a>
                <a href="/compare" className="block text-textSecondary hover:text-primary text-sm">Test Comparisons</a>
                <a href="/faq" className="block text-textSecondary hover:text-primary text-sm">FAQ</a>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Testing</h4>
              <nav className="space-y-2">
                <a href="/apolipoprotein-b-test" className="block text-textSecondary hover:text-primary text-sm">ApoB Testing</a>
                <a href="/lipoprotein-a-test" className="block text-textSecondary hover:text-primary text-sm">Lp(a) Testing</a>
                <a href="/advanced-lipid-panel" className="block text-textSecondary hover:text-primary text-sm">Advanced Panels</a>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <nav className="space-y-2">
                <a href="/about" className="block text-textSecondary hover:text-primary text-sm">About</a>
                <a href="/privacy" className="block text-textSecondary hover:text-primary text-sm">Privacy</a>
                <a href="/contact" className="block text-textSecondary hover:text-primary text-sm">Contact</a>
              </nav>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-textMuted text-sm">
            <p>&copy; 2024 CardioGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}