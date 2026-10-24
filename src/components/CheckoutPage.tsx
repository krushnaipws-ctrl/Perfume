import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  Lock,
  Sparkles,
  CheckCircle,
  QrCode,
  Banknote,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shipping,
    discountAmount,
    discountCode,
    total,
    placeOrder,
    navigateTo,
  } = useShop();

  const [fullName, setFullName] = useState('Krushna Kumar');
  const [email, setEmail] = useState('krushna.ipws@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('42 Altamount Road, Penthouse Suite');
  const [city, setCity] = useState('Mumbai');
  const [postalCode, setPostalCode] = useState('400026');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // UPI details
  const [upiId, setUpiId] = useState('krushna@okhdfcbank');

  const deliveryCost = deliveryMethod === 'priority' ? 450 : shipping;
  const finalTotal = subtotal - discountAmount + deliveryCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
        deliveryMethod: deliveryMethod === 'priority' ? 'VIP Next-Day Priority Courier' : 'Complimentary White Glove Courier',
        paymentMethod: paymentMethod === 'card' ? 'Credit / Debit Card (Online)' : paymentMethod === 'upi' ? 'UPI Instant Transfer' : 'Cash on Delivery',
      });
      setIsSubmitting(false);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#0a0a0b] text-[#e8e4dc]">
        <h2 className="font-serif text-3xl text-[#f8f6f0] mb-3">Your Bag is Empty</h2>
        <p className="text-xs text-[#8e8a82] mb-6">
          Please add a luxury flacon to your bag prior to entering the private checkout portal.
        </p>
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="px-6 py-3 bg-[#c5a880] text-[#0a0a0b] text-xs uppercase tracking-wider font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0b] text-[#e8e4dc] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8e8a82] hover:text-[#c5a880] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Boutique</span>
        </button>

        {/* Demo Mode Notice */}
        <div className="mb-8 p-4 bg-[#181820] border border-[#c5a880]/30 flex items-start gap-3 text-xs text-[#d0ccc4]">
          <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#f8f6f0] block uppercase tracking-wider text-[11px]">
              Demonstration Concierge Checkout
            </strong>
            <span>
              This is a demonstration boutique simulation. Real payment cards are not charged. Feel free to complete the checkout to experience our signature confirmation receipt.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Customer and Shipping Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#c5a880] mb-2">
                <span>01. Collector Details</span>
              </div>
              <h2 className="font-serif text-2xl text-[#f8f6f0] mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                    Email for Dispatch Tracking
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                    Mobile Phone (for Courier Coordination)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#c5a880] mb-2">
                <span>02. Delivery Destination</span>
              </div>
              <h2 className="font-serif text-2xl text-[#f8f6f0] mb-6">
                Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                    Street Address & Suite / Floor
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                      Postal Code / PIN
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full bg-[#18181e] border border-[#2c2c36] px-3.5 py-2.5 text-xs text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Methods */}
              <div className="mt-6 pt-6 border-t border-[#232328]">
                <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-3">
                  Select Courier Method
                </label>
                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                      deliveryMethod === 'standard'
                        ? 'border-[#c5a880] bg-[#1a1a20]'
                        : 'border-[#26262e] bg-[#141418] hover:border-[#383842]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#c5a880]" />
                      <div>
                        <span className="text-xs font-semibold text-[#f8f6f0] block">
                          Complimentary White Glove Courier
                        </span>
                        <span className="text-[11px] text-[#8e8a82]">
                          Dispatched in temperature-controlled protective casing (2-3 business days)
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#c5a880]">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('priority')}
                    className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                      deliveryMethod === 'priority'
                        ? 'border-[#c5a880] bg-[#1a1a20]'
                        : 'border-[#26262e] bg-[#141418] hover:border-[#383842]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#c5a880]" />
                      <div>
                        <span className="text-xs font-semibold text-[#f8f6f0] block">
                          VIP Priority Next-Day Express
                        </span>
                        <span className="text-[11px] text-[#8e8a82]">
                          Guaranteed next-day delivery with hand-written calligraphy gift card
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#f8f6f0]">
                      ₹450
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#c5a880] mb-2">
                <span>03. Secure Settlement</span>
              </div>
              <h2 className="font-serif text-2xl text-[#f8f6f0] mb-6">
                Payment Option
              </h2>

              <div className="space-y-4">
                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#c5a880] bg-[#1a1a20] text-[#f8f6f0]'
                        : 'border-[#26262e] bg-[#141418] text-[#8e8a82]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[11px] font-medium tracking-wider uppercase">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-2 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-[#c5a880] bg-[#1a1a20] text-[#f8f6f0]'
                        : 'border-[#26262e] bg-[#141418] text-[#8e8a82]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-[11px] font-medium tracking-wider uppercase">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'cod'
                        ? 'border-[#c5a880] bg-[#1a1a20] text-[#f8f6f0]'
                        : 'border-[#26262e] bg-[#141418] text-[#8e8a82]'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span className="text-[11px] font-medium tracking-wider uppercase">COD</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#16161c] border border-[#282832] space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#8e8a82] mb-1">
                        Card Number (Demo)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#121215] border border-[#2a2a32] px-3 py-2 text-xs font-mono text-[#f8f6f0]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#8e8a82] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#121215] border border-[#2a2a32] px-3 py-2 text-xs font-mono text-[#f8f6f0]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#8e8a82] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-[#121215] border border-[#2a2a32] px-3 py-2 text-xs font-mono text-[#f8f6f0]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Fields */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-[#16161c] border border-[#282832] space-y-2 text-xs">
                    <label className="block text-[10px] uppercase tracking-wider text-[#8e8a82]">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-[#121215] border border-[#2a2a32] px-3 py-2 text-xs text-[#f8f6f0]"
                    />
                    <p className="text-[11px] text-[#8e8a82]">
                      Supported: Google Pay, PhonePe, Paytm, BHIM, Cred.
                    </p>
                  </div>
                )}

                {/* COD Terms */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#16161c] border border-[#282832] text-xs text-[#a8a49c] space-y-2">
                    <p className="text-[#f8f6f0] font-medium">
                      Cash on Delivery (White Glove Handover)
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      You may inspect the outer luxury presentation box and settle the total of ₹{finalTotal.toLocaleString('en-IN')} via cash or card upon delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#121215] border border-[#232328] p-6 sm:p-8 sticky top-28 space-y-6">
            <h3 className="font-serif text-xl text-[#f8f6f0] pb-4 border-b border-[#232328]">
              Order Summary ({cart.length} Flacons)
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2 divide-y divide-[#1f1f26]">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover border border-[#282832]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-[#f8f6f0] truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-[#8e8a82]">
                      {item.selectedSize} · Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#f8f6f0] tabular-nums">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Costs calculation */}
            <div className="pt-4 border-t border-[#232328] space-y-2 text-xs text-[#a8a49c]">
              <div className="flex justify-between">
                <span>Flacons Subtotal</span>
                <span className="font-mono text-[#f8f6f0] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#c5a880]">
                  <span>Privilège Discount ({discountCode})</span>
                  <span className="font-mono tabular-nums">
                    -₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Dispatch</span>
                <span className="font-mono text-[#f8f6f0] tabular-nums">
                  {deliveryCost === 0 ? 'Complimentary' : `₹${deliveryCost}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#232328] flex justify-between items-baseline text-sm font-semibold text-[#f8f6f0]">
                <span>Grand Total</span>
                <span className="font-mono text-xl text-[#c5a880] tabular-nums">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#c5a880]/15 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Securing Luxury Flacon Allocation...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Confirm Order · ₹{finalTotal.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="pt-4 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8e8a82]">
                <CheckCircle className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>256-Bit Encrypted Haute Commerce Security</span>
              </div>
              <p className="text-[10px] text-[#726e67]">
                Includes 2 complimentary tester vials & certified seal of origin.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
