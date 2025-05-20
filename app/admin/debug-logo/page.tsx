"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DebugLogo() {
  const [logoStatus, setLogoStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkLogo = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/init-logo")
      const data = await response.json()
      setLogoStatus(data)
    } catch (error) {
      console.error("Erreur lors de la vérification du logo:", error)
      setLogoStatus({ success: false, error: String(error) })
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

      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">État du Logo</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(logoStatus, null, 2)}</pre>
        )}

        <div className="mt-4">
          <Button onClick={checkLogo} disabled={loading}>
            Vérifier à nouveau
          </Button>
        </div>
      </div>

      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Test d'affichage du Logo</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-medium mb-2">Logo à la racine (/logo.png)</h3>
            <img
              src="/logo.png"
              alt="Logo à la racine"
              className="border p-2 max-w-xs"
              onError={(e) => {
                e.currentTarget.src = "/images/taxi-dumoulin-logo.png"
                e.currentTarget.title = "Logo de secours chargé"
              }}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Logo original (/images/taxi-dumoulin-logo.png)</h3>
            <img src="/images/taxi-dumoulin-logo.png" alt="Logo original" className="border p-2 max-w-xs" />
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Actions</h2>
        <div className="flex gap-2">
          <Button onClick={checkLogo} disabled={loading}>
            Vérifier le logo
          </Button>
          <Button
            onClick={async () => {
              window.open("/api/init-logo", "_blank")
            }}
          >
            Initialiser le logo
          </Button>
        </div>
      </div>
    </div>
  )
}
