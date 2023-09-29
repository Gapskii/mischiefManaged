"use client"

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { hpApi } from "../../services/api";
import { useEffect, useState } from "react"
import { CharacterProps } from "characters";
import { ClickableText } from "../../components/ClickableText/ClickableText";

export default function StudentsPage() {
  const [studentsList, setStudentsList] = useState<CharacterProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12

  useEffect(() => {
      hpApi.get(`/characters/students`)
      .then(response => {
        setStudentsList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching students:', error)
      })
  }, []);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage

  const studentsToDisplay = studentsList.slice(startIndex, endIndex)


  return <main className="w-screen bg-background">
  <div className="text-white">
    <div className="py-6 text-4xl flex justify-center lg:text-6xl">
      List of All Characters
    </div>
    <div className="text-2xl text-center ml-auto lg:text-4xl">
    {studentsToDisplay.map(students => (
      <div key={students.id} className="mt-1">
        <ClickableText text={students.name} request={`selectedCharacter/${students.id}`}/>
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
        disabled={resultsPerPage > studentsToDisplay.length}
      >
        <ArrowRightIcon className="h-12 w-12 text-contrast lg:h-20 lg:w-20"/>
      </button>
    </div>
  </div>
</div>
</main>
}