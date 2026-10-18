import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.product_id === product.product_id);
          if (exists) {
            return { items: state.items.filter((item) => item.product_id !== product.product_id) };
          }
          return { items: [...state.items, product] };
        });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.product_id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
