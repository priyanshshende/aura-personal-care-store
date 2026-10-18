'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Truck,
  Sparkles,
  MapPin,
  Lock,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import CheckoutForm, { CustomerInfo, CheckoutFormErrors } from '../../components/checkout/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary';

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function validate(values: CustomerInfo): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!INDIAN_PHONE_REGEX.test(values.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';
  }

  if (!values.latitude || !values.longitude) {
    errors.latitude = 'Please click "Use My Current Location" to capture your GPS coordinates.';
    errors.location = 'GPS coordinates are required for delivery.';
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [values, setValues] = useState<CustomerInfo>({
    fullName: '',
    phoneNumber: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  function handleChange(field: keyof CustomerInfo, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (apiError) setApiError(null);
  }

  function handlePlaceOrder() {
    setApiError(null);
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorId = newErrors.fullName
        ? 'checkout-fullName'
        : newErrors.phoneNumber
        ? 'checkout-phoneNumber'
        : 'get-location-btn';
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById(firstErrorId)?.focus();
      return;
    }

    const payload = {
      name: values.fullName,
      phoneNumber: values.phoneNumber,
      latitude: values.latitude,
      longitude: values.longitude,
      items: items.map((item) => ({
        productId: item.product.product_id,
        quantity: item.quantity,
      })),
    };

    setIsPlacing(true);
    fetch('/api/orders/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        setIsPlacing(false);
        if (!res.ok) {
          const err = await res.json();
          setApiError(err.error || 'Failed to process your order. Please try again.');
          return;
        }
        clearCart();
        setOrderSuccess(true);
      })
      .catch((e) => {
        setIsPlacing(false);
        setApiError('Network connection issue. Please check your internet and try again.');
        console.error(e);
      });
  }

  // 1. Success State View
  if (orderSuccess) {
    return (
      <main className="container animate-fadeIn" style={{ padding: 'var(--space-12) var(--space-4)', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4) auto',
            }}
          >
            <CheckCircle2 size={42} className="animate-pop" />
          </div>

          <h1
            className="font-bold"
            style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '8px' }}
          >
            ✓ Order Placed Successfully!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Thank you, <strong style={{ color: 'var(--text-primary)' }}>{values.fullName || 'Customer'}</strong>. Your order notification and GPS delivery location have been successfully dispatched.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-6)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <p style={{ margin: 0 }}><strong>Phone:</strong> +91 {values.phoneNumber}</p>
            <p style={{ margin: 0 }}><strong>Delivery Mode:</strong> GPS Assisted Precision Delivery</p>
            <p style={{ margin: 0 }}><strong>Status:</strong> Notification Sent to Store</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => router.push('/products')}
              className="btn-interactive"
              style={{
                flex: 1,
                padding: '12px 20px',
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn-interactive"
              style={{
                flex: 1,
                padding: '12px 20px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 2. Empty Cart View
  if (items.length === 0) {
    return (
      <main className="container animate-fadeIn" style={{ padding: 'var(--space-16) var(--space-4)', minHeight: '60vh', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '460px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4) auto',
              color: 'var(--text-light)',
            }}
          >
            <ShoppingBag size={30} />
          </div>
          <h2 className="font-bold" style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: 'var(--space-6)' }}>
            Explore our curated personal care collection and add essentials to proceed.
          </p>
          <button
            onClick={() => router.push('/products')}
            className="btn-interactive"
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--text-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Explore Products
          </button>
        </div>
      </main>
    );
  }

  // Calculate pricing for Mobile CTA
  const subtotal = getSubtotal();
  const totalDiscount = items.reduce((acc, item) => {
    const sp = item.product.selling_price ?? item.product.mrp;
    const savings = (item.product.mrp - sp) * item.quantity;
    return acc + (savings > 0 ? savings : 0);
  }, 0);
  const DELIVERY_CHARGE = 49;
  const FREE_DELIVERY_THRESHOLD = 499;
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const orderTotal = subtotal - totalDiscount + deliveryCharge;

  return (
    <main className="container animate-fadeIn" style={{ padding: 'var(--space-8) var(--space-4) var(--space-16) var(--space-4)', maxWidth: '1080px' }}>
      {/* Checkout Header & Trust Banner */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)' }}>
          <div>
            <h1 className="font-bold" style={{ fontSize: '1.75rem', color: 'var(--text-primary)', margin: 0 }}>
              Secure Checkout
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Complete your order with instant GPS doorstep delivery
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              color: 'var(--secondary-color)',
              fontWeight: 600,
            }}
          >
            <Lock size={14} />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* Inline API Error Card */}
      {apiError && (
        <div
          className="animate-slideUp"
          style={{
            backgroundColor: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#dc2626', margin: '0 0 2px 0' }}>
              Order Submission Error
            </h4>
            <p style={{ fontSize: '13px', color: '#991b1b', margin: 0, lineHeight: 1.4 }}>
              {apiError}
            </p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isPlacing}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#dc2626',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Checkout Layout Grid */}
      <div
        className="checkout-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--space-8)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Form & Delivery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <CheckoutForm values={values} errors={errors} onChange={handleChange} />

          {/* Value Assurances Banner */}
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Truck size={16} color="var(--secondary-color)" />
              <span>Fast Doorstep Dispatch</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--secondary-color)" />
              <span>100% Genuine Products</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <OrderSummary />

          {/* Place Order CTA Button */}
          <button
            id="place-order-btn"
            disabled={isPlacing}
            onClick={handlePlaceOrder}
            className="btn-interactive"
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: isPlacing ? 'var(--text-light)' : 'var(--text-primary, #2d2a26)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '16px',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: isPlacing ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            }}
          >
            {isPlacing ? (
              <>
                <Loader2 size={20} className="animate-spin-slow" />
                <span>Placing your order...</span>
              </>
            ) : (
              <>
                <ShoppingBag size={20} />
                <span>🛍️ Place Order • ₹{orderTotal.toFixed(2)}</span>
              </>
            )}
          </button>

          <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-light)', margin: 0 }}>
            By placing the order, you confirm acceptance of our delivery terms.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
        }
      `}</style>
    </main>
  );
}

