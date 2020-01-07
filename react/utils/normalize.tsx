import { pathOr } from 'ramda'

import { changeImageUrlSize, toHttps } from './urlHelpers'

const defaultImage = { imageUrl: '', imageLabel: '' }
const defaultReference = { Value: '' }
const defaultSeller = { commertialOffer: { Price: 0, ListPrice: 0 } }

function findAvailableProduct(item: any) {
  return item.sellers.find(
    ({ commertialOffer = {} }: { commertialOffer: any }) =>
      commertialOffer.AvailableQuantity > 0
  )
}

export function parseToProductImpression(product: any) {
  if (!product) return null
  const normalizedProduct = { ...product }
  const items = normalizedProduct.items || []
  const sku = items.find(findAvailableProduct) || items[0]
  if (sku) {
    const [seller = defaultSeller] = pathOr([], ['sellers'], sku)
    const [referenceId = defaultReference] = pathOr([], ['referenceId'], sku)
    const [image = defaultImage] = pathOr([], ['images'], sku)

    const resizedImage = changeImageUrlSize(toHttps(image.imageUrl), 500)
    const normalizedImage = { ...image, imageUrl: resizedImage }
    normalizedProduct.sku = {
      ...sku,
      seller,
      referenceId,
      image: normalizedImage,
    }
  }
  return normalizedProduct
}
