import { useEffect, useCallback } from 'react'
import debounce from 'debounce'
import { PixelContext } from 'vtex.pixel-manager'

import productImpressionHooks, { State } from './ProductListContext'
import { parseToProductImpression } from './utils/normalize'

const { useProductListDispatch, useProductListState } = productImpressionHooks

const sendImpressionEvents = (products: any, push: any, dispatch: any) => {
  if (!products || products.length <= 0) {
    return
  }
  const normalizedProducts = products.map(parseToProductImpression)
  const impressions = normalizedProducts.map((product: any, index: number) => ({
    product,
    position: index + 1,
  }))
  push({
    event: 'productImpression',
    list: 'Shelf',
    impressions,
  })
  dispatch({ type: 'RESET_TO_BE_IMPRESSED' })
}

const useProductImpression = () => {
  const { toBeImpressed } = useProductListState() as State
  const { push } = PixelContext.usePixel()
  const dispatch = useProductListDispatch()

  const debouncedSendImpressionEvents = useCallback(
    debounce(
      (toBeImpressed: any, push: any, dispatch: any) => {
        sendImpressionEvents(toBeImpressed, push, dispatch)
      },
      1000,
      false
    ),
    []
  )

  useEffect(() => {
    debouncedSendImpressionEvents(toBeImpressed, push, dispatch)
  }, [toBeImpressed, debouncedSendImpressionEvents, dispatch, push])
}

export default useProductImpression
