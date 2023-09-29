import { HouseSelector } from "./components/HouseSelector"

export function Header() {
  return (
    <header className='bg-background static'>
      <div className='p-4 m-auto max-w-7xl flex flex-wrap justify-evenly gap-4 border-b-2 border-primary sm:ml-48 lg:ml-60 lg:gap-8'>
        <HouseSelector selectedHouse={'gryffindor'} />
        <HouseSelector selectedHouse={'slytherin'} />
        <HouseSelector selectedHouse={'ravenclaw'} />
        <HouseSelector selectedHouse={'hufflepuff'} />
      </div>
    </header>
  )
}