import create from 'zustand';

const useStore = create((set) => ({
  alertMessage: '',       setAlertMessage: (msg) => set(() => ({ alertMessage: msg })),
  settings: {},           setSettings: (data) => set(() => ({ settings: data })),
  selectedService: null,  setSelectedService: (data) => set(() =>  ({ selectedService: data })),
  cartItems: [],          addCartItem: (item, quantity) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const existingItemIndex = newCartItems.findIndex((i) => i.ean === item.ean);
                            if (existingItemIndex >= 0) {
                              newCartItems[existingItemIndex].quantity += quantity || 1;
                            } else {
                              newCartItems.push({ ean: item.ean, price: item.price, quantity: quantity || 1 });
                            }
                            return { cartItems: newCartItems };
                          }),
                          decrementCartItem: (item) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const existingItemIndex = newCartItems.findIndex((i) => i.ean === item.ean);
                            if (existingItemIndex >= 0) {
                              newCartItems[existingItemIndex].quantity -= 1;
                              if (!newCartItems[existingItemIndex].quantity) {
                                newCartItems.splice(existingItemIndex, 1);
                              }
                            }
                            return { cartItems: newCartItems };
                          }),
                          removeCartItem: (item) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const existingItemIndex = newCartItems.findIndex((i) => i.ean === item.ean);
                            if (existingItemIndex >= 0) {
                              newCartItems.splice(existingItemIndex, 1);
                            }
                            return { cartItems: newCartItems };
                          }),
}));

export const useAlertMessage = () => useStore((state) => state.alertMessage);
export const useSetAlertMessage = () => useStore((state) => state.setAlertMessage);
export const useSettings = () => useStore((state) => state.settings);
export const useSetSettings = () => useStore((state) => state.setSettings);
export const useSelectedService = () => useStore((state) => state.selectedService);
export const useSetSelectedService = () => useStore((state) => state.setSelectedService);
export const useCartItems = () => useStore((state) => state.cartItems);
export const useAddCartItem = () => useStore((state) => state.addCartItem);
export const useRemoveCartItem = () => useStore((state) => state.removeCartItem);

