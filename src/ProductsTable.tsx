import {Table} from "antd";

function ProductsTable() 
{
    return(
        <>
        <div className="mx-4 my-4">
        <Table pagination={{pageSize : 5}}></Table>
        </div>
        </>
    )
}

export default ProductsTable;