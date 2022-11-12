import create from 'zustand';
import { nanoid } from 'nanoid';

const useStore = create((set) => ({
  alertMessage: '',       setAlertMessage: (msg) => set(() => ({ alertMessage: msg })),
  settings: {},           setSettings: (data) => set(() => ({ settings: data })),
  selectedService: null,  setSelectedService: (data) => set(() =>  ({ selectedService: data })),
  selectedServiceQuantity: 1, setSelectedServiceQuantity: (data) => set(() =>  ({ selectedServiceQuantity: data })),
  focusedCartItemId: '',  setFocusedCartItemId: (data) => set(() =>  ({ focusedCartItemId: data })),
  cartItems: [],          addCartItem: (item, quantity) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const existingItemIndex = newCartItems.findIndex((i) => i.ean === item.ean);
                            if (existingItemIndex >= 0) {
                              newCartItems[existingItemIndex].quantity += quantity || 1;
                            } else {
                              newCartItems.push({ id: nanoid(), ean: item.ean, price: item.price, quantity: quantity || 1 });
                            }
                            return { cartItems: newCartItems };
                          }),
                          decrementCartItem: (id, navigate) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const index = newCartItems.findIndex((i) => i.id === id);
                            newCartItems[index].quantity -= 1;
                            if (!newCartItems[index].quantity) {
                              newCartItems.splice(index, 1);
                              if (!newCartItems.length) {
                                navigate('/menu');
                              }
                            }
                            return { cartItems: newCartItems };
                          }),
                          incrementCartItem: (id) => set((state) =>  {
                            const newCartItems = [ ...state.cartItems ];
                            const index = newCartItems.findIndex((i) => i.id === id);
                            newCartItems[index].quantity += 1;
                            return { cartItems: newCartItems };
                          }),
                          removeCartItem: (id, navigate) => set((state) =>  {
                            console.log(navigate);
                            const newCartItems = [ ...state.cartItems ];
                            const index = newCartItems.findIndex((i) => i.id === id);
                            newCartItems.splice(index, 1);
                            if (!newCartItems.length) {
                              navigate('/menu');
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
export const useSelectedServiceQuantity = () => useStore((state) => state.selectedServiceQuantity);
export const useSetSelectedServiceQuantity = () => useStore((state) => state.setSelectedServiceQuantity);
export const useCartItems = () => useStore((state) => state.cartItems);
export const useAddCartItem = () => useStore((state) => state.addCartItem);
export const useRemoveCartItem = () => useStore((state) => state.removeCartItem);
export const useDecrementCartItem = () => useStore((state) => state.decrementCartItem);
export const useIncrementCartItem = () => useStore((state) => state.incrementCartItem);
export const useFocusedCartItemId = () => useStore((state) => state.focusedCartItemId);
export const useSetFocusedCartItemId = () => useStore((state) => state.setFocusedCartItemId);

