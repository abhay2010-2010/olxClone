import { useNavigate } from 'react-router-dom';
import './Header.css';
import categories from './CategoriesList';

function Categories() {
    const navigate = useNavigate();

    // Handle navigation to category pages
    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <div className='cat-container'>
            <span className='pr-3'>All Categories</span>
            <div className='category-list'>
                {categories && categories.length > 0 ? (
                    categories.map((item, index) => (
                        <span
                            key={index}
                            className='category'
                            onClick={() => handleCategoryClick(item)}
                            role='button'
                            aria-label={`Navigate to ${item} category`}
                        >
                            {item}
                        </span>
                    ))
                ) : (
                    <span className='no-categories'>No categories available</span>
                )}
            </div>
        </div>
    );
}

export default Categories;
