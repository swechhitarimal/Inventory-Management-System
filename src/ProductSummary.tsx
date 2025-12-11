import { Blocks } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { Layers } from 'lucide-react';
import { TriangleAlert } from 'lucide-react'

function ProductSummary() 
{
    return (
        <>
        <div className="flex items-center justify-between gap-4 mx-4 my-4">
            <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between">
                <p className="text-gray-800 font-semibold">Total Products</p>
                <Blocks className="w-6 h-6"></Blocks>
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between">
            <p className="text-gray-800 font-semibold">Total Value</p>
            <DollarSign className="w-6 h-6"></DollarSign>
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between">
           <p className ="text-gray-800 font-semibold">Categories</p>
           <Layers className="w-6 h-6"></Layers>           
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md flex justify-between">
            <p className="text-gray-800 font-semibold">Low Stock Items</p>
            <TriangleAlert className="w-6 h-6 text-yellow-800"></TriangleAlert>
            </div>
        </div>
        </>
    )
}

export default ProductSummary;