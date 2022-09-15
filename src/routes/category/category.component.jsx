import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.select';
import { CategoryContainer, CategoryTitle } from './category.styles';


const Category = () => {
    const { category } = useParams();
    console.log('render/re-rendering component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
 
    useEffect(()=>{
        console.log('effect fired calling setProducts');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category}</CategoryTitle>
            <CategoryContainer>
             {
                products && products.map((product)=> <ProductCard key={product.id} product={product}/>)
             }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;