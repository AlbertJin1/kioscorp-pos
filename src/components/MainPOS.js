import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const MainPOS = ({ selectedOrder, addOrder, updateOrder, voidOrder }) => {
    const dummyProducts = [
        { id: 1, name: 'Bolts', type: 'Type A', size: 'Medium', price: 500, image: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg' },
        { id: 2, name: 'Screw', type: 'Type B', size: 'Large', price: 750, image: 'https://cdn.explorecams.com/storage/photos/LEFEikw0MR_1600.jpg' },
        { id: 3, name: 'Nuts', type: 'Type C', size: 'Small', price: 1000, image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Washers', type: 'Type D', size: 'Small', price: 200, image: 'https://via.placeholder.com/100' },
        { id: 5, name: 'Anchors', type: 'Type E', size: 'Medium', price: 600, image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Rivets', type: 'Type F', size: 'Large', price: 800, image: 'https://via.placeholder.com/100' },
        { id: 7, name: 'Studs', type: 'Type G', size: 'Medium', price: 400, image: 'https://via.placeholder.com/100' },
        { id: 8, name: 'Self-tapping Screws', type: 'Type H', size: 'Small', price: 300, image: 'https://via.placeholder.com/100' },
        { id: 9, name: 'Lag Screws', type: 'Type I', size: 'Large', price: 900, image: 'https://via.placeholder.com/100' },
        { id: 11, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
        { id: 12, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
        { id: 13, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
        { id: 14, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
        { id: 15, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
    ];

    const [cart, setCart] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (selectedOrder) {
            setCart(selectedOrder.cart);
            setPaymentMethod(selectedOrder.paymentMethod || ''); // Sync the payment method
        } else {
            setCart([]);
            setPaymentMethod(''); // Reset payment method
        }
    }, [selectedOrder]);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${product.name} added to cart!`,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleQuantityChange = (e, productId) => {
        const value = parseInt(e.target.value, 10);
        setProductQuantities({
            ...productQuantities,
            [productId]: value > 0 ? value : 1,
        });
    };

    const filteredProducts = dummyProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const removeFromCart = (productId) => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Product removed from cart!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });

        setCart(cart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, newQuantity) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    };

    // Add order, void order, or update order should reset the payment method to default
    const handleNewOrder = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: 'Cart is empty!',
                text: 'Add products before creating a new order.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!paymentMethod) {
            Swal.fire({
                title: 'No Payment Method Selected!',
                text: 'Please select a payment method before proceeding.',
                icon: 'warning',
                timer: 2000,
                showConfirmButton: false
            });
            return; // Stop order creation if no payment method is selected
        }

        addOrder(cart, paymentMethod);
        setCart([]);
        setPaymentMethod(''); // Reset the payment method
        Swal.fire({
            title: 'Order Created!',
            text: 'Your new order has been successfully created.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    };


    const handleUpdateOrder = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: 'Cart is empty!',
                text: 'Add products before updating the order.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!paymentMethod) {
            Swal.fire({
                title: 'No Payment Method Selected!',
                text: 'Please select a payment method before updating the order.',
                icon: 'warning',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Update the order with the new cart and payment method
        updateOrder(selectedOrder.orderNumber, cart, paymentMethod); // Pass the payment method when updating
        Swal.fire({
            title: 'Order Updated!',
            text: `Order #${selectedOrder.orderNumber} has been updated successfully.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col w-full h-full box-border">
            {/* Order Number */}
            <div className="bg-white p-4 shadow-lg">
                <h2 className="text-xl font-semibold">
                    {selectedOrder ? `Order #${selectedOrder.orderNumber}` : 'New Order'}
                </h2>
            </div>

            {/* Product List and Payment Summary */}
            <div className="flex flex-col lg:flex-row lg:space-x-4 flex-grow p-4 overflow-hidden">
                {/* Product List */}
                <div className="flex-grow bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0 overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Products</h2>

                        {/* Search and Category Filter */}
                        <div className="flex space-x-4 items-center">
                            <input
                                type="text"
                                placeholder="Search product..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border p-2 rounded"
                            />
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="border p-2 rounded"
                            >
                                <option value="All">All Categories</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Tools">Tools</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>
                    </div>

                    {/* Product Grid with Custom Scrollbar */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 245px)' }}>

                        {filteredProducts.map((product) => (
                            <div key={product.id} className="border p-4 rounded-lg flex flex-col items-center space-y-4">
                                <img src={product.image} alt={product.name} className="w-52 h-52 object-cover object-center" />
                                <div className="text-center">
                                    <p className="font-semibold">{product.name}</p>
                                    <p>{product.type} - {product.size}</p>
                                    <p>₱{product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={productQuantities[product.id] || 1}
                                        min={1}
                                        className="w-16 border rounded p-1 text-center"
                                        onChange={(e) => handleQuantityChange(e, product.id)}
                                    />
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => addToCart(product, productQuantities[product.id] || 1)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary with Custom Scrollbar */}
                <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/3 xl:w-1/4 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">
                        {selectedOrder ? `Payment Summary for Order #${selectedOrder.orderNumber}` : 'Payment Summary'}
                    </h2>
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={index} className="mb-2 text-lg flex justify-between items-center">
                                    <div>
                                        <p>{item.name} - ₱{item.price.toFixed(2)}</p>
                                        <div className="flex items-center">
                                            <p>Unit Price: ₱{item.price.toFixed(2)} x </p>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min={1}
                                                onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                                                className="ml-2 w-16 border rounded p-1 text-center"
                                            />
                                        </div>
                                        <p className="font-semibold">Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button className="text-red-500" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            ))
                        ) : (
                            <p>No items in cart.</p>
                        )}
                    </div>
                    <div className="flex justify-between mt-4">
                        <h3 className="font-semibold">Total:</h3>
                        <h3 className="font-semibold">₱{totalPrice.toFixed(2)}</h3>
                    </div>
                    {/* Payment Method Dropdown */}
                    <div className="mt-4">
                        <label htmlFor="payment-method" className="font-semibold mb-2 block">Payment Method</label>
                        <select
                            id="payment-method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="" disabled>Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Gcash">Gcash</option>
                            <option value="Card">Card</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-4">
                        {selectedOrder ? (
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full" onClick={handleUpdateOrder}>
                                Update Order
                            </button>
                        ) : (
                            cart.length > 0 && (
                                <button className="bg-green-500 text-white px-4 py-2 rounded w-full" onClick={handleNewOrder}>
                                    New Order
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPOS;