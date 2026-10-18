'use client';

import React, { useState } from 'react';
import { User, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  location: string;
  latitude?: string;
  longitude?: string;
}

export interface CheckoutFormErrors {
  fullName?: string;
  phoneNumber?: string;
  location?: string;
  latitude?: string;
  longitude?: string;
}

interface CheckoutFormProps {
  values: CustomerInfo;
  errors: CheckoutFormErrors;
  onChange: (field: keyof CustomerInfo, value: string) => void;
}

export default function CheckoutForm({ values, errors, onChange }: CheckoutFormProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const hasLocation = Boolean(values.latitude && values.longitude);

  const handleGetLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        onChange('latitude', latitude.toString());
        onChange('longitude', longitude.toString());
        onChange('location', `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`);
      },
      (err) => {
        setIsLocating(false);
        setLocationError(`Unable to retrieve location (${err.message}). Please allow location permissions.`);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* 1. Customer Information Card */}
      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-5)' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-color, #5c6b61)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            1
          </div>
          <h2
            className="font-bold"
            style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}
          >
            Customer Information
          </h2>
        </div>

        {/* Full Name Field */}
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <label
            htmlFor="checkout-fullName"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            <User size={15} color="var(--text-secondary)" />
            <span>Full Name</span>
            <span style={{ color: 'var(--error)' }}>*</span>
          </label>
          <input
            id="checkout-fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Priyansh Sharma"
            value={values.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: errors.fullName ? '1.5px solid var(--error)' : '1px solid var(--border-dark)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--text-primary)',
              backgroundColor: '#ffffff',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--error)',
                marginTop: '4px',
                fontWeight: 500,
              }}
            >
              <AlertCircle size={13} />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="checkout-phoneNumber"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            <Phone size={15} color="var(--text-secondary)" />
            <span>Mobile Phone Number</span>
            <span style={{ color: 'var(--error)' }}>*</span>
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                userSelect: 'none',
              }}
            >
              🇮🇳 +91
            </span>
            <input
              id="checkout-phoneNumber"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={values.phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
              style={{
                width: '100%',
                padding: '12px 14px 12px 78px',
                border: errors.phoneNumber ? '1.5px solid var(--error)' : '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                backgroundColor: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              aria-invalid={!!errors.phoneNumber}
            />
          </div>
          {errors.phoneNumber && (
            <p
              id="phoneNumber-error"
              role="alert"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--error)',
                marginTop: '4px',
                fontWeight: 500,
              }}
            >
              <AlertCircle size={13} />
              {errors.phoneNumber}
            </p>
          )}
          <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>
            We will use this phone number for order verification & delivery updates.
          </p>
        </div>
      </section>

      {/* 2. GPS Delivery Location Card */}
      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-color, #5c6b61)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            2
          </div>
          <div>
            <h2
              className="font-bold"
              style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}
            >
              Delivery Location
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Quick one-tap GPS coordinate detection
            </p>
          </div>
        </div>

        {/* Location Status Display / Button */}
        <div
          style={{
            backgroundColor: hasLocation ? '#f0fdf4' : 'var(--bg-secondary)',
            border: hasLocation ? '1.5px solid #86efac' : '1px dashed var(--border-dark)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            transition: 'all 0.3s ease',
          }}
        >
          {hasLocation ? (
            /* Success State */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={22} color="#15803d" className="animate-pop" />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#15803d', margin: 0 }}>
                      Location Detected & Verified ✓
                    </p>
                    <p style={{ fontSize: '12px', color: '#166534', margin: 0 }}>
                      Coordinates: {values.latitude?.slice(0, 8)}, {values.longitude?.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="btn-interactive"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#15803d',
                    backgroundColor: '#dcfce7',
                    border: '1px solid #86efac',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                  }}
                >
                  {isLocating ? 'Updating...' : 'Update GPS'}
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                }}
              >
                <MapPin size={13} color="#15803d" />
                <span>Google Maps route link will be automatically attached for your delivery agent.</span>
              </div>
            </div>
          ) : (
            /* Idle or Detecting State */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--secondary-color)',
                  }}
                >
                  <MapPin size={22} />
                </div>
              </div>

              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Capture Precise Delivery GPS
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  No long addresses needed! Click below to capture your current location.
                </p>
              </div>

              <button
                type="button"
                id="get-location-btn"
                disabled={isLocating}
                onClick={handleGetLocation}
                className="btn-interactive"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--secondary-color, #5c6b61)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: isLocating ? 'wait' : 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                {isLocating ? (
                  <>
                    <Loader2 size={16} className="animate-spin-slow" />
                    <span>Detecting your location...</span>
                  </>
                ) : (
                  <>
                    <MapPin size={16} />
                    <span>📍 Use My Current Location</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Error Messages */}
        {(locationError || errors.location || errors.latitude) && (
          <div
            style={{
              marginTop: 'var(--space-3)',
              padding: '8px 12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--error)',
            }}
          >
            <AlertCircle size={14} />
            <span>{locationError || errors.location || errors.latitude || 'Please capture your GPS location.'}</span>
          </div>
        )}
      </section>
    </div>
  );
}

