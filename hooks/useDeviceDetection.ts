"use client"

import { useState, useEffect } from "react"

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(true)
  const [screenSize, setScreenSize] = useState<string>("mobile")

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent

      // Check if it's a mobile device
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isMobileWidth = width <= 1024

      setIsMobile(isMobileDevice || isMobileWidth)

      // Set screen size category
      if (width <= 374) {
        setScreenSize("xs")
      } else if (width <= 389) {
        setScreenSize("sm")
      } else if (width <= 427) {
        setScreenSize("md")
      } else if (width <= 479) {
        setScreenSize("lg")
      } else if (width <= 767) {
        setScreenSize("xl")
      } else if (width <= 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return {
    isMobile,
    screenSize,
    isXS: screenSize === "xs",
    isSM: screenSize === "sm",
    isMD: screenSize === "md",
    isLG: screenSize === "lg",
    isXL: screenSize === "xl",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
  }
}
