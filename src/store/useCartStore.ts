import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.product_id === newItem.product.product_id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.product_id === newItem.product.product_id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, newItem], isOpen: true };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.product_id !== productId
          ),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.product_id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.mrp * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
