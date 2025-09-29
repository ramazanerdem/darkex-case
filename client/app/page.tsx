import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="h-full flex items-center justify-center ">
      <div className="px-6 bg-gradient-to-b from-indigo-950/60 via-black/10 to-purple-800/20 h-full w-full flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl text-center mt-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-sm text-primary font-medium">
              New: Advanced AI Trading Bots
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 pb-2 bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
            The New Era of
            <span className="text-gradient block">Crypto Trading</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet our AI-powered crypto trading platform. Maximize your potential
            profits with advanced algorithms and real-time market analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button size="lg" className="glow-green text-lg px-8 py-6">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
