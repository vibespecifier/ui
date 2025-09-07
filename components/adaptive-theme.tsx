"use client"

import utils from "@components/utils.module.scss"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useState } from "react"
import styles from "./adaptive-theme.module.scss"

const darkMediaQuery = "(prefers-color-scheme: dark)"

export type ThemeMode = "system" | "light" | "dark"

export function AdaptiveTheme({
  mode = "system",
  queryID = "theme",
  darkClass = "dark",
  lightClass = "light",
  children = <div className={utils.placeholder}>AdaptiveTheme</div>,
}: Readonly<{
  mode?: ThemeMode
  queryID?: string
  darkClass?: string
  lightClass?: string
  children?: ReactNode
}>) {
  const [opacity, setOpacity] = useState(0)
  const styleBinding: CSSProperties = {
    opacity,
  }

  function toggle(dark: boolean) {
    const element = document.getElementById(queryID)
    if (!element) throw new Error("element for theme mode not found")
    element.classList.toggle(darkClass, dark)
    element.classList.toggle(lightClass, !dark)
  }

  function update(mode: ThemeMode) {
    return mode === "system"
      ? toggle(window.matchMedia(darkMediaQuery).matches)
      : toggle(mode === "dark")
  }

  useEffect(() => {
    update(mode)
    setOpacity(1)
    window
      .matchMedia(darkMediaQuery)
      .addEventListener("change", () => update(mode))
  })

  return (
    <div
      id={queryID}
      style={styleBinding}
      className={`${utils.container} ${styles.themeAdapter}`}
    >
      {children}
    </div>
  )
}
