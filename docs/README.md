📢 Use this project, [contribute](https://github.com/vtex-apps/breadcrumb) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product List Context

The Product List Context is an app responsible for fetch product data and then provide it to some store product blocks, such as the Shelf.

⚠️ This app is not rendered and should only be used to provide product data to specific store blocks.

## Configuration

Import the `product-list-context` app to your theme's dependencies in the manifest.json, for example:

```tsx
"dependecies": {
  "vtex.product-list-context": "0.x"
}
```

By adding this app to your dependecies you will have access to `ProductListProvider`, `useProductListState`, `ProductListStateContext`, which you can use as it follows:

**ProductListProvider:**

```tsx
import { ProductListProvider } from 'vtex.product-list-context/ProductListContext'

return (
  <ProductListProvider>
    <MyComponent />
  </ProductListProvider>
)
```

**useProductListState:**

```tsx
import { useProductListState } from 'vtex.product-list-context/ProductListContext'

const { visibleProducts } = useProductListState()
```

**useProductListDispatch:**

```tsx
import { useProductListDispatch } from 'vtex.product-list-context/ProductListContext'

const dispatch = useProductListDispatch()
```

## Modus Operandi

`ProductListProvider`: Used to wrap a component with the contexts provided by this app, which can be accessed through the `useProductListState` and `useProductListDispatch` hooks.

`useProductListState`: Hook that returns the state within the `ProductListStateContext` which contains the `visibleProducts` property that has the type `any[]` and is to be used to store visible products.

`useProductListDispatch`: Hook that returns the dispatch function that is used to change the state above. There are two types of actions available for the dispatch:

- `ADD_VISIBLE_PRODUCT`: Adds an array of products to the `visibleProducts` property of the state.
- `RESET_VISIBLE_PRODUCTS`: Empties the `visibleProducts` property of the state.
