const translations = {
    fr: {
        // index.html
        title: "Boutique Plaisir Intime",
        slogan: "Plaisir & Élégance",
        add_to_cart: "Ajouter au panier",
        cart: "Panier",
        next: "Suivant",
        free_test: "Gratuit pour le test",

        // personal-info.html
        personal_info_title: "Informations Personnelles",
        name_label: "Nom complet",
        name_placeholder: "Entrez votre nom",
        email_label: "Adresse e-mail",
        email_placeholder: "Entrez votre e-mail",
        phone_label: "Numéro de téléphone",
        phone_placeholder: "Entrez votre numéro",
        country_label: "Pays",
        country_placeholder: "Entrez votre pays",
        city_label: "Ville",
        city_placeholder: "Entrez votre ville",
        postal_code_label: "Code postal",
        postal_code_placeholder: "Entrez votre code postal",
        submit: "Suivant",

        // subscription.html
        subscription_title: "Inscription à la Livraison",
        subscription_message: "Dans le cadre de notre partenariat avec UPS Postal pour la livraison, un abonnement gratuit est requis pour toutes les commandes de jouets sexuels.",
        subscription_confirmation: "Vous recevrez une confirmation par e-mail une fois votre inscription validée.",
        delivery_label: "Livraison",
        address_label: "Adresse de livraison",
        address_placeholder: "Entrez votre adresse",
        contact_label: "Numéro de contact",
        contact_placeholder: "Entrez votre numéro",
        banking_info_label: "Informations Bancaires",
        card_number_label: "Numéro de carte (16 chiffres)",
        card_number_placeholder: "1234 5678 9012 3456",
        card_holder_label: "Nom du titulaire",
        card_holder_placeholder: "Entrez le nom",
        card_expiry_label: "Date d’expiration (MM/AA)",
        card_expiry_placeholder: "12/25",
        card_cvv_label: "CVV",
        card_cvv_placeholder: "123",
        validate: "Valider",
        loading: "Veuillez patienter, chargement en cours...",

        // code-verification.html
        verification_title: "Vérification du Code",
        verification_message: "Un code de vérification a été envoyé à votre numéro de téléphone ou à votre adresse e-mail. Veuillez entrer le code ci-dessous.",
        code_label: "Entrez le code de vérification",
        code_placeholder: "123456",

        // confirmation.html
        confirmation_title: "Confirmation de la commande",
        confirmation_message: "Votre commande a été validée avec succès ! Vous serez redirigé vers le suivi UPS..."
    },
    en: {
        // index.html
        title: "Intimate Pleasure Shop",
        slogan: "Pleasure & Elegance",
        add_to_cart: "Add to Cart",
        cart: "Cart",
        next: "Next",
        free_test: "Free for testing",

        // personal-info.html
        personal_info_title: "Personal Information",
        name_label: "Full Name",
        name_placeholder: "Enter your name",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        phone_label: "Phone Number",
        phone_placeholder: "Enter your phone number",
        country_label: "Country",
        country_placeholder: "Enter your country",
        city_label: "City",
        city_placeholder: "Enter your city",
        postal_code_label: "Postal Code",
        postal_code_placeholder: "Enter your postal code",
        submit: "Next",

        // subscription.html
        subscription_title: "Delivery Registration",
        subscription_message: "As part of our partnership with UPS Postal for delivery, a free subscription is required for all sex toy orders.",
        subscription_confirmation: "You will receive a confirmation email once your registration is validated.",
        delivery_label: "Delivery",
        address_label: "Delivery Address",
        address_placeholder: "Enter your address",
        contact_label: "Contact Number",
        contact_placeholder: "Enter your number",
        banking_info_label: "Banking Information",
        card_number_label: "Card Number (16 digits)",
        card_number_placeholder: "1234 5678 9012 3456",
        card_holder_label: "Cardholder Name",
        card_holder_placeholder: "Enter the name",
        card_expiry_label: "Expiration Date (MM/YY)",
        card_expiry_placeholder: "12/25",
        card_cvv_label: "CVV",
        card_cvv_placeholder: "123",
        validate: "Validate",
        loading: "Please wait, loading...",

        // code-verification.html
        verification_title: "Code Verification",
        verification_message: "A verification code has been sent to your phone number or email address. Please enter the code below.",
        code_label: "Enter the verification code",
        code_placeholder: "123456",

        // confirmation.html
        confirmation_title: "Order Confirmation",
        confirmation_message: "Your order has been successfully validated! You will be redirected to UPS tracking..."
    }
};

// Fonction pour appliquer la langue
function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[lang][key] || element.textContent;
    });

    // Mettre à jour les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.setAttribute('placeholder', translations[lang][key] || element.getAttribute('placeholder'));
    });
}

// Fonction pour détecter la langue via l'API ipapi
async function detectLanguage() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country; // Ex. "FR" pour la France
        const lang = country === 'FR' ? 'fr' : 'en'; // Français pour la France, anglais sinon
        setLanguage(lang);
    } catch (error) {
        console.error('Erreur lors de la détection de la langue :', error);
        setLanguage('en'); // Par défaut, anglais en cas d'erreur
    }
}