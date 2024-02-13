
import { createContext, useReducer } from "react"




export const stateUpdate = (state, action) => {
    switch (action.type) {
        case "UPLOADING":
            return { data: action.payload }
        default:
            return state
    }
}

export const DataContext = createContext()


export const DataContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(stateUpdate, {
        data: null
    })
    console.log('this is the context provider data', state)
    return (
        <DataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}