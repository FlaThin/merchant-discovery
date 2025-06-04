"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedBlobProps {
  color: string
  size: number
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  duration?: number
}

export function AnimatedBlob({ color, size, position, duration = 20 }: AnimatedBlobProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    // Animate the blob path
    const interval = setInterval(() => {
      if (pathRef.current) {
        const randomPath = generateBlobPath(size / 2)
        pathRef.current.setAttribute("d", randomPath)
      }
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [size, duration])

  return (
    <motion.div
      className="absolute"
      style={{
        ...position,
        width: size,
        height: size,
        filter: "blur(50px)",
        opacity: 0.7,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1 }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <motion.path
          ref={pathRef}
          d={generateBlobPath(size / 2)}
          fill={color}
          initial={{ scale: 0.8 }}
          animate={{
            scale: [0.8, 1.1, 0.9, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}

function generateBlobPath(radius: number) {
  const center = radius * 2
  const points = 8
  const slice = (Math.PI * 2) / points
  const randomRange = radius * 0.2 // 20% of radius for randomness

  let path = `M${center + radius} ${center}`

  for (let i = 0; i <= points; i++) {
    const angle = slice * i
    const randomRadius = radius + Math.random() * randomRange * 2 - randomRange

    const x = center + randomRadius * Math.cos(angle)
    const y = center + randomRadius * Math.sin(angle)

    if (i === 0) {
      path += `M${x} ${y}`
    } else {
      path += `L${x} ${y}`
    }
  }

  path += "Z"
  return path
}
