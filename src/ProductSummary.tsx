
function ProductSummary() 
{
    return (
        <>
        <div className="flex items-center justify-between gap-4 mx-4 my-4">
            <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
                <p className="text-gray-800">Total Products</p>
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
            <p className="text-gray-800">Total Value</p>
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
           <p className ="text-gray-800">Categories</p>
            </div>
        <div className="border border-gray-200 rounded-lg p-4 w-1/4 shadow-md">
            <p className="text-gray-800">Low Stock Items</p>
            </div>
        </div>
        </>
    )
}

export default ProductSummary;