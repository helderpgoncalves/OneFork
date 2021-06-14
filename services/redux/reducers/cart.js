import { ADDCART, CLRCART, REMCART } from "../consts";

const initialState = {
  addIds: [],
  cart: [],
  valorTotal: 0,
};

function addCart(product, state) {
  var result = { ...state };
  var ixProd = result.addIds.indexOf(product.id);
  if (ixProd < 0) {
    //PRODUTO NÃO EXISTE NO CARRINHO
    result.addIds.push(product.id);
    result.cart.push(product);
  } else {
    //PRODUTO JÁ EXISTE NO CARRINHO
    result.cart[ixProd].quantidade += product.quantidade;
    result.cart[ixProd].total += product.quantidade * product.preco;
  }
  result.valorTotal += product.preco * product.quantidade;
  return result;
}

function remCart(id, state) {
  var result = { ...state };
  var ixProd = result.addIds.indexOf(id);
  var item = result.cart[ixProd];
  if (ixProd >= 0) {
    result.valorTotal -= item.preco * item.quantidade;
    result.cart.splice(ixProd, 1);
    result.addIds.splice(ixProd, 1);
  }
  return result;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDCART:
      return addCart(action.payload.product, state);
    case REMCART:
      return remCart(action.payload.id, state);
    case CLRCART:
      return initialState;
    default:
      return state;
  }
};
