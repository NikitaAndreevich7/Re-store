
const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null,
  },
  shopingCart: {
    cartItems: [],
    orderTotal: 0
  }
};

const updateCartItems = (cartItems, item, idx) => {

  if(item.count === 0){
    return[
        ...cartItems.slice(0, idx),
        ...cartItems.slice(idx + 1)
    ]
  }

  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (book, item = {}, quantity) => {

  const {
    id = book.id,
    count = 0,
    title = book.title,
    total = 0 } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity*book.price
  };
};

const updateOrder = (state,bookId,quantity) =>{

  const { bookList:{books},shopingCart:{cartItems} } = state;

  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];
  
  const newItem = updateCartItem(book, item,quantity);

  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
}

const updateBookList = (state, action) =>{

  switch (action.type) {
    //загрузка
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        loading: true,
        error: null
      };

    //корректно получили все эллементы
    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null
      };

    //ошибка при получении данных
    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload
      };
  }

}
const updateShopingCart = (state, action) =>{
  switch(action.type){

      //добавление эллемента в таблицу
      case 'BOOK_ADDED_TO_CART':
        return updateOrder(state,action.payload, 1);

      //удаление одного эллемента из таблицы
    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state,action.payload, -1);

      // удаление всех элементов одной категории
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shopingCart.cartItems.find(({id})=> id === action.payload);
      return updateOrder(state,action.payload, -item.count);
  }
}


const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'FETCH_BOOKS_REQUEST':
    case 'FETCH_BOOKS_SUCCESS':
    case 'FETCH_BOOKS_FAILURE':
    return{
      ...state,
      bookList: updateBookList(state, action)
    }

    case 'BOOK_ADDED_TO_CART':
    case 'BOOK_REMOVED_FROM_CART':
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      return{
        ...state,
        shopingCart: updateShopingCart(state, action)
      }

    default:
      return state;
  }
};

export default reducer;
