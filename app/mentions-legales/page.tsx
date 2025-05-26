import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions Légales | Taxi Dumoulin",
  description: "Mentions légales du site Taxi Dumoulin - Service de taxi conventionné dans l'Ain",
  alternates: {
    canonical: "/mentions-legales",
  },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Espacement pour compenser le header fixe */}
      <div className="pt-24 md:pt-28">
        <div className="container py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Mentions Légales</h1>

            <div className="space-y-6 md:space-y-8">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  INFORMATIONS ÉDITORIALES
                </h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-2 text-sm md:text-base">
                  <p>
                    <strong>Site :</strong> www.taxi-dumoulin.com
                  </p>
                  <p>
                    <strong>Propriétaire :</strong> Taxi Dumoulin
                  </p>
                  <p>
                    <strong>Adresse du propriétaire :</strong> 7 route de Genève, 01130 NANTUA
                  </p>
                  <p>
                    <strong>N° de téléphone du propriétaire :</strong> 04.74.75.10.78
                  </p>
                  <p>
                    <strong>Email :</strong> dumoulin.taxi@orange.fr
                  </p>
                  <p>
                    <strong>Responsable de publication :</strong> Taxi Dumoulin
                  </p>
                  <p>
                    <strong>Webmaster :</strong> GC Informatik – contact@gcinformatik.fr
                  </p>
                  <p>
                    <strong>Créateur du site :</strong> GC Informatik
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">NOUS CONTACTER</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-2 text-sm md:text-base">
                  <p>Pour toute question ou demande d'information, veuillez nous contacter à :</p>
                  <p>
                    <strong>Email :</strong> dumoulin.taxi@orange.fr
                  </p>
                  <p>
                    <strong>Téléphone :</strong> 04.74.75.10.78 ou 04.74.75.02.53
                  </p>
                  <p>
                    <strong>Adresse :</strong> 7 route de Genève, 01130 NANTUA
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  PRESTATAIRE D'HÉBERGEMENT
                </h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-sm md:text-base">
                  <p>Le site www.taxi-dumoulin.com est hébergé par Coolify.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  CONDITIONS GÉNÉRALES D'UTILISATION DU SITE
                </h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-sm md:text-base">
                  <p>
                    L'utilisation du site https://taxi-dumoulin.com implique l'acceptation pleine et entière des
                    conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles
                    d'être modifiées ou complétées à tout moment.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  LIMITATIONS DE RESPONSABILITÉS
                </h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 text-sm md:text-base">
                  <p>
                    Taxi Dumoulin ne pourra être tenu responsable des dommages directs et indirects causés au matériel
                    de l'utilisateur, lors de l'accès au site https://taxi-dumoulin.com.
                  </p>
                  <p>
                    Taxi Dumoulin décline toute responsabilité quant à l'utilisation qui pourrait être faite des
                    informations et contenus présents sur https://taxi-dumoulin.com.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">
                  PROPRIÉTÉ INTELLECTUELLE
                </h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 text-sm md:text-base">
                  <p>
                    Tout le contenu du présent site, incluant, de façon non limitative, les graphismes, images, textes,
                    vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété
                    exclusive de Taxi Dumoulin à l'exception des marques, logos ou contenus appartenant à d'autres
                    sociétés partenaires ou auteurs.
                  </p>
                  <p>
                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même
                    partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de
                    Taxi Dumoulin.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">DONNÉES PERSONNELLES</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 text-sm md:text-base">
                  <p>
                    De manière générale, vous n'êtes pas tenu de nous communiquer vos données personnelles lorsque vous
                    visitez notre site Internet https://taxi-dumoulin.com.
                  </p>
                  <p>
                    Cependant, ce principe comporte certaines exceptions. En effet, pour certains services proposés par
                    notre site, vous pouvez être amenés à nous communiquer certaines données telles que : votre nom,
                    votre prénom, votre adresse électronique, et votre numéro de téléphone. Tel est le cas lorsque vous
                    remplissez le formulaire qui vous est proposé en ligne, dans les rubriques « contact » et «
                    réservation ».
                  </p>
                  <p>
                    Dans tous les cas, vous pouvez refuser de fournir vos données personnelles. Dans ce cas, vous ne
                    pourrez pas utiliser les services du site, notamment celui de solliciter des renseignements sur
                    notre société, ou de réserver un taxi.
                  </p>
                  <p>
                    Enfin, nous pouvons collecter de manière automatique certaines informations vous concernant lors
                    d'une simple navigation sur notre site Internet, notamment : des informations concernant
                    l'utilisation de notre site, comme les zones que vous visitez et les services auxquels vous accédez,
                    votre adresse IP, le type de votre navigateur, vos temps d'accès.
                  </p>
                  <p>
                    De telles informations sont utilisées exclusivement à des fins de statistiques internes, de manière
                    à améliorer la qualité des services qui vous sont proposés. Les bases de données sont protégées par
                    les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996
                    relative à la protection juridique des bases de données.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">DROIT APPLICABLE</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg text-sm md:text-base">
                  <p>
                    Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit
                    français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec
                    de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls
                    compétents pour connaître de ce litige.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary">COOKIES</h2>
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-3 md:space-y-4 text-sm md:text-base">
                  <p>
                    Le site https://taxi-dumoulin.com peut être amené à vous demander l'acceptation des cookies pour des
                    besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur
                    par le serveur du site que vous visitez.
                  </p>
                  <p>
                    Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte
                    auquel un serveur accède pour lire et enregistrer des informations. Certaines parties de ce site ne
                    peuvent être fonctionnelles sans l'acceptation de cookies.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
