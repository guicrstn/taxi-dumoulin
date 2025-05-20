import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({
    GMAIL_USER: process.env.GMAIL_USER ? "Défini" : "Non défini",
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD
      ? "Défini (longueur: " + process.env.GMAIL_APP_PASSWORD.length + ")"
      : "Non défini",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "Défini" : "Non défini",
    NODE_ENV: process.env.NODE_ENV,
  })
}
