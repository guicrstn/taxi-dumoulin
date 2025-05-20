"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function DebugEmailPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostic = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/test-email-debug")
      const data = await response.json()

      if (response.ok) {
        setResults(data)
      } else {
        setError(data.error || "Une erreur est survenue lors du diagnostic")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diagnostic des emails</h1>

      <div className="mb-6">
        <Button onClick={runDiagnostic} disabled={loading} className="mb-4">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Diagnostic en cours...
            </>
          ) : (
            "Lancer le diagnostic"
          )}
        </Button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {results && (
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Variables d'environnement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(results.environment).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                  <span className="font-medium">{key}:</span>
                  <span>{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Fichiers</h2>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Logo principal:</span>
                <span className={results.files.logoExists ? "text-green-600" : "text-red-600"}>
                  {results.files.logoExists ? "Existe" : "N'existe pas"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Logo original:</span>
                <span className={results.files.originalLogoExists ? "text-green-600" : "text-red-600"}>
                  {results.files.originalLogoExists ? "Existe" : "N'existe pas"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Copie du logo:</span>
                <span>{results.files.logoCopyResult}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Test d'email</h2>
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Résultat:</span>
              <span className={results.emailTest.includes("Succès") ? "text-green-600" : "text-red-600"}>
                {results.emailTest}
              </span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Aperçu HTML</h2>
            <div className="border p-4 rounded bg-white">
              <iframe srcDoc={results.htmlPreview} className="w-full h-96 border-0" title="Aperçu de l'email" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
