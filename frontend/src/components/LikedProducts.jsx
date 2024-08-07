import { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
import axios from "axios";

// Debounce function to limit the rate of search operations
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function LikedProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch liked products
    useEffect(() => {
        const fetchLikedProducts = async () => {
            try {
                const url = `${API_URL}/liked-products`;
                const data = { userId: localStorage.getItem('userId') };
                const response = await axios.post(url, data);
                if (response.data.products) {
                    setProducts(response.data.products);
                    setFilteredProducts(response.data.products);
                }
                setLoading(false);
            } catch (err) {
                setError('Server error while fetching liked products.');
                setLoading(false);
            }
        };

        fetchLikedProducts();
    }, []);

    // Handle search input with debouncing
    const debouncedSearch = useCallback(
        debounce((value) => {
            const lowercasedValue = value.toLowerCase();
            const results = products.filter(item =>
                item.pname.toLowerCase().includes(lowercasedValue) ||
                item.pdesc.toLowerCase().includes(lowercasedValue) ||
                item.category.toLowerCase().includes(lowercasedValue)
            );
            setFilteredProducts(results);
        }, 300),
        [products]
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleCategoryChange = (category) => {
        const results = products.filter(item => item.category === category);
        setFilteredProducts(results);
    };

    const handleLike = async (productId) => {
        const userId = localStorage.getItem('userId');
        const url = `${API_URL}/like-product`;
        const data = { userId, productId };

        try {
            await axios.post(url, data);
            alert('Liked.');
        } catch (err) {
            alert('Server error while liking the product.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Header search={search} handlesearch={handleSearchChange} handleClick={() => { }} />
            <Categories handleCategory={handleCategoryChange} />

            <h5>SEARCH RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts.map(item => (
                    <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="300px" height="200px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                        <p className="m-2 text-success">{item.pdesc}</p>
                    </div>
                ))}
            </div>

            <h5>ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {products.map(item => (
                    <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="300px" height="200px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                        <p className="m-2 text-success">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LikedProducts;
