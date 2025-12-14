import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ProductsTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/products');
            const products = await response.json();
            setData(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Product Code',
            dataIndex: 'product_code',
            key: 'product_code',          
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',           
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',           
            render: (price: number) => `$${price}`,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',           
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",            
        },
        {
            title: "Action",
            key: "action",
            width: 200,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => console.log('Edit', record)}
                    >
                        Edit
                    </Button>
                    <Button 
                        danger 
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => console.log('Delete', record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-4">
            <Table 
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                tableLayout="fixed"
                className="bg-white rounded-lg shadow-md"
            />
        </div>
    );
}

export default ProductsTable;