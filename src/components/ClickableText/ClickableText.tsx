"use client"
import Link from "next/link"

interface ClickableTextProps {
  text: string,
  request: string
}

export function ClickableText({text, request }: ClickableTextProps) {

  return (
    <Link
      href={`/${request}`}
      className='hover:border-b hover:-mb-[1px] border-contrast'
    >
        {text}
    </Link>
  )
}