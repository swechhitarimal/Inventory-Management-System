import { Table } from "antd";

function ProductsTable() 
{
    return(
        <div className="max-w-7xl mx-auto px-6 py-4">
            <Table 
                pagination={{ pageSize: 5 }}
                className="bg-white rounded-lg shadow-md"
            />
        </div>
    )
}

export default ProductsTable;