📢 Use this project, contribute to it or open issues to help evolve it using Store Discussion.

# Product List Context

The Product List Context is responsible for storing product data from an app and then providing it to specific store product components, such as the Shelf.

⚠️ This app is not rendered and should only be used to provide product data to specific store blocks.

## Configuration

Add the `product-list-context` app to the app's dependencies list (in the `manifest.json`) from which you want fetch product data. For example:

```json
"dependencies": {
  "vtex.product-list-context": "0.x"
}
```

In the app's files, use the `ProductListProvider` to initialise the context. You'll need to wrap the file's rendered component with the provider in order for its children to have access to the context's data. For example:

```tsx
return (
  <div ref={ref} className={`${handles.container} pv4 pb9`}>
    <ProductListProvider>
      <ProductList {...productListProps} />
    </ProductListProvider>
  </div>
)
```

The Product List Context state is comprised of a object with a single property: `visibleProducts`.

You can use two Hooks to handle the data contained in the Product List Context object: 'useProductListState' and 'useProductListDispatch'.

`useProductListState`: used to get the data stored in the context. In order to use it, you need to first import and then call the hook anywhere in any file under the component which is wrapped by ProductListProvider. For example:

```tsx
import { useProductListState } from 'vtex.product-list-context/ProductListContext'
const { visibleProducts } = useProductListState()
```

`useProductListDispatch`: returns a dispatch function that is used to change the context state. Notice that you should only import and declare this hook if you wish to change data that's stored in the context.

```tsx
import { useProductListDispatch } from 'vtex.product-list-context/ProductListContext'
const dispatch = useProductListDispatch()
```

Starting from the dispatch function, you can add new values to the `visibleProducts` array (ADD_VISIBLE_PRODUCT) or clear all current existing object values (RESET_VISIBLE_PRODUCTS). For example:

```tsx
const dispatch = useProductListDispatch()  useEffect(() => {
  if (inView) {
    dispatch({ type: 'ADD_VISIBLE_PRODUCT', args: { product: product }})
  }
}, [inView])
```
