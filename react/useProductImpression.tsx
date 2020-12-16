import { useEffect, useCallback } from 'react'
import debounce from 'debounce'
import { PixelContext } from 'vtex.pixel-manager'

import productImpressionHooks, { Product, Dispatch } from './ProductListContext'
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
  const { nextImpressions, listName, sentIds } = useProductListState()
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
      nextImpressions,
    })
  }, [
    nextImpressions,
    debouncedSendImpressionEvents,
    dispatch,
    push,
    listName,
    sentIds,
  ])
}

export default useProductImpression
