"use client"

import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface CustomScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string
  orientation?: "vertical" | "horizontal" | "both"
  scrollbarSize?: number
  scrollbarThumbClassName?: string
  scrollbarTrackClassName?: string
}

const ScrollArea = forwardRef<HTMLDivElement, CustomScrollAreaProps>(
  (
    {
      children,
      className,
      viewportClassName,
      orientation = "vertical",
      scrollbarSize = 10,
      ...props
    },
    ref,
  ) => {
    const scrollbarStyles = {
      vertical: {
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin",
      },
      horizontal: {
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "thin",
      },
      both: {
        overflow: "auto",
        scrollbarWidth: "thin",
      },
    }

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <div
          className={cn("h-full w-full", viewportClassName)}
          style={{
            ...scrollbarStyles[orientation],
            // Custom scrollbar styling for webkit browsers
            "--scrollbar-size": `${scrollbarSize}px`,
          } as unknown as React.CSSProperties}
        >
          {children}
        </div>

        <style jsx>{`
          div {
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
          }
          
          div::-webkit-scrollbar {
            width: var(--scrollbar-size);
            height: var(--scrollbar-size);
          }
          
          div::-webkit-scrollbar-track {
            background: var(--scrollbar-track, transparent);
            border-radius: 9999px;
          }
          
          div::-webkit-scrollbar-thumb {
            background-color: var(--scrollbar-thumb, rgba(0, 0, 0, 0.2));
            border-radius: 9999px;
            border: 2px solid var(--scrollbar-track, transparent);
          }
          
          div::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3);
          }
          
          /* For dark mode */
          .dark div::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
          }
          
          .dark div::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </div>
    )
  },
)

ScrollArea.displayName = "CustomScrollArea"

export { ScrollArea }

