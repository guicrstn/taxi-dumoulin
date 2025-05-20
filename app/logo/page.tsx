import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LogoPage() {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Test d'affichage du logo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Logo depuis /images/</h2>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
            <Image src="/images/taxi-dumoulin-logo.png" alt="Logo Taxi Dumoulin (images)" width={200} height={80} />
          </div>
          <p className="mt-4 text-gray-600">
            Chemin: <code className="bg-gray-100 px-2 py-1 rounded">/images/taxi-dumoulin-logo.png</code>
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Logo depuis la racine</h2>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
            <Image src="/logo.png" alt="Logo Taxi Dumoulin (racine)" width={200} height={80} unoptimized />
          </div>
          <p className="mt-4 text-gray-600">
            Chemin: <code className="bg-gray-100 px-2 py-1 rounded">/logo.png</code>
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/api/copy-logo">Copier le logo à la racine</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/api/test-email?to=test@example.com">Envoyer un email de test</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/api/debug-email-links">Déboguer les liens d'email</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
