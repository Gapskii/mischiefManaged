"use client"
import { ReactNode } from "react"
import useLocalStorage from "use-local-storage";

export function LayoutContext({children}:{children: ReactNode}) {
  const [ preferredTheme ] = useLocalStorage('preferredTheme', 'gryffindor')

  return (
      <div data-theme={preferredTheme} className="bg-background w-screen h-screen">
        {children}
      </div> 
  )
}
