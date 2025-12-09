// --- SHOPIFY CONFIG ---
// Usamos import.meta.env para leer del archivo .env
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN; 
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_TOKEN;

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

// ... (El resto del archivo shopify.js con fetchProducts y createCheckout se mantiene igual)
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

    return response.products.edges.map(edge => {
        const p = edge.node;
        const variant = p.variants.edges[0]?.node;
        const price = variant?.price.amount || "0";
        const image = p.images.edges[0]?.node.url || "";
        
        return {
            id: variant?.id,
            name: p.title,
            price: parseFloat(price),
            description: p.description || "Producto exclusivo de The Ten.",
            category: "Shopify Drop", 
            iconName: "ShoppingBag",
            color: "bg-stone-100", 
            image: image, 
            keywords: ["shop", "store"]
        };
    });
}

export async function createCheckout(cartItems) {
    if (cartItems.length === 0) return;

    const lineItems = cartItems
        .filter(item => item.id && typeof item.id === 'string' && item.id.includes('shopify'))
        .map(item => {
            return `{ variantId: "${item.id}", quantity: 1 }`;
        });

    if (lineItems.length === 0) {
        alert("Tu carrito solo tiene items digitales gratuitos o inválidos.");
        return;
    }

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

    const data = await shopifyFetch(query);
    
    if (data && data.checkoutCreate && data.checkoutCreate.checkout) {
        window.location.href = data.checkoutCreate.checkout.webUrl;
    } else {
        console.error("Error checkout:", data);
        alert("Error creando el pedido.");
    }
}