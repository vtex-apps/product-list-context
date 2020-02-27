import { useEffect, useCallback } from 'react'
import debounce from 'debounce'
import { PixelContext } from 'vtex.pixel-manager'

import productImpressionHooks, { Product, Dispatch } from './ProductListContext'
import { parseToProductImpression } from './utils/parser'

const { useProductListDispatch, useProductListState } = productImpressionHooks

interface ImpressionParams {
  products: Product[]
  push: any
  dispatch: Dispatch
  listName?: string
}

const sendImpressionEvents = (params: ImpressionParams) => {
  const { push, products, dispatch, listName } = params

  if (!products || products.length <= 0) {
    return
  }
  const parsedProducts = products.filter(Boolean).map(parseToProductImpression)
  const impressions = parsedProducts.map((product: Product, index: number) => ({
    product,
    position: index + 1,
  }))
  push({
    event: 'productImpression',
    list: listName || 'List of products',
    impressions,
  })

  dispatch({ type: 'RESET_NEXT_IMPRESSIONS' })
}

const useProductImpression = () => {
  const { nextImpressions, listName } = useProductListState()
  const { push } = PixelContext.usePixel()
  const dispatch = useProductListDispatch()
  const debouncedSendImpressionEvents = useCallback(
    debounce(sendImpressionEvents, 1000, false),
    []
  )

  useEffect(() => {
    debouncedSendImpressionEvents({
      push,
      dispatch,
      listName,
      products: nextImpressions,
    })
  }, [nextImpressions, debouncedSendImpressionEvents, dispatch, push, listName])
}

export default useProductImpression
