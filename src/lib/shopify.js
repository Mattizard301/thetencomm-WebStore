// --- SHOPIFY CONFIG ---
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
        const result = await response.json();
        
        // Debug detallado para ver errores de Shopify
        if (result.errors) {
            console.error("🚨 Shopify API Errors:", JSON.stringify(result.errors, null, 2));
        }

        if (!response.ok) throw new Error("Error HTTP conectando con Shopify");
        return result.data;
    } catch (error) {
        console.error("Error Shopify:", error);
        return null;
    }
}

export async function fetchProducts() {
    const query = `
    {
      products(first: 20) {
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

    const data = await shopifyFetch(query);
    if (!data || !data.products) return [];

    return data.products.edges.map(edge => {
        const p = edge.node;
        const variant = p.variants.edges[0]?.node;
        const price = variant?.price.amount || "0";
        const image = p.images.edges[0]?.node.url || "";
        
        return {
            id: variant?.id, // Este ID será tipo "gid://shopify/ProductVariant/..."
            name: p.title,
            price: parseFloat(price),
            description: p.description || "",
            category: "Shopify Drop", 
            iconName: "ShoppingBag",
            color: "bg-stone-100", 
            image: image, 
            keywords: ["shop", "store"]
        };
    });
}

// --- FUNCIÓN DE CHECKOUT ACTUALIZADA (CART API) ---
// Usamos cartCreate porque checkoutCreate está deprecado
export async function createCheckout(cartItems) {
    if (cartItems.length === 0) return;

    // 1. Filtro estricto: Solo dejamos pasar IDs reales de Shopify
    const validItems = cartItems.filter(item => 
        item.id && 
        typeof item.id === 'string' && 
        item.id.startsWith('gid://')
    );

    if (validItems.length === 0) {
        alert("El carrito no contiene productos sincronizados con Shopify.");
        return;
    }

    console.log("🛒 Iniciando Cart Create con:", validItems);

    // CAMBIO CLAVE: Usamos 'merchandiseId' en lugar de 'variantId' para la Cart API
    const lineItems = validItems.map(item => {
        return `{ merchandiseId: "${item.id}", quantity: 1 }`;
    });

    // CAMBIO CLAVE: Usamos la mutación 'cartCreate'
    const query = `
        mutation {
            cartCreate(input: {
                lines: [${lineItems.join(',')}]
            }) {
                cart {
                    checkoutUrl
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    const data = await shopifyFetch(query);
    
    // Verificamos la respuesta de cartCreate
    if (data && data.cartCreate && data.cartCreate.cart) {
        console.log("✅ Checkout URL:", data.cartCreate.cart.checkoutUrl);
        window.location.href = data.cartCreate.cart.checkoutUrl;
    } else {
        console.error("❌ Error creando carrito:", data);
        if (data?.cartCreate?.userErrors?.length > 0) {
            alert("Error: " + data.cartCreate.userErrors[0].message);
        } else {
            alert("Error inesperado al conectar con Shopify.");
        }
    }
}