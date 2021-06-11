import { RESULTS } from 'react-native-permissions';
import { ADDCART, REMCART } from '../consts';

const initialState = {
    addIds: [],
    cart: [],
    valorTotal: 0
}

function addCart(product, state){
    var result = {...state};
    var ixProd = state.addIds.indexOf(prodcut.id);
    if(ixProd === -1){
        //PRODUTO NÃO EXISTE NO CARRINHO
        state.addIds.push(product.id);
        state.cart.push(product);
    }else{
        //PRODUTO JÁ EXISTE NO CARRINHO
        state.cart[ixProd].quantidade += product.quantidade;
    }
    state.valorTotal += product.preco * product.quantidade;
    return result;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADDCART:
            var newCart = cart, NEWiDS;
            newCart.push(action.payload.product)
            //ATUALIZAR VALOR TOTAL
            return { 
                cart: newCart,
                valorTotal: 0
            };
        case REMCART:
            return { 
                cart: newCart,
                valorTotal: 0
            };
        default:
            return state;
    }
}

