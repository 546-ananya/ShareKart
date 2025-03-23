import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    toast.error("Item removed", {
      description: "The item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast.success("Payment successful!", {
      description: "Thank you for your purchase.",
      action: {
        label: "View Orders",
        onClick: () => navigate("/orders"),
      },
    });
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:text-blue-500">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-4xl font-bold text-blue-600">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12 shadow-xl bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-blue-500 hover:bg-blue-400 text-white">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-blue-600">Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200">
                      <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="font-bold text-blue-500">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border rounded-md bg-gray-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none hover:bg-blue-200"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-gray-800">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none hover:bg-blue-200"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-100" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearCart} className="border-red-500 text-red-500 hover:bg-red-100">
                  Clear Cart
                </Button>
                <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-blue-600">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-500 hover:bg-green-400 text-white shadow-md" onClick={handleCheckout}>
                  Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
