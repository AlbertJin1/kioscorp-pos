import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const MainPOS = ({ addOrder }) => {
    const dummyProducts = [
        { id: 1, name: 'Bolts', type: 'Type A', size: 'Medium', price: 500, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Screw', type: 'Type B', size: 'Large', price: 750, image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Nuts', type: 'Type C', size: 'Small', price: 1000, image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Washers', type: 'Type D', size: 'Small', price: 200, image: 'https://via.placeholder.com/100' },
        { id: 5, name: 'Anchors', type: 'Type E', size: 'Medium', price: 600, image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Rivets', type: 'Type F', size: 'Large', price: 800, image: 'https://via.placeholder.com/100' },
        { id: 7, name: 'Studs', type: 'Type G', size: 'Medium', price: 400, image: 'https://via.placeholder.com/100' },
        { id: 8, name: 'Self-tapping Screws', type: 'Type H', size: 'Small', price: 300, image: 'https://via.placeholder.com/100' },
        { id: 9, name: 'Lag Screws', type: 'Type I', size: 'Large', price: 900, image: 'https://via.placeholder.com/100' },
        { id: 10, name: 'Hex Bolts', type: 'Type J', size: 'Medium', price: 650, image: 'https://via.placeholder.com/100' },
    ];

    const [cart, setCart] = useState([]);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }

        // Show SweetAlert notification without dimming the background
        Swal.fire({
            toast: true,               // Enable toast mode
            position: 'top-end',       // Position at the top right corner
            icon: 'success',           // Success icon
            title: `${product.name} added to cart!`, // Notification message
            showConfirmButton: false,  // No confirm button
            timer: 1500,               // Duration to display the notification
            timerProgressBar: true,    // Show timer progress bar
            background: '#fff',        // Optional: set background color
            customClass: {
                popup: 'swal-custom'   // Optional: custom class for styling
            }
        });
    };


    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleVoid = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will clear your current cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, void it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setCart([]); // Clear current cart
                Swal.fire({
                    title: 'Voided!',
                    text: 'Your cart has been cleared.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    };

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

        addOrder(cart);
        setCart([]); // Clear the cart for the new order
        Swal.fire({
            title: 'Order Created!',
            text: 'Your new order has been successfully created.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col w-full h-screen box-border">
            {/* Order Number */}
            <div className="bg-white p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Current Order</h2>
            </div>

            {/* Product List and Payment Summary */}
            <div className="flex flex-col lg:flex-row lg:space-x-4 flex-grow p-4 overflow-hidden">
                {/* Product List */}
                <div className="flex-grow bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0 overflow-y-auto" style={{ maxHeight: `calc(${windowHeight}px - 100px)` }}>
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                        {dummyProducts.map((product) => (
                            <div key={product.id} className="border p-4 rounded-lg flex items-center space-x-4">
                                <img src={product.image} alt={product.name} className="w-16 h-16" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{product.name}</p>
                                    <p>{product.type} - {product.size}</p>
                                    <p>₱{product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        defaultValue={1}
                                        min={1}
                                        className="w-16 border rounded p-1 text-center"
                                        id={`quantity-${product.id}`}
                                    />
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => addToCart(product, parseInt(document.getElementById(`quantity-${product.id}`).value))}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/3 xl:w-1/4 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
                    <div className="flex-grow overflow-y-auto" style={{ maxHeight: `calc(${windowHeight}px - 400px)` }}>
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-lg">No items in cart.</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="mb-2 text-lg flex justify-between items-center">
                                    <div>
                                        <p>{item.name} - ₱{item.price.toFixed(2)}</p>
                                        <p>Unit Price: ₱{item.price.toFixed(2)} x {item.quantity}</p>
                                        <p className="font-semibold">Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center ml-4"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    {cart.length > 0 && (
                        <div className="mt-4">
                            <p className="font-semibold text-2xl">Grand Total: ₱{totalPrice.toFixed(2)}</p>
                            <button
                                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg w-full"
                                onClick={handleNewOrder}
                            >
                                Create New Order
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded-lg w-full"
                                onClick={handleVoid}
                            >
                                Void
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPOS;
