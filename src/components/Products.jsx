import React, { useEffect, useReducer, useState } from 'react';
import axiosBase from '../api/index';

const Products = () => {
    const favoritesReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_FAVORITES':
                return [...state, action.payload];
            case 'REMOVE_FROM_FAVORITES':
                return state.filter(product => product.id !== action.payload.id);
            default:
                return state;
        }
    };

    const [products, setProducts] = useState([]);
    const [favorites, dispatch] = useReducer(favoritesReducer, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosBase.get('/products');
                setProducts(res.data.products);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const addToFavorites = (product) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    };

    const removeFromFavorites = (product) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
    };

    return (
        <div>
            <h2 className='text-2xl font-semibold'>Products</h2>
            <div className='grid grid-cols-5 gap-4 place-items-center'>
                {products?.map((product) => (
                    <div key={product.id} className='bg-[#80808055] p-3 rounded-[16px]'>
                        <img src={product.thumbnail} alt='' />
                        <h3>{product.title}</h3>
                        <div className='flex gap-x-20'>
                            <small>{product.rating}</small>
                            <small>{product.price}</small>
                        </div>
                        {favorites.some(fav => fav.id === product.id) ? (
                            <button className='bg-[white] p-[2px] w-full rounded-md' onClick={() => removeFromFavorites(product)}>
                                Dislike
                            </button>
                        ) : (
                            <button className='bg-[white] p-[2px] w-full rounded-md' onClick={() => addToFavorites(product)}>
                                Like
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <h2 className='text-2xl font-semibold mt-8'>Favorites</h2>
            <div className='grid grid-cols-5 gap-4 place-items-center'>
                {favorites.map((product) => (
                    <div key={product.id} className='bg-[#80808055] p-3 rounded-[16px]'>
                        <img src={product.thumbnail} alt='' />
                        <h3>{product.title}</h3>
                        <div className='flex gap-x-20'>
                            <small>{product.rating}</small>
                            <small>{product.price}</small>
                        </div>
                        <button className='bg-[white] p-[2px] w-full rounded-md' onClick={() => removeFromFavorites(product)}>
                            Dislike
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
