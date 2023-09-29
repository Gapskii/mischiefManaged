"use client"

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { hpApi } from "../../services/api";
import { useEffect, useState } from "react"
import { CharacterProps } from "characters";
import { ClickableText } from "../../components/ClickableText/ClickableText";
import useLocalStorage from "use-local-storage";

export default function CharactersPage() {
  const [ favoriteCharacters ] = useLocalStorage<string[]>('favoriteCharacters', [])
  const [ charactersList, setCharactersList] = useState<CharacterProps[]>([]);
  const [ currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12

  useEffect(() => {

    if(favoriteCharacters.length > 0) {
      Promise.all(favoriteCharacters.map((characterId) => 
      hpApi.get(`/character/${characterId}`)
      .then(response => response.data[0])
      .catch((error) => {
        console.error('Error fetching characters:', error)
        return null
      }))
      ).then((charactersData) => {
        const validCharactersData = charactersData.filter((data: CharacterProps) => data !== null);
        setCharactersList(validCharactersData);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      })
    }

  }, [favoriteCharacters]);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage

  const charactersToDisplay = charactersList?.slice(startIndex, endIndex)


  return <main className="w-screen bg-background">
    <div className="text-white">
      <div className="py-6 text-4xl flex justify-center lg:text-6xl">
        List of Favorite Characters
      </div>
      <div className="text-2xl text-center ml-auto lg:text-4xl">
      {charactersToDisplay.map(character => (
        <div key={character.id} className="mt-1">
          <ClickableText text={character.name} request={`selectedCharacter/${character.id}`}/>
        </div>
      ))}
      <div className="mt-12 flex justify-evenly">
      <button
          className="disabled:opacity-40"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon className="h-12 w-12 text-contrast lg:h-20 lg:w-20"/>
        </button>
        <button
          className="disabled:opacity-40"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={resultsPerPage > charactersToDisplay.length}
        >
          <ArrowRightIcon className="h-12 w-12 text-contrast lg:h-20 lg:w-20"/>
        </button>
      </div>
    </div>
  </div>
</main>
}