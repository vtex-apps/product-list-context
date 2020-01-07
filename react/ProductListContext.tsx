import React, { createContext, useContext, useReducer, FC } from 'react'

export interface State {
  toBeImpressed: any[]
  seenIds: Set<string>
}

type ReducerActions =
  | { type: 'ADD_TO_BE_IMPRESSED'; args: { product: any } }
  | { type: 'RESET_TO_BE_IMPRESSED' }

const ProductListStateContext = createContext({})
const ProductListDispatchContext = createContext({})

function productListReducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'ADD_TO_BE_IMPRESSED': {
      const { product } = action.args
      let toBeImpressed = state.toBeImpressed
      if (!state.seenIds.has(product.productId)) {
        state.seenIds.add(product.productId)
        toBeImpressed = state.toBeImpressed.concat(product)
      }
      return {
        ...state,
        toBeImpressed,
      }
    }
    case 'RESET_TO_BE_IMPRESSED': {
      return { ...state, toBeImpressed: [] }
    }
    default: {
      throw new Error(`Unhandled action type on product-list-context`)
    }
  }
}

const initialState: State = {
  toBeImpressed: [] as any[],
  seenIds: new Set(),
}

const ProductListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(productListReducer, initialState)
  return (
    <ProductListStateContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        {children}
      </ProductListDispatchContext.Provider>
    </ProductListStateContext.Provider>
  )
}

const useProductListState = () => useContext(ProductListStateContext)

const useProductListDispatch = () => useContext(ProductListDispatchContext)

export default {
  ProductListProvider,
  useProductListState,
  useProductListDispatch,
}
