"use client"

import { useState, useEffect } from "react"

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setScreenWidth(width)

      // Mobile: < 768px
      // Tablet: 768px - 1024px
      // Desktop: > 1024px
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }

    // Check on mount
    checkDevice()

    // Add event listener for resize
    window.addEventListener("resize", checkDevice)

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    isMobileOrTablet: isMobile || isTablet,
  }
}
