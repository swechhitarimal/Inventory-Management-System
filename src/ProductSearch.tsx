import { Select, Input} from 'antd';
import { useEffect, useState } from 'react';

interface ProductSearchProps {
    onSearch: (searchTerm: string) => void;
    onCategoryFilter: (category: string | null) => void;
}

function ProductSearch({ onSearch, onCategoryFilter }: ProductSearchProps) 
{
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    const handleCategoryChange = (value: string) => {
        onCategoryFilter(value || null);
    };

    return(
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
        
                <h2 className="font-bold text-2xl text-gray-800">Products</h2>
                
                <div className="flex gap-4">
                    <Input 
                        placeholder="Search products..." 
                        style={{width: 250}}
                        className="rounded-lg"
                        onChange={handleSearchChange}
                        allowClear
                    />
                    <Select
                        placeholder="All Categories"
                        style={{ width: 200 }}
                        allowClear
                        onChange={handleCategoryChange}
                    >
                        {categories.map(cat => (
                            <Select.Option key={cat} value={cat}>
                                {cat}
                            </Select.Option>
                        ))}
                    </Select>
                </div>       
            </div>
        </div>
    )
}

export default ProductSearch;