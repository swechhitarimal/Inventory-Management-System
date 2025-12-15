import { useState, useEffect } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Product {
    id: number;
    product_code: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

function ProductsTable() {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
        
        // Listen for product added event
        const handleProductAdded = () => {
            fetchProducts();
        };
        
        window.addEventListener('productAdded', handleProductAdded);
        
        return () => {
            window.removeEventListener('productAdded', handleProductAdded);
        };
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/products');
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const products = await response.json();
            setData(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            message.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record: Product) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${record.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            message.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Failed to delete product');
        }
    };

    const handleEdit = (record: Product) => {
        console.log('Edit', record);
        message.info('Edit functionality - to be implemented');
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
            render: (price: number) => `$${parseFloat(price.toString()).toFixed(2)}`,
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
            title: "Actions",
            key: "action",
            width: 120,
            align: 'center' as const,
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button 
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button 
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            className="hover:bg-red-50"
                        />
                    </Popconfirm>
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
                className="bg-white rounded-lg shadow-md"
            />
        </div>
    );
}

export default ProductsTable;