import React, { useState } from 'react';
import { motion } from 'motion/react';
import { getCartItemsDetails, getCartTotal } from '../lib/cart';
import { ChevronLeft, Minus, Plus, ShoppingBag, MapPin, Check, Sparkles } from 'lucide-react';
import { MenuItem, combos } from '../data';

interface CartPageProps {
  cart: Record<string, number>;
  updateCart: (id: string, diff: number) => void;
  clearCart: () => void;
  onBack: () => void;
  globalMenuItems: MenuItem[];
}

const MIN_ORDER_AMOUNT = 149;
const FREE_DELIVERY_THRESHOLD = 249;

export function CartPage({ cart, updateCart, clearCart, onBack, globalMenuItems }: CartPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    notes: '',
    latitude: null as number | null,
    longitude: null as number | null,
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const totalAmount = getCartTotal(cart, globalMenuItems);
  const itemsDetails = getCartItemsDetails(cart, globalMenuItems);
  const isEmpty = itemsDetails.length === 0;

  let deliveryFee = 0;
  if (totalAmount < MIN_ORDER_AMOUNT) {
    deliveryFee = 49; // Shows fee but checkout will be disabled
  } else if (totalAmount < FREE_DELIVERY_THRESHOLD) {
    deliveryFee = 29;
  }
  const finalAmount = totalAmount + deliveryFee;

  const isCheckoutDisabled = totalAmount < MIN_ORDER_AMOUNT;
  const progressPercentage = Math.min((totalAmount / FREE_DELIVERY_THRESHOLD) * 100, 100);

  let progressMessage = "";
  if (totalAmount < MIN_ORDER_AMOUNT) {
    const shortBy = MIN_ORDER_AMOUNT - totalAmount;
    progressMessage = `Your cravings need backup 🍔 Add ₹${shortBy} more to order.`;
  } else if (totalAmount < FREE_DELIVERY_THRESHOLD) {
    const shortBy = FREE_DELIVERY_THRESHOLD - totalAmount;
    if (shortBy <= 85) {
      progressMessage = "Almost there, hungry legend. One fries away from free delivery 🍟";
    } else {
      progressMessage = `🚀 Add ₹${shortBy} more for FREE delivery`;
    }
  } else {
    progressMessage = "FREE DELIVERY UNLOCKED 🎉";
  }

  // Upsell Suggestions
  const suggestedItems = [...globalMenuItems, ...combos]
    .filter(item => !cart[item.id])
    .sort(() => 0.5 - Math.random()) // simple random shuffle
    .slice(0, 2);

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setLocationSuccess(true);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setIsLocating(false);
          setLocationError("Couldn't get your location. Please type it below.");
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty || isCheckoutDisabled) return;
    
    const WHATSAPP_NUMBER = '919549590003';
    
    let message = `Night Cravings Co. Order 🌙\n\n`;
    message += `Customer Name: ${formData.name}\n`;
    message += `Phone Number: ${formData.phone}\n\n`;
    
    if (formData.latitude && formData.longitude) {
      const mapsLink = `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`;
      message += `Location:\n${formData.location ? formData.location + '\n' : ''}${mapsLink}\n\n`;
    } else {
      message += `Location:\n${formData.location}\n\n`;
    }
    
    message += `Items Ordered:\n\n`;
    itemsDetails.forEach(item => {
      message += `* ${item.name} x ${item.quantity}\n`;
    });
    
    message += `\nSubtotal: ₹${totalAmount}\n`;
    if (deliveryFee > 0) {
      message += `Delivery Fee: ₹${deliveryFee}\n`;
    } else {
      message += `Delivery Fee: FREE\n`;
    }
    message += `Total Amount: ₹${finalAmount}\n\n`;
    message += `Notes: ${formData.notes}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      clearCart();
      onBack();
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto px-4 py-8 md:py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="font-semibold">Back to Menu</span>
      </button>

      <h1 className="font-display text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Your Cravings
      </h1>

      {isEmpty ? (
        <div className="text-center py-16 bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is feeling light</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Let's fix that midnight hunger.</p>
          <button 
            onClick={onBack}
            className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-brand-orange/20 active:scale-95 transition-all"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_400px] gap-8 items-start">
          
          {/* Cart Items */}
          <div>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 p-5 shadow-sm mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-orange/5 dark:bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl flex-shrink-0 ${totalAmount >= FREE_DELIVERY_THRESHOLD ? 'bg-green-100 text-green-600 dark:bg-green-500/20' : 'bg-brand-orange/10 text-brand-orange'}`}>
                  {totalAmount >= FREE_DELIVERY_THRESHOLD ? <Sparkles size={24} /> : <span className="text-xl leading-none block pt-0.5">🚀</span>}
                </div>
                <span className={`font-semibold text-lg ${totalAmount >= FREE_DELIVERY_THRESHOLD ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {progressMessage}
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 1 }}
                  className={`h-full rounded-full relative ${totalAmount >= FREE_DELIVERY_THRESHOLD ? 'bg-[#25D366]' : 'bg-brand-orange'}`}
                >
                  {totalAmount >= FREE_DELIVERY_THRESHOLD && (
                    <motion.div 
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              {itemsDetails.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-100 dark:bg-gray-800" />
                )}
                <div className="flex-grow flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                  <div className="font-medium text-gray-600 dark:text-gray-300 mb-3">₹{item.price}</div>
                  
                  <div className="inline-flex w-fit items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                    <button 
                      onClick={() => updateCart(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateCart(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upsell Suggestions */}
          {suggestedItems.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold mb-4 text-gray-900 dark:text-white">You might also like...</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedItems.map(item => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm items-center hover:border-brand-orange/50 transition-colors cursor-pointer" onClick={() => updateCart(item.id, 1)}>
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
                    )}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <div className="text-brand-orange font-bold text-sm">₹{item.price}</div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateCart(item.id, 1); }} 
                      className="p-2 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-900 dark:text-white hover:bg-brand-orange hover:text-white transition-colors"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm sticky top-24">
            <h2 className="font-display text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order Details</h2>
            
            <form id="cart-checkout-form" onSubmit={handleOrder} className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>

              {/* Modern GPS Location Module */}
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-5 border border-gray-100 dark:border-white/5 mt-2">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">Where should we deliver? 📍</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Too lazy to type? We got you.</p>

                <div className="flex flex-col gap-4">
                  {!locationSuccess ? (
                    <>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="w-full relative flex items-center justify-center gap-3 bg-brand-orange hover:bg-orange-600 text-white py-4 px-4 rounded-2xl font-bold shadow-md shadow-brand-orange/20 active:scale-95 transition-all overflow-hidden"
                    >
                      {isLocating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Your fries are locating you...</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={20} />
                          <span className="text-lg">Use Current Location</span>
                        </>
                      )}
                    </button>
                    {locationError && (
                      <p className="text-xs text-red-500 font-medium text-center -mt-2">{locationError}</p>
                    )}
                  </>) : (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      className="w-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-4 flex flex-col gap-3 shadow-inner"
                    >
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        We'll find you 👀
                      </div>
                      
                      <div className="w-full h-28 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative shadow-sm border border-gray-200 dark:border-gray-600">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          scrolling="no" 
                          marginHeight={0} 
                          marginWidth={0} 
                          src={`https://maps.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15&output=embed`}
                          className="absolute inset-0 grayscale-[0.2] contrast-125 opacity-90"
                        />
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-xl" />
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-400 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ETA: 25–30 mins
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3 opacity-60 my-1">
                    <div className="h-px bg-gray-300 dark:bg-gray-600 flex-grow" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">OR</span>
                    <div className="h-px bg-gray-300 dark:bg-gray-600 flex-grow" />
                  </div>

                  <div>
                    <input 
                      type="text" 
                      placeholder="Hotel / Hostel / Landmark"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required={!locationSuccess}
                      className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">Notes (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Extra ketchup, please!"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            </form>

            <div className="border-t border-gray-100 dark:border-white/10 pt-4 mb-6 space-y-2">
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span className="font-medium">{deliveryFee > 0 ? `₹${deliveryFee}` : <span className="text-[#25D366] font-bold">FREE</span>}</span>
              </div>
              <div className="flex justify-between items-center text-xl text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-white/10 mt-1">
                <span className="font-semibold">Total</span>
                <span className="font-bold">₹{finalAmount}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="cart-checkout-form"
              disabled={isCheckoutDisabled}
              className={`w-full font-bold text-lg px-6 py-4 rounded-xl active:scale-95 transition-all flex justify-center items-center gap-2 ${
                isCheckoutDisabled 
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#25D366] hover:bg-[#20BE5A] text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)]'
              }`}
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}

    </motion.div>
  );
}
