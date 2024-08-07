import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${API_URL}/get-product/${productId}`;
                const response = await axios.get(url);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
                setLoading(false);
            } catch (err) {
                setError('Server error while fetching product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleContact = async (addedBy) => {
        try {
            const url = `${API_URL}/get-user/${addedBy}`;
            const response = await axios.get(url);
            if (response.data.user) {
                setUser(response.data.user);
            }
        } catch (err) {
            alert('Server error while fetching user details.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Header />
            <h2>Product Details</h2>
            <div className="d-flex justify-content-between flex-wrap">
                {product && (
                    <div>
                        <img
                            width="400px"
                            height="200px"
                            src={`${API_URL}/${product.pimage}`}
                            alt="Product"
                        />
                        {product.pimage2 && (
                            <img
                                width="400px"
                                height="200px"
                                src={`${API_URL}/${product.pimage2}`}
                                alt="Additional Product"
                            />
                        )}
                        <h6>Product Description:</h6>
                        <p>{product.pdesc}</p>
                    </div>
                )}
                <div>
                    {product && (
                        <>
                            <h3 className="m-2 price-text">Rs. {product.price} /-</h3>
                            <p className="m-2">
                                {product.pname} | {product.category}
                            </p>
                            <p className="m-2 text-success">{product.pdesc}</p>
                            {product.addedBy && (
                                <button onClick={() => handleContact(product.addedBy)}>
                                    SHOW CONTACT DETAILS
                                </button>
                            )}
                            {user && (
                                <div>
                                    {user.username && <h4>{user.username}</h4>}
                                    {user.mobile && <h3>{user.mobile}</h3>}
                                    {user.email && <h6>{user.email}</h6>}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
