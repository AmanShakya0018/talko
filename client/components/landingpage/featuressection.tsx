"use client"
import React from 'react'
import { ArrowRight, Check, MessageSquare, Send, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
import ChatMessage from './chatmessage'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-6 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 rounded-full bg-green-500 ring-1 ring-white dark:ring-zinc-800"
            />
            <span className="text-green-600  dark:text-green-300 text-xs lg:text-[15px]">Reimagine Communication</span>
          </motion.div>

          <motion.h2
            className="text-4xl text-zinc-900 dark:text-zinc-100 md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Features that{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                elevate
              </span>
              <svg
                className="absolute -bottom-4 w-full"
                viewBox="0 0 138 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 14.5C27.2 6.9 55.3333 3.83333 67 3.5C95.8 2.7 112.667 8.16667 118 11C123.333 13.8333 132.4 19.7 128 22.5C123.6 25.3 12.6667 22.1667 6 20.5C0.666667 19.1667 -5.6 18.5 6 14.5Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="69" y1="3.5" x2="69" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#bbf7d0" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#16a34a" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            your chat
          </motion.h2>

          <motion.p
            className="text-sm md:text-[16px] lg:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every detail is meticulously crafted to create a messaging experience that&apos;s both powerful and delightful.
          </motion.p>
        </div>

        {/* 3D Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="feature-card relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card */}
            <div className="relative h-full bg-gradient-to-b from-zinc-100/60 to-zinc-100/50 dark:from-zinc-950/60 dark:to-zinc-950/50 backdrop-blur-xl border border-zinc-400/50 dark:border-zinc-700/50 rounded-3xl p-1 overflow-hidden shadow-xl">
              <div className="absolute inset-0 overflow-hidden"></div>

              <div className="relative h-full rounded-[calc(1.5rem-4px)] p-8 overflow-hidden">
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-300/50 dark:border-zinc-700/50 rounded-full px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Real-time
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-black dark:text-white group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors duration-300">
                    Real-time Communication
                  </h3>

                  <p className="text-zinc-500 text-sm md:text-[16px] dark:text-zinc-400 mb-6 flex-grow">
                    Stay connected with instant real-time messaging, where messages are delivered seamlessly across all devices. Never miss a moment with live updates and smooth interactions.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {["Instant messaging", "User presence indicators", "Room-based chat"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button className="flex items-center gap-2 text-green-500 dark:text-green-400 font-medium group/btn">
                      <Link href={"/room"}>Join a Room</Link>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="feature-card relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card */}
            <div className="relative h-full bg-gradient-to-b from-zinc-100/60 to-zinc-100/50 dark:from-zinc-950/60 dark:to-zinc-950/50 backdrop-blur-xl border border-zinc-400/50 dark:border-zinc-700/50 rounded-3xl p-1 overflow-hidden shadow-xl">
              <div className="absolute inset-0 overflow-hidden"></div>

              <div className="relative h-full rounded-[calc(1.5rem-4px)] p-8 overflow-hidden">
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-300/50 dark:border-zinc-700/50 rounded-full px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Collaborative
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-black dark:text-white group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors duration-300">
                    Private Chat Rooms
                  </h3>

                  <p className="text-zinc-500 text-sm md:text-[16px] dark:text-zinc-400 mb-6 flex-grow">
                    Seamlessly create private rooms to chat one-on-one. Enjoy secure, real-time communication with customizable room IDs.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {["Secure private rooms", "Customizable room IDs", "Dynamic user pairing"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button className="flex items-center gap-2 text-green-500 dark:text-green-400 font-medium group/btn">
                      <Link href={"/room"} >Create your room</Link>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-500 to-teal-500 opacity-10 blur-3xl" />
          <div className="rounded-3xl border dark:border-white/10 border-black/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-black/5 dark:bg-white/5 border dark:border-white/10 border-black/10 backdrop-blur-sm">
                  <span className="text-green-500 text-sm md:text-[16px] dark:text-green-400 font-medium">✨ Seamless Experience</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Beautiful on every device</h3>
                <p className="text-sm md:text-[16px] text-zinc-500 dark:text-zinc-400 mb-8">
                  Talko adapts perfectly to any screen size, giving you the same premium experience whether you&apos;re on
                  desktop, tablet, or mobile. Stay connected wherever you go.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3 text-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-300">Responsive design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3 text-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-300">Cross-platform</span>
                  </div>
                </div>
              </div>
              <div className="relative h-96 lg:h-auto bg-gradient-to-br from-green-200/20 to-teal-200/20 dark:from-green-900/20 dark:to-teal-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-xs mx-auto">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-green-500 to-teal-500 opacity-20 blur-2xl" />
                    <div className="overflow-hidden rounded-3xl border dark:border-white/10 border-black/10 bg-white/20 dark:bg-black/20  backdrop-blur-xl shadow-2xl">
                      <div className="realtive border-b dark:border-white/10 border-black/10 bg-black/5 dark:bg-white/5 px-4 py-2 flex items-center">
                        <div className="absolute left-4 flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        <div className="mx-auto text-xs text-zinc-500 dark:text-zinc-400">Talko Mobile</div>
                      </div>
                      <div className="p-3 h-72 flex flex-col">
                        <div className="flex-1 space-y-3 overflow-y-auto pr-1 no-scrollbar">
                          <ChatMessage sender="Sarah" message="Hey! Are we still meeting today?" align="left" small />
                          <ChatMessage sender="You" message="Yes! I'll be there at 3pm." align="right" small />
                          <ChatMessage
                            sender="Sarah"
                            message="Perfect. I'll bring the presentation materials."
                            align="left"
                            small
                          />
                          <ChatMessage sender="You" message="Great, see you then!" align="right" small />
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900 px-3 py-1.5 text-xs dark:text-zinc-400 text-zinc-600">
                            Message...
                          </div>
                          <Button size="icon" className="h-7 w-7 rounded-full bg-green-600 hover:bg-green-700">
                            <Send className='text-neutral-100' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection