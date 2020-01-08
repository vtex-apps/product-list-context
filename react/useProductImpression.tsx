import { useEffect, useCallback } from 'react'
import debounce from 'debounce'
import { PixelContext } from 'vtex.pixel-manager'

import productImpressionHooks, { State, Product } from './ProductListContext'
import { parseToProductImpression } from './utils/normalize'

const { useProductListDispatch, useProductListState } = productImpressionHooks

const sendImpressionEvents = (
  products: Product[],
  push: any,
  dispatch: any
) => {
  if (!products || products.length <= 0) {
    return
  }
  const parsedProducts = products.map(parseToProductImpression)
  const impressions = parsedProducts.map((product: Product, index: number) => ({
    product,
    position: index + 1,
  }))
  push({
    event: 'productImpression',
    list: 'Shelf',
    impressions,
  })
  dispatch({ type: 'CLEAR_TO_BE_SENT' })
}

const useProductImpression = () => {
  const { nextImpressions } = useProductListState() as State
  const { push } = PixelContext.usePixel()
  const dispatch = useProductListDispatch()

  const debouncedSendImpressionEvents = useCallback(
    debounce(
      (nextImpressions: Product[], push: any, dispatch: any) => {
        sendImpressionEvents(nextImpressions, push, dispatch)
      },
      1000,
      false
    ),
    []
  )

  useEffect(() => {
    debouncedSendImpressionEvents(nextImpressions, push, dispatch)
  }, [nextImpressions, debouncedSendImpressionEvents, dispatch, push])
}

export default useProductImpression
