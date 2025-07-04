"use client"

import { useState, useEffect } from "react"

export function useDeviceDetection() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsMobile(width <= 767)
      setIsMobileOrTablet(width <= 1024)
    }

    // Initial check
    updateScreenInfo()

    // Listen for resize events
    window.addEventListener("resize", updateScreenInfo)
    window.addEventListener("orientationchange", updateScreenInfo)

    return () => {
      window.removeEventListener("resize", updateScreenInfo)
      window.removeEventListener("orientationchange", updateScreenInfo)
    }
  }, [])

  return {
    screenWidth,
    isMobile,
    isMobileOrTablet,
  }
}
