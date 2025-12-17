import { useState, useEffect } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddProductModal from "./AddProductModal";

interface Product {
    id: number;
    product_code: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

interface ProductsTableProps {
    searchTerm: string;
    categoryFilter: string | null;
}

function ProductsTable({ searchTerm, categoryFilter }: ProductsTableProps) {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [submitting, setSubmitting] = useState(false);    

    useEffect(() => {
        fetchProducts();
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
            
            // Dispatch event to notify other components
            window.dispatchEvent(new Event('productsUpdated'));
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
        setEditingProduct(record);
        setIsModalOpen(true);
    };

    const handleAddProduct = async (formData: any) => {
        try {
            setSubmitting(true);

            const productData = {
                product_code: formData.sku,
                name: formData.productName,
                price: parseFloat(formData.price.toString()),
                category: formData.category,
                quantity: parseInt(formData.quantity.toString())
            };

            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }

            message.success('Product added successfully!');
            setIsModalOpen(false);
            fetchProducts(); // Refresh the table
        } catch (error: any) {
            console.error('Error adding product:', error);
            message.error(error.message || 'Failed to add product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateProduct = async (formData: any) => {
        if (!editingProduct) {
            // This is an ADD operation
            await handleAddProduct(formData);
            return;
        }

        try {
            setSubmitting(true);

            const productData = {
                product_code: formData.sku,
                name: formData.productName,
                price: parseFloat(formData.price.toString()),
                category: formData.category,
                quantity: parseInt(formData.quantity.toString())
            };

            const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

            message.success('Product updated successfully!');
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts(); // Refresh the table
        } catch (error: any) {
            console.error('Error updating product:', error);
            message.error(error.message || 'Failed to update product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // Filter data based on search term and category
    const filteredData = data.filter(product => {
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.product_code.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = categoryFilter === null || 
            product.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });

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
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10, size: "small" }}
                className="bg-white rounded-lg shadow-md"
            />

            <AddProductModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleUpdateProduct}
                loading={submitting}
                editingProduct={editingProduct}
            />
        </div>
    );
}

export default ProductsTable;