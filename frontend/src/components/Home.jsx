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
                const { data } = await axios.get(`${API_URL}/get-products`);
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('Error fetching products. Please try again later.');
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
            const { data } = await axios.get(url);
            setCProducts(data.products || []);
            setIsSearch(true);
        } catch (error) {
            console.error('Error during search:', error);
            alert('Error during search. Please try again later.');
        }
    };

    const handleCategory = (value) => {
        setCProducts(products.filter(item => item.category === value));
    };

    const handleLike = async (productId, e) => {
        e.stopPropagation();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please log in to like products.');
            return;
        }

        try {
            await axios.post(`${API_URL}/like-product`, { userId, productId });
            alert('Product liked.');
        } catch (error) {
            console.error('Error liking product:', error);
            alert('Error liking product. Please try again later.');
        }
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleSearchClick} />
            <Categories handleCategory={handleCategory} />

            {isSearch && (
                <>
                    <h5>
                        SEARCH RESULTS
                        <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                    </h5>
                    {cproducts.length === 0 && <h5>No Results Found</h5>}
                </>
            )}

            <div className="d-flex justify-content-center flex-wrap">
                {(isSearch ? cproducts : products).map(item => (
                    <div key={item._id} className="card m-3" onClick={() => !isSearch && handleProductClick(item._id)}>
                        <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img
                            width={isSearch ? "300px" : "250px"}
                            height={isSearch ? "200px" : "150px"}
                            alt={item.pname}
                            src={`${API_URL}/${item.pimage}`}
                        />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">{item.price}</h3>
                        <p className="m-2 text-success">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
