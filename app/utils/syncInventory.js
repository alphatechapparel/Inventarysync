// app/utils/syncInventory.js
import axios from 'axios';
import { getInventoryItemId } from './shopifyUtils';

const shopifyBaseURL = `https://alphatechapparel.myshopify.com/admin/api/2023-04`;

async function setInventoryAvailable(sku, locationId, availableQuantity) {
  try {
    // Step 1: Get inventory item ID
    const inventoryItemId = await getInventoryItemId(sku);
    console.log("🧾 Inventory Item ID:", inventoryItemId);

    // Step 2: Connect inventory item to location if necessary
    await axios.post(`${shopifyBaseURL}/inventory_levels/connect.json`, {
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      relocate_if_necessary: true
    }, {
      headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
      }
    });

    console.log(`🔗 Connected inventory item ${inventoryItemId} to location ${locationId}`);

    // Step 3: Set inventory available
    console.log(`Attempting to set available to ${availableQuantity} for SKU ${sku} at location ${locationId}`);
    await axios.post(`${shopifyBaseURL}/inventory_levels/set.json`, {
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available: availableQuantity
    }, {
      headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Set available to ${availableQuantity} for SKU ${sku} at location ${locationId}`);
  } catch (err) {
    console.error("❌ Inventory set failed:", err.response?.data || err.message);
    throw err;
  }
}

export default setInventoryAvailable;
