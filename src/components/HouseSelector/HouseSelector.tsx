"use client"
import Image from "next/image";
import { gryffindorLogo, slytherinLogo, ravenclawLogo, hufflepuffLogo } from "../../assets/images";
import { useMediaQuery } from 'react-responsive'
import useLocalStorage from "use-local-storage";

interface HouseSelectorProps{
  selectedHouse: string,
}

export function HouseSelector({ selectedHouse }: HouseSelectorProps) {
  const [ preferredTheme, setPreferredTheme] = useLocalStorage('preferredTheme', '')
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px'})

  const changeTheme = (selectedHouse: string) => {
    if (setPreferredTheme) setPreferredTheme(selectedHouse)
  }

  return (
    <button 
      data-theme={selectedHouse}
      onClick={() => changeTheme(selectedHouse)}
      className={`
        px-3 py-1 flex items-center gap-2 border-2 border-contrast rounded-full 
        hover:bg-darker transition-colors
        ${preferredTheme === selectedHouse ? 'bg-darker' : 'bg-primary'
      }
      `}
    >
      <Image
        src={
          selectedHouse === 'gryffindor' ? gryffindorLogo
          : selectedHouse === 'slytherin' ? slytherinLogo
          : selectedHouse === 'ravenclaw' ? ravenclawLogo
          : hufflepuffLogo
        }
        width={40}
        alt='Gryffindor house crest'
      />
      {!isMobileOrTablet &&
        <div className="text-xl capitalize font-bold text-contrast">
          {selectedHouse}
        </div>
      }
    </button>
  )
}