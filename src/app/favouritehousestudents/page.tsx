"use client"

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { hpApi } from "../../services/api";
import { useEffect, useState } from "react"
import { CharacterProps } from "characters";
import { ClickableText } from "../../components/ClickableText/ClickableText";
import useLocalStorage from "use-local-storage";




export default function StudentsPerHousePage() {
  const [ preferredTheme ] = useLocalStorage('preferredTheme', 'gryffindor')
  const [studentsPerHouseList, setStudentsPerHouseList] = useState<CharacterProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12

  useEffect(() => {
      hpApi.get(`/characters/house/${preferredTheme}`)
      .then(response => {
        setStudentsPerHouseList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
  }, [preferredTheme]);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage

  const studentsPerHouseToDisplay = studentsPerHouseList.slice(startIndex, endIndex)


  return <main className="w-screen bg-background">
    <div className="text-white">
      <div className="py-6 text-4xl flex justify-center lg:text-6xl">
        List of All Characters
      </div>
      <div className="text-2xl text-center ml-auto lg:text-4xl">
      {studentsPerHouseToDisplay.map(student => (
        <div key={student.id} className="mt-1">
          <ClickableText text={student.name} request={`selectedCharacter/${student.id}`}/>
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
          disabled={resultsPerPage > studentsPerHouseToDisplay.length}
        >
          <ArrowRightIcon className="h-12 w-12 text-contrast lg:h-20 lg:w-20"/>
        </button>
      </div>
    </div>
  </div>
</main>
}