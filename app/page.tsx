import Link from 'next/link';
import Logo from '@/components/Logo';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';



export default async function HomePage() {

  const user = await currentUser();
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen p-4 w-screen h-screen">
      <Logo />
      <h1 className="text-4xl font-bold mt-8">Bienvenue sur La Pince</h1>
      <p className="mt-4 text-center text-lg">
        La Pince est une application web de gestion de finances personnelles. <br/>Notre objectif est de vous aider à mieux gérer votre budget de manière simple et intuitive.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link href="/sign-up" className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105">
          S&apos;inscrire
        </Link>
        <Link href="/sign-in" className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105">
          Se connecter
        </Link>
      </div>
    </div>
  );
}