import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, navigateTo } = useShop();

  if (!lastOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#0a0a0b] text-[#e8e4dc]">
        <h2 className="font-serif text-3xl mb-4">No Recent Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-[#c5a880] text-[#0a0a0b] text-xs uppercase tracking-wider font-semibold"
        >
          Return to Maison
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0b] text-[#e8e4dc] min-h-screen py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-[#121215] border border-[#232328] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle gold accent border at top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

          {/* Badge */}
          <div className="w-16 h-16 rounded-full bg-[#1c1c22] border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#c5a880]/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.28em] text-[#c5a880] block mb-2">
            Order Confirmed & Registered
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide mb-3">
            Thank You for Entrusting Us
          </h1>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Your flacon allocation has been reserved. Our master bottlers in Grasse are currently packaging your fragrance with bespoke velvet casing and personalized wax seal.
          </p>

          {/* Order Details Strip */}
          <div className="bg-[#18181e] border border-[#26262e] p-6 text-left mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#8e8a82] block uppercase text-[10px] tracking-wider">
                Order Identifier
              </span>
              <span className="font-mono text-[#f8f6f0] font-semibold text-sm">
                {lastOrder.orderId}
              </span>
            </div>
            <div>
              <span className="text-[#8e8a82] block uppercase text-[10px] tracking-wider">
                Registered Date
              </span>
              <span className="text-[#f8f6f0] font-medium">{lastOrder.date}</span>
            </div>
            <div>
              <span className="text-[#8e8a82] block uppercase text-[10px] tracking-wider">
                Settlement
              </span>
              <span className="text-[#c5a880] font-medium">
                {lastOrder.customer.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-[#8e8a82] block uppercase text-[10px] tracking-wider">
                Total Amount
              </span>
              <span className="font-mono text-[#f8f6f0] font-semibold text-sm tabular-nums">
                ₹{lastOrder.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Itemized List */}
          <div className="border-t border-b border-[#232328] py-6 text-left space-y-4 mb-8">
            <h3 className="font-serif text-lg text-[#f8f6f0] mb-3">
              Flacons & Allocations
            </h3>
            {lastOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover border border-[#2a2a32]"
                  />
                  <div>
                    <h4 className="font-serif text-sm text-[#f8f6f0]">{item.product.name}</h4>
                    <span className="text-[#8e8a82]">
                      {item.selectedSize} · Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-sm text-[#f8f6f0] tabular-nums">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Coordinates */}
          <div className="bg-[#18181e] p-5 text-left text-xs text-[#a8a49c] mb-8 space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold mb-1">
              Dispatch Destination & Recipient
            </div>
            <p className="text-[#f8f6f0] font-medium">{lastOrder.customer.fullName}</p>
            <p>{lastOrder.customer.address}, {lastOrder.customer.city} — {lastOrder.customer.postalCode}</p>
            <p>Coordination Contact: {lastOrder.customer.phone} · {lastOrder.customer.email}</p>
            <p className="text-[#c5a880] pt-1 flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Courier: {lastOrder.customer.deliveryMethod}</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-[#3b3b48] hover:border-[#c5a880] text-xs text-[#a8a49c] hover:text-[#c5a880] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Luxury Receipt</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="px-8 py-3 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore More Creations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
