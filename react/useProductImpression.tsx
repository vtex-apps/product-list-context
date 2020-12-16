import { useEffect, useCallback } from 'react'
import debounce from 'debounce'
import { PixelContext } from 'vtex.pixel-manager'

import type { Product, Dispatch } from './ProductListContext'
import productImpressionHooks from './ProductListContext'
import { parseToProductImpression } from './utils/parser'

const { useProductListDispatch, useProductListState } = productImpressionHooks

interface ImpressionParams {
  nextImpressions: Array<{ product: Product; impressionIndex: number }>
  push: any
  dispatch: Dispatch
  listName?: string
}

const sendImpressionEvents = (params: ImpressionParams) => {
  const { push, nextImpressions, dispatch, listName } = params

  if (!nextImpressions || nextImpressions.length <= 0) {
    return
  }

  const impressions = nextImpressions
    .filter(Boolean)
    .map(({ product, impressionIndex }, index) => ({
      product: parseToProductImpression(product),
      position: impressionIndex ?? index,
    }))

  push({
    event: 'productImpression',
    list: listName || 'List of products',
    impressions,
  })

  dispatch({ type: 'RESET_NEXT_IMPRESSIONS' })
}

const useProductImpression = (): void => {
  const { nextImpressions, listName } = useProductListState()
  const { push } = PixelContext.usePixel()
  const dispatch = useProductListDispatch()

  // we know what we're doing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSendImpressionEvents = useCallback(
    debounce(sendImpressionEvents, 1000, false),
    []
  )

  useEffect(() => {
    debouncedSendImpressionEvents({
      push,
      dispatch,
      listName,
      nextImpressions,
    })
  }, [nextImpressions, debouncedSendImpressionEvents, dispatch, push, listName])
}

export default useProductImpression
