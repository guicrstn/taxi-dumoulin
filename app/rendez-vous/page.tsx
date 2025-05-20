import ReservationForm from "@/components/reservation-form"

export default function RendezVousPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Réservez votre taxi</h1>
          <p className="text-gray-600">
            Remplissez le formulaire ci-dessous pour réserver un taxi. Nous vous contacterons rapidement pour confirmer
            votre réservation.
          </p>
        </div>

        <ReservationForm />
      </div>
    </div>
  )
}
