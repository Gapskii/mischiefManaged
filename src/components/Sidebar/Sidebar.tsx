"use client"
import Image from "next/image";
import { hogwartsLogo } from "../../assets/images";
import { ClickableText } from "../ClickableText/ClickableText";
import { useMediaQuery } from 'react-responsive'


export function Sidebar() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px'})

  return <div>
    {isMobile &&
    <div className="flex-1 w-screen text-white">
        <Image className="py-6 m-auto" src={hogwartsLogo} width={80} alt='Hogwarts school crest' />
      <div className="flex flex-wrap justify-center gap-4">
        <ClickableText text={'All characters'} request={'characters'}/>
        <ClickableText text={'All students'} request={'students'}/>
        <ClickableText text={'All staff'} request={'staff'}/>
        <ClickableText text={'Students per house'} request={'favouritehousestudents'}/>
        <ClickableText text={'Favorite Characters'} request={'favoritecharacters'}/>
      </div>
    </div>

    }
    {!isMobile && 
      <aside className="w-48 -mt-24 h-screen p-6 border-r-2 border-primary lg:w-60 lg:border-r-4 text-white">
        <Image src={hogwartsLogo} width={240} alt='Hogwarts school crest' />
        <span className="text-xl py-6 mb-6 border-b border-primary block lg:text-2xl">
          Hogwarts - Mischieff Managed App
        </span>
        <div className="text-lg flex flex-col gap-2 lg:text-xl lg:gap-4">
          <ClickableText text={'All characters'} request={'characters'}/>
          <ClickableText text={'All students'} request={'students'}/>
          <ClickableText text={'All staff'} request={'staff'}/>
          <ClickableText text={'Students per house'} request={'favouritehousestudents'}/>
          <ClickableText text={'Favorite Characters'} request={'favoritecharacters'}/>
        </div>
      </aside>
    }
  </div>
}