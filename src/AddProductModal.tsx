import { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Select, message } from 'antd';

const { TextArea } = Input;

interface ProductFormData {
    productName: string;   
    category: string;       
    price: number | string; 
    quantity: number | string; 
    sku: string;           
    description: string;  
}

interface Product {
    id: number;
    product_code: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

interface AddProductModalProps {
    isOpen: boolean;                         
    onClose: () => void;                       
    onSubmit: (data: ProductFormData) => void; 
    loading?: boolean;
    editingProduct?: Product | null;
}

function AddProductModal({ isOpen, onClose, onSubmit, loading = false, editingProduct = null }: AddProductModalProps) {
    
    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        category: '',
        price: '',
        quantity: '',
        sku: '',
        description: ''
    });
    
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // Fetch categories when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    // Populate form with editing product data
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                productName: editingProduct.name,
                category: editingProduct.category,
                price: editingProduct.price,
                quantity: editingProduct.quantity,
                sku: editingProduct.product_code,
                description: ''
            });
        } else {
            resetForm();
        }
    }, [editingProduct]);

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);
            const response = await fetch('http://localhost:5000/categories');
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            message.error('Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleOk = () => {
        // Validate required fields
        if (!formData.productName || !formData.category || !formData.price || !formData.quantity || !formData.sku) {
            message.warning('Please fill in all required fields');
            return;
        }
        
        console.log('Form Data:', formData);  
        onSubmit(formData);                   
        
        // Only reset if not editing (editing will be reset by parent)
        if (!editingProduct) {
            resetForm();
        }
    };

    const handleCancel = () => {       
        resetForm();   
        onClose();   
    };

    const resetForm = () => {
        setFormData({
            productName: '',
            category: '',
            price: '',
            quantity: '',
            sku: '',
            description: ''
        });
    };

    const handleChange = (field: keyof ProductFormData, value: any) => {
        setFormData(prev => ({
            ...prev, 
            [field]: value 
        }));
    };

    return (
        <Modal
            title={editingProduct ? "Edit Product" : "Add New Product"}
            open={isOpen}                        
            onOk={handleOk}                      
            onCancel={handleCancel}              
            okText={loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
            cancelText="Cancel"                  
            width={600}
            confirmLoading={loading}
            cancelButtonProps={{ disabled: loading }}
        >
            <div className="space-y-4 py-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="Enter product name"          
                  value={formData.productName}              
                  onChange={(e) => handleChange('productName', e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select 
                  placeholder="Select category"
                  style={{ width: '100%' }}                  
                  value={formData.category || undefined}  
                  onChange={(value) => handleChange('category', value)}
                  loading={loadingCategories}
                  disabled={loading}
                  showSearch
                >
                  {categories.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="flex gap-4">
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    prefix="$"                              
                    placeholder="0.00"
                    min={0}                                  
                    step={0.01}                               
                    style={{ width: '100%' }}
                    value={formData.price}
                    onChange={(value) => handleChange('price', value)}
                    disabled={loading}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    placeholder="0"
                    min={0}                                   
                    style={{ width: '100%' }}
                    value={formData.quantity}
                    onChange={(value) => handleChange('quantity', value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="e.g., PROD-001"
                  value={formData.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <TextArea 
                  rows={4}                                     
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={loading}
                />
              </div>

            </div>
        </Modal>
    );
}

export default AddProductModal;