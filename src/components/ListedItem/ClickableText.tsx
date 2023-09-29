"use client"

interface ClickableTextProps {
  text: string,
  characterInfo: string
}

export function ListedItem({text, characterInfo }: ClickableTextProps) {

  return (
    <li>
      <span className="font-semibold">{text}: </span>{characterInfo}
    </li>
  )
}