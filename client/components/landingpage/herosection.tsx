"use client"
import React, { useRef } from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'
import { Button } from '../ui/button'
import ChatMessage from './chatmessage'
import { Send } from 'lucide-react'

const HeroSection = () => {
  const heroRef = useRef(null)

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center overflow-x-hidden">
        <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 items-center justify-center"
          >
            <Link href={"/about"} target='_blank' className=" no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>✨ Introducing Talko</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </Link>
          </motion.div>

          <motion.h1
            className="text-5xl text-zinc-900 dark:text-zinc-100 md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Chat that feels like{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400">
              magic
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-[15px] md:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300  max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience real-time conversations with stunning visuals and unmatched performance. Connect with anyone,
            anywhere, instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-row gap-4 justify-center md:justify-start"
          >
            <Link href="/room">
              <Button
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white no-underline flex space-x-2 group cursor-pointer relative transition duration-200 p-px hover:text-zinc-100 font-semibold px-4 py-2 h-14 items-center justify-center rounded-2xl text-center text-[16px] w-40 md:48 lg:w-52"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/about" target='_blank'>
              <Button
                size="lg"
                variant="outline"
                className="flex h-14 items-center justify-center rounded-2xl border border-transparent bg-white dark:bg-black text-sm text-black dark:text-white transition duration-200 w-40 md:48 lg:w-52 border-neutral-300 dark:border-neutral-600 text-[16px]"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-500 to-teal-500 opacity-20 blur-2xl" />
              <div className="overflow-hidden rounded-2xl border dark:border-white/10 border-black/10 bg-white/20 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
                <div className="relative border-b dark:border-white/10 border-black/10 bg-black/5 dark:bg-white/5 px-4 py-3 flex items-center">
                  <div className="absolute left-4 flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="mx-auto text-sm text-zinc-600 dark:text-zinc-400">Talko Chat</div>
                </div>
                <div className="p-4 h-96 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
                    <ChatMessage
                      sender="Sarah"
                      message="Hey team! I just pushed the new design changes."
                      align="left"
                    />
                    <ChatMessage
                      sender="Mike"
                      message="Looks amazing! The new UI is so much cleaner."
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="Thanks! I focused on simplifying the layout and making it more intuitive."
                      align="left"
                    />
                    <ChatMessage
                      sender="Aman"
                      message="Great job, Sarah! Did you also update the color scheme? It feels more vibrant."
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="Yes! I tweaked the color palette to make it feel more modern and added a subtle gradient to the header."
                      align="left"
                    />
                    <ChatMessage
                      sender="Mike"
                      message="The animations look smoother too. Did you change the transition timing?"
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="Exactly! I switched to cubic-bezier curves for a more fluid effect. Plus, I reduced the delay to keep interactions snappy."
                      align="left"
                    />
                    <ChatMessage
                      sender="Aman"
                      message="That sounds awesome! Have you tested it on mobile yet? Just want to make sure the responsiveness holds up."
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="Yep, I did a full round of mobile testing this morning. It scales well on both iOS and Android, but I’m still fine-tuning the touch targets."
                      align="left"
                    />
                    <ChatMessage
                      sender="Mike"
                      message="Nice, I’ll run some more tests on different devices later today. Let me know if you need any help with QA."
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="That would be great! I should have it ready by tomorrow afternoon. I'll send you all a preview link once it’s polished."
                      align="left"
                    />
                    <ChatMessage
                      sender="Aman"
                      message="Sounds good! Can’t wait to see it in action. Your attention to detail is impressive as always!"
                      align="right"
                    />
                    <ChatMessage
                      sender="Sarah"
                      message="Thanks, Aman! I appreciate the support. Looking forward to your feedback once it’s live!"
                      align="left"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900 px-4 py-2 text-sm dark:text-zinc-400 text-zinc-600">
                      Type a message...
                    </div>
                    <Button size="icon" className="rounded-full bg-green-600 hover:bg-green-700">
                      <Send className='text-neutral-100' />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-green-600 opacity-20 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-teal-600 opacity-20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute -top-6 -left-0 h-40 w-40 rounded-full bg-teal-600 opacity-20 blur-2xl" />
      <div className="absolute -bottom-6 -right-0 h-40 w-40 rounded-full bg-green-600 opacity-20 blur-2xl" />
    </section>
  )
}

export default HeroSection