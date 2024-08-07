import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState(null);
    const [pimage2, setPimage2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        if (!pname || !pdesc || !price || !category || !pimage) {
            setError('Please fill out all required fields.');
            return;
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2 || ''); // Handle optional second image
            formData.append('userId', localStorage.getItem('userId'));

            const url = `${API_URL}/add-product`;
            axios.post(url, formData)
                .then((res) => {
                    setLoading(false);
                    if (res.data.message) {
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setError('Server error. Please try again.');
                });
        }, (error) => {
            setError('Failed to get location. Please allow location access.');
        });
    };

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2>ADD PRODUCT HERE:</h2>
                {error && <p className="text-danger">{error}</p>}
                <label>Product Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={pname} 
                    onChange={(e) => setPname(e.target.value)} 
                />
                <label>Product Description</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={pdesc} 
                    onChange={(e) => setPdesc(e.target.value)} 
                />
                <label>Product Price</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                />
                <label>Product Category</label>
                <select 
                    className="form-control" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                >
                    <option value="">Select Category</option>
                    <option value="Bikes">Bikes</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Cloth">Cloth</option>
                    {categories && categories.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <label>Product Image</label>
                <input 
                    className="form-control" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setPimage(e.target.files[0])} 
                />
                <label>Product Second Image (Optional)</label>
                <input 
                    className="form-control" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setPimage2(e.target.files[0])} 
                />
                <button 
                    onClick={handleApi} 
                    className="btn btn-primary mt-3"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
