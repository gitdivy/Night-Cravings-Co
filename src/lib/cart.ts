import { MenuItem, Combo } from '../data';

export function getCartTotal(cart: Record<string, number>, currentMenuItems: MenuItem[], currentCombos: Combo[]) {
  let total = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const item = currentMenuItems.find(i => i.id === id);
    if (item) {
      total += item.price * qty;
    } else {
      // check combos
      const combo = currentCombos.find(c => c.id === id);
      if (combo) {
        total += combo.price * qty;
      }
    }
  }
  return total;
}

export function getCartItemsDetails(cart: Record<string, number>, currentMenuItems: MenuItem[], currentCombos: Combo[]) {
  const details = [];
  for (const [id, qty] of Object.entries(cart)) {
    const item = currentMenuItems.find(i => i.id === id);
    if (item) {
      details.push({ id, name: item.name, price: item.price, quantity: qty, image: item.image });
    } else {
      const combo = currentCombos.find(c => c.id === id);
      if (combo) {
        details.push({ id, name: `${combo.name} Combo`, price: combo.price, quantity: qty, image: combo.image });
      }
    }
  }
  return details;
}
