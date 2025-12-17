import { useState, useEffect } from 'react';
import { Blocks, DollarSign, Layers, TriangleAlert } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

interface ProductSummary {
    totalProducts: number;
    totalValue: number;
    categories: number;
    lowStockItems: number;
}

function ProductSummary() {
    const [summary, setSummary] = useState<ProductSummary>({
        totalProducts: 0,
        totalValue: 0,
        categories: 0,
        lowStockItems: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProductSummary();        
       
        const handleProductsUpdated = () => {
            fetchProductSummary();
        };
        
        window.addEventListener('productsUpdated', handleProductsUpdated);
        
        return () => {
            window.removeEventListener('productsUpdated', handleProductsUpdated);
        };
    }, []);

    const fetchProductSummary = async (): Promise<void> => {
        try {
            setLoading(true);            
            const response = await fetch('http://localhost:5000/products');
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const products: Product[] = await response.json();
                      
            const totalProducts = products.length;
            const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            const categories = new Set(products.map(product => product.category)).size;
            const lowStockItems = products.filter(product => product.quantity < 10).length;
            
            setSummary({
                totalProducts,
                totalValue,
                categories,
                lowStockItems
            });
            
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error fetching product summary:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    Error loading summary: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                
                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm font-medium">Total Products</p>
                        <Blocks className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {loading ? '...' : summary.totalProducts.toLocaleString()}
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm font-medium">Total Value</p>
                        <DollarSign className="w-6 h-6 text-green-800" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {loading ? '...' : formatCurrency(summary.totalValue)}
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm font-medium">Categories</p>
                        <Layers className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {loading ? '...' : summary.categories}
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
                        <TriangleAlert className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {loading ? '...' : summary.lowStockItems}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ProductSummary;