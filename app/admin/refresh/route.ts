import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  try {
    // Revalider les chemins d'administration
    revalidatePath("/admin")
    revalidatePath("/admin/reservations")
    revalidatePath("/admin/clients")

    return NextResponse.json({
      success: true,
      message: "Cache invalidé avec succès",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'invalidation du cache",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
