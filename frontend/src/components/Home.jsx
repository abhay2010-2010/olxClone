import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cproducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${API_URL}/get-products`;
                const res = await axios.get(url);
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('Server Error');
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleSearchClick = async () => {
        try {
            const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
            const res = await axios.get(url);
            setCProducts(res.data.products);
            setIsSearch(true);
        } catch (error) {
            console.error('Error during search:', error);
            alert('Server Error');
        }
    };

    const handleCategory = (value) => {
        const filteredProducts = products.filter(item => item.category === value);
        setCProducts(filteredProducts);
    };

    const handleLike = async (productId, e) => {
        e.stopPropagation();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please login first.');
            return;
        }

        try {
            const url = `${API_URL}/like-product`;
            const data = { userId, productId };
            const res = await axios.post(url, data);
            if (res.data.message) {
                alert('Liked.');
            }
        } catch (error) {
            console.error('Error liking product:', error);
            alert('Server Error');
        }
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleSearchClick} />
            <Categories handleCategory={handleCategory} />

            {isSearch && cproducts.length > 0 && (
                <h5>
                    SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            )}

            {isSearch && cproducts.length === 0 && <h5>No Results Found</h5>}

            <div className="d-flex justify-content-center flex-wrap">
                {isSearch ? (
                    cproducts.map(item => (
                        <div key={item._id} className="card m-3">
                            <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="300px" alt={item.pname} height="200px" src={`${API_URL}/${item.pimage}`} />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 text-danger">{item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    ))
                ) : (
                    products.map(item => (
                        <div key={item._id} className="card m-3" onClick={() => handleProductClick(item._id)}>
                            <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="250px" alt={item.pname} height="150px" src={`${API_URL}/${item.pimage}`} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
