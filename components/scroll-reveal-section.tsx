"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  onlyOnScroll?: boolean
}

export default function ScrollRevealSection({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  onlyOnScroll = false,
}: ScrollRevealSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // Détecter le défilement de la page
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true)
      }
    }

    if (onlyOnScroll) {
      window.addEventListener("wheel", handleScroll, { passive: true })
    } else {
      // Si onlyOnScroll est false, considérer comme déjà scrollé
      setHasScrolled(true)
    }

    return () => {
      if (onlyOnScroll) {
        window.removeEventListener("wheel", handleScroll)
      }
    }
  }, [onlyOnScroll, hasScrolled])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ne révéler que si l'utilisateur a scrollé (ou si onlyOnScroll est false)
        if (entry.isIntersecting && hasScrolled) {
          setIsVisible(true)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, hasScrolled])

  return (
    <div ref={ref} className={className}>
      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  )
}
