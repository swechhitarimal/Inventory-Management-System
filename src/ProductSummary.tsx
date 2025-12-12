import { Blocks, DollarSign, Layers, TriangleAlert } from 'lucide-react';

function ProductSummary() 
{
    return (
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                
                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">Total Products</p>
                    <Blocks className="w-6 h-6" />
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">Total Value</p>
                    <DollarSign className="w-6 h-6" />
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">Categories</p>
                    <Layers className="w-6 h-6" />           
                </div>

                <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">Low Stock Items</p>
                    <TriangleAlert className="w-6 h-6 text-yellow-600" />
                </div>

            </div>
        </div>
    )
}

export default ProductSummary;