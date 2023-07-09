import { SignIn, SignUp, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto pt-6">
      <header>
        <h1 className="text-4xl">DV Stash Class-Room</h1>
        <p className="text-stone-500">
          Excel in your O/L Science exam with our interactive practice platform.
          Access a vast question bank, track progress and boost your confidence.
        </p>
      </header>
      <div className="mx-auto flex w-full pt-4">
        <SignIn />
        <UserButton />
      </div>
    </main>
  )
}
