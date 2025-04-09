'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Phone number, 2: OTP verification
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/otp/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('کد تایید ارسال شد');
        setStep(2);
      } else {
        toast.error(data.error || 'خطا در ارسال کد تایید');
      }
    } catch (error) {
      toast.error('خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/otp/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          code: otp,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token in cookie
        Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
        Cookies.set('user_id', data.user_id, { expires: 7 });
        Cookies.set('username', data.username, { expires: 7 });

        toast.success('ورود موفقیت‌آمیز');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'خطا در تایید کد');
      }
    } catch (error) {
      toast.error('خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#c19a6b] opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#006b54] opacity-10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-bold text-[#c19a6b] font-[Vazirmatn]">
              {step === 1 ? 'شماره موبایل خود را وارد کنید' : 'کد تایید را وارد کنید'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-[Vazirmatn]">
              {step === 1 ? 'برای ورود به حساب کاربری' : 'کد ارسال شده به شماره شما'}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}>
            <div className="rounded-md shadow-sm -space-y-px">
              {step === 1 ? (
                <div>
                  <input
                    id="phone-number"
                    name="phone_number"
                    type="tel"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-[#c19a6b] bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c19a6b] focus:border-[#c19a6b] sm:text-sm font-[Vazirmatn]"
                    placeholder="شماره موبایل"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    dir="rtl"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-[#c19a6b] bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c19a6b] focus:border-[#c19a6b] sm:text-sm font-[Vazirmatn]"
                      placeholder="کد تایید"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-3 py-3 border border-[#c19a6b] bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c19a6b] focus:border-[#c19a6b] sm:text-sm font-[Vazirmatn]"
                      placeholder="نام کاربری"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-[#c19a6b] bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c19a6b] focus:border-[#c19a6b] sm:text-sm font-[Vazirmatn]"
                      placeholder="رمز عبور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      dir="rtl"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c19a6b] hover:bg-[#b08a5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c19a6b] transition-colors duration-200 font-[Vazirmatn]"
              >
                {loading ? 'در حال بارگذاری...' : step === 1 ? 'ارسال کد تایید' : 'تایید و ورود'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 