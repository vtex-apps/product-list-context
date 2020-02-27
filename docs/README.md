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

| Prop name | Type | Description | Default Value |
| --- | --- | --- | --- |
| `listName` | `string` | The list that you are providing the products (e.g. `Home Shelf` or `Search Result`) | `'List of products'` |


In the app's files, use the `ProductListProvider` to initialise the context. You'll need to wrap the file's rendered component with the provider in order for its children to have access to the context's data. For example:

```tsx
return (
  <div ref={ref} className={`${handles.container} pv4 pb9`}>
    <ProductListProvider listName="Shelf">
      <ProductList {...productListProps} />
    </ProductListProvider>
  </div>
)
```

The Product List Context state is comprised of a object with the following properties: `nextImpressions`: List of products that are going to be sent on the product impression event.
`sentIds`: Set of the IDs of the products that were already impressed or are marked to be impressed.

You can use two Hooks to handle the data contained in the Product List Context object: `useProductListState` and `useProductListDispatch`.

`useProductListState`: used to get the data stored in the context. In order to use it, you need to first import and then call the hook anywhere in any file under the component which is wrapped by ProductListProvider. For example:

```tsx
import { ProductListContext } from 'vtex.product-list-context'

//...

  const { useProductListState } = ProductListContext
  const { nextImpressions } = useProductListState()
```

`useProductListDispatch`: returns a dispatch function that is used to change the context state. Notice that you should only import and declare this hook if you wish to change data that's stored in the context.

```tsx
import { ProductListContext } from 'vtex.product-list-context'

//...

  const { useProductListDispatch } = ProductListContext
  const dispatch = useProductListDispatch()
```

Starting from the dispatch function, you can add new values to the `nextImpressions` array (`SEND_IMPRESSION`) or reset this array (`RESET_NEXT_IMPRESSIONS`). For example:

```tsx
const dispatch = useProductListDispatch()  useEffect(() => {
  if (inView) {
    dispatch({ type: 'SEND_IMPRESSION', args: { product: product }})
  }
}, [inView])
```

This app also contains `useProductImpression`, which is a hook that you can call when you want to send impression events of the products in the `nextImpressions` array. For example:

```tsx
import { useProductImpression } from 'vtex.product-list-context'

//...

  useProductImpression()
```

When calling this hook, the `product-list-context` will always check if there is anything in the `nextImpressions` array. If there is, and the array doesn't change for one second, all the products in it will be impressed and the array will be reseted.
