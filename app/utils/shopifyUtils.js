// app/utils/shopifyUtils.js
import axios from 'axios';

const shopifyBaseURL = `https://alphatechapparel.myshopify.com/admin/api/2023-04`;

export async function getInventoryItemId(sku) {
  try {
    const response = await axios.get(`${shopifyBaseURL}/products.json`, {
      headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
      }
    });

    for (const product of response.data.products) {
      for (const variant of product.variants) {
        if (variant.sku === sku) {
          return variant.inventory_item_id;
        }
      }
    }

    throw new Error(`SKU ${sku} not found`);
  } catch (err) {
    throw new Error(`Failed to fetch products: ${err.response?.data?.errors || err.message}`);
  }
}
