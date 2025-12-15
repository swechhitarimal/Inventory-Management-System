import { useState } from 'react';
import { Package } from 'lucide-react';
import { message } from 'antd';
import AddProductModal from './AddProductModal';

interface ProductFormData {
    productName: string;
    category: string;
    price: number | string;
    quantity: number | string;
    sku: string;
    description: string;
}

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddProduct = async (data: ProductFormData) => {
        try {
            setLoading(true);
            
            const productData = {
                product_code: data.sku,
                name: data.productName,
                price: parseFloat(data.price.toString()),
                category: data.category,
                quantity: parseInt(data.quantity.toString())
            };

            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }

             
            message.success('Product added successfully!');
            setIsModalOpen(false);
            
            window.dispatchEvent(new Event('productAdded'));
            
        } catch (error: any) {
            console.error('Error adding product:', error);
            message.error(error.message || 'Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-800 p-2 rounded-lg">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Inventory Pro</h1>
                            <p className="text-sm text-gray-600">Manage your store products</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={loading}
                        className="bg-blue-800 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Add Product
                    </button>

                </div>
            </div>
          </header> 

          <div className="h-px w-full bg-gray-200"></div>

          <AddProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddProduct}
            loading={loading}
          />
        </>
    );
}

export default Header;