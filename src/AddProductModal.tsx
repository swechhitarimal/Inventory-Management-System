import { useState } from 'react';
import { Modal, Input, InputNumber, Select } from 'antd';

const { TextArea } = Input;


interface ProductFormData {
    productName: string;   
    category: string;       
    price: number | string; 
    quantity: number | string; 
    sku: string;           
    description: string;  
}

interface AddProductModalProps {
    isOpen: boolean;                         
    onClose: () => void;                       
    onSubmit: (data: ProductFormData) => void; 
}


function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
    
    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        category: '',
        price: '',
        quantity: '',
        sku: '',
        description: ''
    });
    

    const handleOk = () => {       
        console.log('Form Data:', formData);  
        onSubmit(formData);                   
        resetForm();                          
        onClose();                            
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
            title="Add New Product"              
            open={isOpen}                        
            onOk={handleOk}                      
            onCancel={handleCancel}              
            okText="Add Product"                
            cancelText="Cancel"                  
            width={600}                                
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
                >
                  <Select.Option value="electronics">Electronics</Select.Option>
                  <Select.Option value="clothing">Clothing</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="furniture">Furniture</Select.Option>
                  <Select.Option value="books">Books</Select.Option>
                  
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU (Stock Keeping Unit)
                </label>
                <Input 
                  placeholder="e.g., PROD-001"
                  value={formData.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
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
                />
              </div>

            </div>
        </Modal>
    );
}

export default AddProductModal;
