import { useState } from 'react';
import { Package } from 'lucide-react';
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

    const handleAddProduct = (data: ProductFormData) => {
        
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
                        className="bg-blue-800 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium hover:cursor-pointer"
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
          />
        </>
    );
}

export default Header;