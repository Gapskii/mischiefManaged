"use client"
import { hogwartsLogo } from "@/assets/images";
import { ListedItem } from "@/components/ListedItem/ClickableText";
import { hpApi } from "@/services/api";
import { CharacterProps } from "characters";
import Image from "next/image";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const DefaultCharacter:  CharacterProps = {
  actor: 'N/A',
  alive: false,
  ancestry: 'N/A',
  house: 'N/A',
  id: 'N/A',
  image: '',
  name: 'N/A',
  patronus: 'N/A',
  wand: {
    wood: 'N/A',
    core: 'N/A',
    length: 0
  },
  yearOfBirth: 1900
}


export default function SelectedCharacterPage({ params }: { params: { id: string } }) {
  const [ selectedCharacter, setSelectedCharacter ] = useState<CharacterProps>(DefaultCharacter)
  const [ favoriteCharacters, setFavoriteCharacters] = useLocalStorage<string[]>('favoriteCharacters', [])

  useEffect(() => {
    hpApi.get(`/character/${params.id}`)
    .then(response => {
      setSelectedCharacter(response.data[0])
    })
    .catch((error) => {
      console.error('Error fetching characters:', error)
    })
}, [ favoriteCharacters ]);

const selectAsFavorite = (newFavorite: string) => {
  setFavoriteCharacters([...favoriteCharacters, newFavorite]);
}

const removeAsFavorite = (removedCharacter: string) => {
  const updatedFavoriteCharacters = favoriteCharacters.filter((character) => character !== removedCharacter);
  setFavoriteCharacters(updatedFavoriteCharacters);
  localStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavoriteCharacters))
}

const isCharacterFavorite = favoriteCharacters.some((character) => character === selectedCharacter.id)

  return <main className="w-screen bg-background">
    { selectedCharacter ? (
      <div className="container my-8 text-white capitalize sm:my-6 lg:mt-24">
        <div className="flex flex-col justify-evenly items-center gap-y-12 lg:flex-row">
          <div className="max-w-md md:mx-0">
            {selectedCharacter.image ? (
                <div
                  data-theme={selectedCharacter?.house.toLowerCase()}
                  className="flex flex-col text-center gap-4"
                >
                  <Image
                    src={selectedCharacter.image}
                    className="rounded-t-full border-2 border-darker"
                    width={240}
                    height={1}
                    alt="Character Name"
                  />
                  {isCharacterFavorite && <p className="text-xl -mb-11 text-contrast">Character listed as favorite!</p>}
                </div>
              ) : (
                <div data-theme={selectedCharacter?.house.toLowerCase()} className="flex flex-col text-center gap-4">
                  <Image src={hogwartsLogo} width={240} height={1} alt="Hogwarts Logo" />
                  <div className="text-lg">Character without picture</div>
                  {isCharacterFavorite && <p className="text-xl -mb-11 text-contrast">Character listed as favorite!</p>}
                </div>
              )
            }
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-semibold mb-4 sm:text-4xl">{selectedCharacter.name}</h1>
              <ul className="text-base sm:text-xl grid grid-cols-2 gap-y-2 gap-x-4">
                <ListedItem text={'House'} characterInfo={selectedCharacter.house} />
                <ListedItem text={'Status'} characterInfo={selectedCharacter.alive ? 'Alive' : 'Dead'} />
                <ListedItem text={'Year of Birth'} characterInfo={selectedCharacter.yearOfBirth?.toString()} />
                <ListedItem text={'Ancestry'} characterInfo={selectedCharacter.ancestry} />
                <ListedItem text={'Patronus'} characterInfo={selectedCharacter.patronus} />
                <ListedItem text={'Actor'} characterInfo={selectedCharacter.actor} />
                <li>
                  <span className="font-semibold">Wand: </span>
                  <ul className="text-base ml-4 mt-1">
                    <ListedItem text={'Wood'} characterInfo={selectedCharacter.wand?.wood} />
                    <ListedItem text={'Core'} characterInfo={selectedCharacter.wand?.core} />
                    <ListedItem text={'Length'} characterInfo={`${selectedCharacter.wand?.length?.toString()} cm`} />
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mx-auto mt-6">
              { isCharacterFavorite ? (
                <button 
                  data-theme={selectedCharacter?.house.toLowerCase()}
                  onClick={() => removeAsFavorite(selectedCharacter.id)}
                  className='px-3 py-1  flex items-center gap-2 border-2 border-contrast rounded-full hover:bg-darker transition-colors'
                > 
                  <div className="text-xl capitalize font-bold text-contrast">
                    Unfavorite
                  </div>     
                </button>
              ) : (
                <button 
                  data-theme={selectedCharacter?.house.toLowerCase()}
                  onClick={() => selectAsFavorite(selectedCharacter.id)}
                  className='px-3 py-1  flex items-center gap-2 border-2 border-contrast rounded-full hover:bg-darker transition-colors'
                > 
                <div className="text-xl capitalize font-bold text-contrast">
                  Favorite
                </div>     
              </button>
              )}    
            </div>
          </div>    
        </div>
      </div>      
    ) : (
      <p className="text-4xl mt-24 text-center text-white">Character Not found</p>
    )
    }
    
</main>
}
