import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header({ search, handlesearch, handleClick }) {
    const [loc, setLoc] = useState(localStorage.getItem('userLoc') || '');
    const [showOver, setShowOver] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userLoc');
        navigate('/login');
    };

    const locations = [
        {
            latitude: 28.6139,
            longitude: 77.2090,
            placeName: "New Delhi, Delhi"
        },
        {
            latitude: 19.0760,
            longitude: 72.8777,
            placeName: "Mumbai, Maharashtra"
        },
    ];

    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">
                <Link className='links' to="/">HOME</Link>
                <select
                    value={loc}
                    onChange={(e) => {
                        const selectedLoc = e.target.value;
                        localStorage.setItem('userLoc', selectedLoc);
                        setLoc(selectedLoc);
                    }}
                >
                    <option value="">Select Location</option>
                    {locations.map((item, index) => (
                        <option key={index} value={`${item.latitude},${item.longitude}`}>
                            {item.placeName}
                        </option>
                    ))}
                </select>
                <input
                    className='search'
                    type='text'
                    value={search || ''}
                    onChange={(e) => handlesearch && handlesearch(e.target.value)}
                />
                <button className='search-btn' onClick={handleClick}>
                    <FaSearch />
                </button>
            </div>

            <div className='user-menu-container'>
                <div
                    className='user-icon'
                    onClick={() => setShowOver(prev => !prev)}
                >
                    N
                </div>

                {showOver && (
                    <div className='user-menu'>
                        {localStorage.getItem('token') ? (
                            <>
                                <Link to="/add-product">
                                    <button className="user-menu-btn">ADD PRODUCT</button>
                                </Link>
                                <Link to="/liked-products">
                                    <button className="user-menu-btn">FAVOURITES</button>
                                </Link>
                                <Link to="/my-products">
                                    <button className="user-menu-btn">MY ADS</button>
                                </Link>
                                <button className='user-menu-btn' onClick={handleLogout}>LOGOUT</button>
                            </>
                        ) : (
                            <Link to="/login">LOGIN</Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
