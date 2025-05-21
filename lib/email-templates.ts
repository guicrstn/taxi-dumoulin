import fs from "fs"
import path from "path"

// Fonction pour obtenir l'URL du logo
export function getLogoUrl(): string {
  try {
    // Essayer de lire la configuration du logo
    const configPath = path.join(process.cwd(), "config", "logo-config.json")

    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, "utf-8")
      const config = JSON.parse(configData)

      // Utiliser l'URL absolue si elle existe, sinon utiliser l'URL relative
      if (config.absoluteLogoUrl && config.absoluteLogoUrl.trim() !== "") {
        return config.absoluteLogoUrl
      }
    }

    // Fallback: utiliser l'URL relative par défaut
    return "https://taxi-dumoulin.com/logo.JPG"
  } catch (error) {
    console.error("Erreur lors de la récupération de l'URL du logo:", error)
    return "https://taxi-dumoulin.com/logo.JPG"
  }
}

// Fonction pour créer un template d'email
export function createEmailTemplate({ title, content }: { title: string; content: string }): string {
  // Obtenir l'URL du logo
  const logoUrl = getLogoUrl()

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
      }
      .logo {
        max-height: 80px;
        max-width: 100%;
      }
      .content {
        padding: 20px 0;
      }
      .footer {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #eee;
        margin-top: 20px;
        color: #777;
        font-size: 14px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #1a73e8;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
      }
      .button-container {
        text-align: center;
        margin: 25px 0;
      }
      .note {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #e9ecef;
        margin-top: 15px;
        font-size: 14px;
      }
      @media only screen and (max-width: 600px) {
        .container {
          width: 100%;
          padding: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="${logoUrl}" alt="Taxi Dumoulin" class="logo" />
      </div>
      <div class="content">
        <h2>${title}</h2>
        ${content}
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Taxi Dumoulin. Tous droits réservés.
      </div>
    </div>
  </body>
  </html>
  `
}

// Template pour les emails de contact
export function createContactEmailTemplate(data: any): string {
  const content = `
    <p>Nouveau message de contact reçu :</p>
    <ul>
      <li><strong>Nom :</strong> ${data.name}</li>
      <li><strong>Email :</strong> ${data.email}</li>
      <li><strong>Téléphone :</strong> ${data.phone || "Non spécifié"}</li>
      <li><strong>Message :</strong> ${data.message}</li>
    </ul>
  `

  return createEmailTemplate({
    title: "Nouveau message de contact",
    content,
  })
}

// Template pour les emails de confirmation client
export function createClientConfirmationTemplate(data: any): string {
  const content = `
    <p>Bonjour ${data.name},</p>
    <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
    <p>Nous reviendrons vers vous dans les plus brefs délais.</p>
    <p>Voici un récapitulatif de votre message :</p>
    <ul>
      <li><strong>Message :</strong> ${data.message}</li>
    </ul>
    <p>Cordialement,</p>
    <p>L'équipe Taxi Dumoulin</p>
  `

  return createEmailTemplate({
    title: "Confirmation de votre message",
    content,
  })
}

// Template pour les emails de réservation
export function createReservationEmailTemplate(data: any): string {
  // URL fixe vers la page d'administration des réservations
  const adminUrl = "https://taxi-dumoulin.com/admin/reservations"

  const content = `
    <p>Nouvelle réservation reçue :</p>
    <ul>
      <li><strong>Nom :</strong> ${data.name}</li>
      <li><strong>Email :</strong> ${data.email || "Non fourni"}</li>
      <li><strong>Téléphone :</strong> ${data.phone}</li>
      <li><strong>Date :</strong> ${data.date || "Non spécifié"}</li>
      <li><strong>Adresse de prise en charge :</strong> ${data.pickup}</li>
      <li><strong>Destination :</strong> ${data.destination || data.dropoff}</li>
      <li><strong>Nombre de passagers :</strong> ${data.passengers || "Non spécifié"}</li>
      ${data.message ? `<li><strong>Message :</strong> ${data.message}</li>` : ""}
    </ul>
    <p><strong>ID de réservation:</strong> ${data.id}</p>
    
    <div class="button-container">
      <a href="${adminUrl}" class="button">MES DEMANDES</a>
    </div>
    
    <div class="note">
      <p><strong>Note:</strong> Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur:</p>
      <p>${adminUrl}</p>
    </div>
  `

  return createEmailTemplate({
    title: "Nouvelle demande de réservation",
    content,
  })
}

// Template pour les emails de confirmation de réservation client
export function createClientReservationTemplate(data: any, baseUrl = ""): string {
  const content = `
    <p>Bonjour ${data.name},</p>
    <p>Nous avons bien reçu votre demande de réservation et nous vous remercions de votre confiance.</p>
    <p>Voici un récapitulatif de votre réservation :</p>
    <ul>
      <li><strong>Date :</strong> ${data.date || "Non spécifié"}</li>
      <li><strong>Adresse de prise en charge :</strong> ${data.pickup}</li>
      <li><strong>Destination :</strong> ${data.destination || data.dropoff}</li>
      <li><strong>Nombre de passagers :</strong> ${data.passengers || "Non spécifié"}</li>
    </ul>
    <p>Nous traiterons votre demande dans les plus brefs délais et vous enverrons une confirmation.</p>
    <p>Si vous souhaitez modifier ou annuler votre réservation, veuillez nous contacter par téléphone au 04 74 75 10 78.</p>
    <p>Cordialement,</p>
    <p>L'équipe Taxi Dumoulin</p>
  `

  return createEmailTemplate({
    title: "Confirmation de votre demande de réservation",
    content,
  })
}

// Template pour les emails d'acceptation de réservation
export function createReservationAcceptedTemplate(data: any): string {
  const content = `
    <p>Bonjour ${data.name},</p>
    <p>Nous avons le plaisir de vous confirmer que votre réservation a été <strong style="color: #28a745;">acceptée</strong>.</p>
    <p>Voici un récapitulatif de votre réservation :</p>
    <ul>
      <li><strong>Date :</strong> ${data.date || "Non spécifié"}</li>
      <li><strong>Adresse de prise en charge :</strong> ${data.pickup}</li>
      <li><strong>Destination :</strong> ${data.dropoff}</li>
      ${data.passengers ? `<li><strong>Nombre de passagers :</strong> ${data.passengers}</li>` : ""}
      ${data.adminNotes ? `<li><strong>Note du chauffeur :</strong> ${data.adminNotes}</li>` : ""}
    </ul>
    <p>Votre chauffeur sera à l'adresse indiquée à l'heure convenue.</p>
    <p>Si vous avez des questions ou si vous souhaitez modifier votre réservation, n'hésitez pas à nous contacter au 04 74 75 10 78.</p>
    <p>Cordialement,</p>
    <p>L'équipe Taxi Dumoulin</p>
  `

  return createEmailTemplate({
    title: "Confirmation de votre réservation",
    content,
  })
}

// Template pour les emails de refus de réservation
export function createReservationRejectedTemplate(data: any): string {
  const content = `
    <p>Bonjour ${data.name},</p>
    <p>Nous sommes désolés de vous informer que nous ne pouvons pas accepter votre réservation pour le moment.</p>
    <p>Voici un rappel de votre demande :</p>
    <ul>
      <li><strong>Date :</strong> ${data.date || "Non spécifié"}</li>
      <li><strong>Adresse de prise en charge :</strong> ${data.pickup}</li>
      <li><strong>Destination :</strong> ${data.dropoff}</li>
      ${data.adminNotes ? `<li><strong>Message du chauffeur :</strong> ${data.adminNotes}</li>` : ""}
    </ul>
    <p>N'hésitez pas à nous contacter au 04 74 75 10 78 pour plus d'informations ou pour trouver une alternative.</p>
    <p>Nous vous prions de nous excuser pour ce désagrément et espérons pouvoir vous servir dans le futur.</p>
    <p>Cordialement,</p>
    <p>L'équipe Taxi Dumoulin</p>
  `

  return createEmailTemplate({
    title: "Information concernant votre réservation",
    content,
  })
}
