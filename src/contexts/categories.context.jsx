import { createContext, useState, useEffect } from "react";
import { getCatigoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from '../shop-data.js' bu ma'lumot firestorega yuklandi, shu sababli kerak emas

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});
    // This method was upload data to firestore only one more time 
    // useEffect(()=>{
    //     addCollectionAndDocuments('catigories', SHOP_DATA);
    // }, [])

    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCatigoriesAndDocuments();
            setcategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = {categoriesMap};
    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
}