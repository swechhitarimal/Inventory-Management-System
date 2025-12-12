import { Select, Input} from 'antd';

function ProductSearch() 
{
    return(
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
        
                <h2 className="font-bold text-2xl text-gray-800">Products</h2>
                
                <div className="flex gap-4">
                    <Input 
                        placeholder="Search products..." 
                        style={{width: 250}}
                        className="rounded-lg"
                    />
                    <Select 
                        placeholder="All Categories"
                        style={{width: 200}}
                        className="rounded-lg"
                    />
                </div>       
            </div>
        </div>
    )
}

export default ProductSearch;