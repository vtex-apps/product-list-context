# VTEX Product List Context app

This app is the Product List Context that should be used to store certain products. Example of usage: This is used on the `Shelf` app to store the visible products.

## API

`ProductListProvider`: Context provider that should be used to wrap your components that will use the hooks below.
`useProductListState`: Hook that returns the state of the `ProductListStateContext`.
Type of the State:

```
interface State {
  visibleProducts: any[]
}
```

`useProductListDispatch`: Hook that returns the dispatch function that changes the state above.
Type of ReducerActions:

```
type ReducerActions =
  | { type: 'ADD_VISIBLE_PRODUCT'; args: { product: any } }
  | { type: 'RESET_VISIBLE_PRODUCTS' }
```

## Usage

```
import {
  ProductListProvider,
  useProductListState,
  useProductListDispatch,
} from 'vtex.product-list-context/ProductListContext'

...
const { products } = useProductListState()
const dispatch = useProductListDispatch()

return (
  <ProductListProvider>
    <MyComponent />
  </ ProductListProvider>
)
```
