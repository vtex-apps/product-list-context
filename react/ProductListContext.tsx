import React, {
  FC,
  useReducer,
  useContext,
  createContext,
  useEffect,
} from 'react'

export interface Product {
  productId: string
  [key: string]: any
}
export interface State {
  nextImpressions: Product[]
  sentIds: Set<string>
  listName?: string
}

interface SendImpressionAction {
  type: 'SEND_IMPRESSION'
  args: { product: Product }
}

interface ResetNextImpressionsAction {
  type: 'RESET_NEXT_IMPRESSIONS'
}

interface SetListNameAction {
  type: 'SET_LIST_NAME'
  args: { listName: string }
}

type ReducerActions =
  | SendImpressionAction
  | ResetNextImpressionsAction
  | SetListNameAction

export type Dispatch = (action: ReducerActions) => void

const DEFAULT_STATE: State = {
  nextImpressions: [],
  sentIds: new Set<string>(),
}

const ProductListStateContext = createContext<State>(DEFAULT_STATE)
const ProductListDispatchContext = createContext<Dispatch>(action => {
  console.error('error in dispatch ', action)
})

function productListReducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'SEND_IMPRESSION': {
      const { product } = action.args
      let nextImpressions = state.nextImpressions
      if (!state.sentIds.has(product.productId)) {
        state.sentIds.add(product.productId)
        nextImpressions = state.nextImpressions.concat(product)
      }
      return {
        ...state,
        nextImpressions,
      }
    }
    case 'RESET_NEXT_IMPRESSIONS': {
      return { ...state, nextImpressions: [] }
    }

    case 'SET_LIST_NAME':
      return {
        ...state,
        listName: action.args.listName,
      }
    default: {
      throw new Error(`Unhandled action type on product-list-context`)
    }
  }
}

const initialState: State = {
  nextImpressions: [],
  sentIds: new Set(),
}

interface ProviderProps {
  // Because of this prop you can't use the same context
  // to two different lists (if you want to differentiate both)
  listName: string
}

const ProductListProvider: FC<ProviderProps> = ({ children, listName }) => {
  const [state, dispatch] = useReducer(productListReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_LIST_NAME', args: { listName } })
  }, [listName])

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
