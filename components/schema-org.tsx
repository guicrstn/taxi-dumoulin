import Script from "next/script"

export default function SchemaOrg() {
  const baseUrl = process.env.BASE_URL || "http://5.196.29.27:3000"

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Taxi Dumoulin",
    image: `${baseUrl}/images/taxi-dumoulin-logo.png`,
    url: baseUrl,
    telephone: "0474751078",
    description:
      "Service de taxi conventionné disponible 7j/7 pour tous vos déplacements : transport médical, aéroport, gare et longue distance.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 route Genève", // Remplacez par votre adresse réelle
      addressLocality: "Nantua", // Remplacez par votre ville
      postalCode: "01130", // Remplacez par votre code postal
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.1528, // Remplacez par les coordonnées exactes
      longitude: 5.6083, // Remplacez par les coordonnées exactes
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    sameAs: [
      "https://www.facebook.com/taxidumoulin", // Remplacez par vos liens réels
      "https://www.instagram.com/taxidumoulin", // Remplacez par vos liens réels
    ],
  }

  return (
    <Script id="schema-org" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  )
}
