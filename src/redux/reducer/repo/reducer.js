import { initialState } from '../../action/repo/state'
import { actionType } from '../../action/repo/type'

export const repoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.setSearch:
            return { ...state, search: action.payload.search }
        case actionType.setRepo:
            return { ...state, repositories: [...action.payload.repositories] }
        case actionType.setLoading:
            return { ...state, loading: action.payload.loading }
        default:
            return state
    }
}
