import { ADDCART, REMCART } from '../consts';

const initialState = {
    addIds: [],
    cart: [],
    valorTotal: 0
}

function addCart(product, state){
    var result = {...state};
    var ixProd = result.addIds.indexOf(product.id);
    if(ixProd < 0){
        //PRODUTO NÃO EXISTE NO CARRINHO
        result.addIds.push(product.id);
        result.cart.push(product);
    }else{
        //PRODUTO JÁ EXISTE NO CARRINHO
        result.cart[ixProd].quantidade += product.quantidade;
    }
    result.valorTotal += product.preco * product.quantidade;
    return result;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADDCART:
            //ATUALIZAR VALOR TOTAL
            return addCart(action.payload.product, state);
        case REMCART:
            return { 
                cart: newCart,
                valorTotal: 0
            };
        default:
            return state;
    }
}

