// --- SHOPIFY CONFIG (El Motor de Ventas) ---
const SHOPIFY_DOMAIN = "theten-backend-dev.myshopify.com"; 
const SHOPIFY_TOKEN = "[REDACTED_SHOPIFY_TOKEN]"; // Tu token real

// Función base para hablar con Shopify (La API Storefront)
export async function shopifyFetch(query) {
    const URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN
        },
        body: JSON.stringify({ query })
    };

    try {
        const response = await fetch(URL, options);
        const data = await response.json();
        if (!response.ok) throw new Error("Error conectando con Shopify");
        return data.data;
    } catch (error) {
        console.error("Error Shopify:", error);
        return null;
    }
}

// Función para traer productos reales (Adaptada para usar Variant ID)
export async function fetchProducts() {
    const query = `
    {
      products(first: 10) {
        edges {
          node {
            title
            description
            variants(first: 1) {
              edges {
                node {
                  id 
                  price { amount currencyCode }
                }
              }
            }
            images(first: 1) {
              edges {
                node { url }
              }
            }
          }
        }
      }
    }`;

    const response = await shopifyFetch(query);
    if (!response || !response.products) return [];

    // Convertir formato Shopify al formato de nuestra App
    // NOTA: Importamos ShoppingBag en el componente que lo use, aquí devolvemos solo datos o strings
    return response.products.edges.map(edge => {
        const p = edge.node;
        const variant = p.variants.edges[0]?.node;
        const price = variant?.price.amount || "0";
        const image = p.images.edges[0]?.node.url || "";
        
        return {
            id: variant?.id, // ID de la variante para el checkout
            name: p.title,
            price: parseFloat(price),
            description: p.description || "Producto exclusivo de The Ten.",
            category: "Shopify Drop", 
            iconName: "ShoppingBag", // Pasamos el nombre del icono como string para procesarlo luego
            color: "bg-stone-100", 
            image: image, 
            keywords: ["shop", "store"]
        };
    });
}

// Función para generar el enlace de pago (Checkout)
export async function createCheckout(cartItems) {
    if (cartItems.length === 0) return;

    console.log("Iniciando checkout con:", cartItems);

    // 1. Preparamos los productos para Shopify (Line Items)
    // Filtramos solo los que tienen un ID de Shopify (empiezan por gid://)
    const lineItems = cartItems
        .filter(item => item.id && typeof item.id === 'string' && item.id.includes('shopify'))
        .map(item => {
            return `{ variantId: "${item.id}", quantity: 1 }`;
        });

    if (lineItems.length === 0) {
        alert("Tu carrito solo tiene items digitales gratuitos o inválidos. No hace falta pasar por caja de Shopify.");
        return;
    }

    // 2. La petición GraphQL para crear el checkout
    const query = `
        mutation {
            checkoutCreate(input: {
                lineItems: [${lineItems.join(',')}]
            }) {
                checkout {
                    webUrl
                }
                checkoutUserErrors {
                    message
                }
            }
        }
    `;

    // 3. Enviamos y redirigimos
    const data = await shopifyFetch(query);
    
    if (data && data.checkoutCreate && data.checkoutCreate.checkout) {
        // ¡Éxito! Redirigimos al usuario a la página de pago de Shopify
        window.location.href = data.checkoutCreate.checkout.webUrl;
    } else {
        console.error("Error checkout:", data);
        alert("Error creando el pedido. Mira la consola.");
    }
}