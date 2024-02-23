import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const useDataContext = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw Error("The DataContext is undefined. Make sure you are using the hook within the DataContextProvider.");
    }

    const {data, nextTab, dispatch } = context;

    const setNextTab = (value) => {
        dispatch({ type: 'SET_NEXT_TAB', payload: value });
    };

    return { ...context, nextTab, setNextTab };
};
