"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DebugLogoPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [logoExists, setLogoExists] = useState(false)

  const checkLogo = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ensure-logo")
      const data = await response.json()
      setStatus(data)
      setLogoExists(data.success)
    } catch (error) {
      setStatus({ error: "Erreur lors de la vérification du logo" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkLogo()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diagnostic du Logo</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">État actuel</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="whitespace-pre-wrap">{JSON.stringify(status, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test d'affichage</h2>
        <div className="bg-white p-4 border rounded-md flex flex-col items-center">
          <p className="mb-2">Logo principal (/logo.png):</p>
          <img
            src="/logo.png"
            alt="Logo principal"
            className="max-w-[200px] h-auto mb-4"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              setLogoExists(false)
            }}
            onLoad={() => setLogoExists(true)}
          />

          {!logoExists && (
            <>
              <p className="text-red-500 mb-2">Logo principal non trouvé. Affichage du logo de secours:</p>
              <img src="/images/taxi-dumoulin-logo.png" alt="Logo de secours" className="max-w-[200px] h-auto" />
            </>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={checkLogo} disabled={loading}>
          {loading ? "Vérification..." : "Vérifier le logo"}
        </Button>
        <Button onClick={() => window.open("/api/ensure-logo", "_blank")} variant="outline">
          Exécuter ensure-logo
        </Button>
        <Button onClick={() => window.open("/api/test-email-with-logo", "_blank")} variant="outline">
          Tester l'email avec logo
        </Button>
      </div>
    </div>
  )
}
