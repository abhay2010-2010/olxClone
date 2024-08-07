import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function CategoryPage() {
    const navigate = useNavigate();
    const { catName } = useParams();
    
    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${API_URL}/get-products?catName=${catName}`;
                const { data } = await axios.get(url);
                if (data.products) {
                    setProducts(data.products);
                }
            } catch (error) {
                alert('Server error while fetching products.');
            }
        };

        fetchProducts();
    }, [catName]);

    const handleSearch = async () => {
        try {
            const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
            const { data } = await axios.get(url);
            setCproducts(data.products);
            setIsSearch(true);
        } catch (error) {
            alert('Server error while searching.');
        }
    };

    const handleCategory = (value) => {
        const filteredProducts = products.filter(item => item.category === value);
        setCproducts(filteredProducts);
    };

    const handleLike = async (productId) => {
        try {
            const userId = localStorage.getItem('userId');
            const url = `${API_URL}/like-product`;
            await axios.post(url, { userId, productId });
            alert('Product liked.');
        } catch (error) {
            alert('Server error while liking product.');
        }
    };

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} handlesearch={setSearch} handleClick={handleSearch} />
            <Categories handleCategory={handleCategory} />

            {isSearch && cproducts.length === 0 && <h5>No Results Found</h5>}
            {isSearch && cproducts.length > 0 && (
                <div>
                    <h5>
                        SEARCH RESULTS
                        <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                    </h5>
                    <div className="d-flex justify-content-center flex-wrap">
                        {cproducts.map(item => (
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
            )}

            {!isSearch && products.length > 0 && (
                <div className="d-flex justify-content-center flex-wrap">
                    {products.map(item => (
                        <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                            <div onClick={() => handleLike(item._id)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="250px" height="150px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
