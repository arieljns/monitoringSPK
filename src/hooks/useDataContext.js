import { useContext } from "react"
import { DataContext } from "../context/DataContext"


export const useDataContext = () => {
    const context = useContext(DataContext)

    if (!DataContext) {
        throw Error("did not receive any context in here")
    }


    return context
}