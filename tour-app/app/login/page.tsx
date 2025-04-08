'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const startTimer = () => {
    setTimer(120);
    setIsResendDisabled(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOTP) {
      // Handle phone/email submission
      setShowOTP(true);
      startTimer();
    } else {
      // Handle OTP verification
      console.log('Verifying OTP:', otpCode);
    }
  };

  const handleResendCode = () => {
    // Handle resend code logic here
    startTimer();
    setOtpCode('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
     

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex justify-center items-start">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-2">
              {showOTP ? 'تایید کد یکبار مصرف' : 'ورود یا ثبت‌نام'}
            </h1>
            <p className="text-gray-600 text-sm">
              {showOTP 
                ? `کد تایید به شماره ${phoneNumber} ارسال شد`
                : 'شماره موبایل یا ایمیل خود را وارد کنید'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!showOTP ? (
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="شماره موبایل یا ایمیل"
                    dir="rtl"
                  />
                  {phoneNumber && (
                    <button
                      type="button"
                      onClick={() => setPhoneNumber('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg tracking-widest"
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {isResendDisabled 
                      ? `زمان باقی‌مانده تا درخواست مجدد: ${formatTime(timer)}`
                      : 'کد را دریافت نکردید؟'
                    }
                  </p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className={`text-sm ${isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-primary-dark'}`}
                    disabled={isResendDisabled}
                  >
                    ارسال مجدد کد
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowOTP(false);
                    setOtpCode('');
                  }}
                  className="text-sm text-primary hover:text-primary-dark w-full text-center mt-4"
                >
                  تغییر شماره موبایل
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors mt-6"
            >
              {showOTP ? 'تایید' : 'ادامه'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              ورود یا ثبت‌نام شما در فلای‌تودی به منزله پذیرش{' '}
              <Link href="/terms" className="text-primary">
                قوانین و مقررات
              </Link>{' '}
              استفاده از سرویس‌های فلای‌تودی و قوانین حریم خصوصی است
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-4">
            <Link href="/flights/domestic" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              پرواز داخلی
            </Link>
            <Link href="/flights/international" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              پرواز خارجی
            </Link>
            <Link href="/hotels/domestic" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              هتل داخلی
            </Link>
            <Link href="/hotels/international" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              هتل خارجی
            </Link>
          </div>
          <div className="space-y-4">
            <Link href="/train" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              قطار
            </Link>
            <Link href="/tours" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              تور
            </Link>
            <Link href="/bus" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              اتوبوس
            </Link>
          </div>
          <div className="space-y-4">
            <Link href="/insurance" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              بیمه مسافرتی
            </Link>
            <Link href="/visa" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              ویزا
            </Link>
          </div>
          <div className="space-y-4">
            <Link href="/tracking" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              پیگیری خرید
            </Link>
            <Link href="/magazine" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              مجله گردشگری
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 