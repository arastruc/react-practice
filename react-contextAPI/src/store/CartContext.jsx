import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

function addItemToCart(state, id) {
  const updatedItems = [...state.items];

  const existingCartItemIndex = updatedItems.findIndex(
    (cartItem) => cartItem.id === id
  );
  const existingCartItem = updatedItems[existingCartItemIndex];

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    const product = DUMMY_PRODUCTS.find((product) => product.id === id);
    updatedItems.push({
      id: id,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  return {
    items: updatedItems,
  };
}

function updateCartItemQuantity(state, payload) {
  const { productId, amount } = payload;

  const updatedItems = [...state.items];
  const updatedItemIndex = updatedItems.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedItems[updatedItemIndex],
  };

  updatedItem.quantity += amount;

  if (updatedItem.quantity <= 0) {
    updatedItems.splice(updatedItemIndex, 1);
  } else {
    updatedItems[updatedItemIndex] = updatedItem;
  }

  return {
    items: updatedItems,
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return addItemToCart(state, action.payload.id);

    case "UPDATE_QUANTITY":
      return updateCartItemQuantity(state, action.payload);

    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [shoppingCartState, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    dispatch({ type: "ADD_ITEM", payload: { id } });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  }

  return (
    <CartContext.Provider
      value={{
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
