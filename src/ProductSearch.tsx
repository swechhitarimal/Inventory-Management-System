import { Select, Input} from 'antd';

function ProductSearch() 
{
    return(
        <>
        <div className="flex justify-between items-center mx-4 my-4">
    
            <h2 className="font-bold text-2xl text-gray-800">Products</h2>
            
            <div className="flex gap-4">
            <Input placeholder="Search products.."></Input>
            <Select 
            placeholder="All Categories"
            style={{width:200}}
            ></Select>
        </div>       
        </div>
        </>
    )
}

export default ProductSearch;