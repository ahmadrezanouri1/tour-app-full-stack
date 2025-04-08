
// import { useState } from 'react'

// export default function Hero() {
//   const [tourType, setTourType] = useState('domestic')

//   return (
//     <div className="relative h-[600px] bg-cover bg-center" 
//          style={{ 
//            backgroundImage: tourType === 'domestic' 
//              ? 'url(https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg)' 
//              : 'url(https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg)'
//          }}>
//       <div className="absolute inset-0 bg-black/50"></div>
      
//       <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
//           با لست سکند، سفری به یادماندنی را تجربه کنید
//         </h1>
        
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//           <div className="flex gap-4 mb-6">
//             <button 
//               onClick={() => setTourType('domestic')}
//               className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
//                 tourType === 'domestic' 
//                   ? 'bg-primary text-white' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               تورهای داخلی
//             </button>
//             <button 
//               onClick={() => setTourType('foreign')}
//               className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
//                 tourType === 'foreign' 
//                   ? 'bg-primary text-white' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               تورهای خارجی
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <label className="block text-gray-700 text-sm mb-2">مقصد</label>
//               <select className="w-full p-3 border rounded-lg">
//                 <option>انتخاب مقصد</option>
//                 {tourType === 'domestic' ? (
//                   <>
//                     <option>کیش</option>
//                     <option>قشم</option>
//                     <option>مشهد</option>
//                   </>
//                 ) : (
//                   <>
//                     <option>استانبول</option>
//                     <option>دبی</option>
//                     <option>آنتالیا</option>
//                   </>
//                 )}
//               </select>
//             </div>
            
//             <div className="relative">
//               <label className="block text-gray-700 text-sm mb-2">تاریخ رفت</label>
//               <input type="date" className="w-full p-3 border rounded-lg" />
//             </div>
            
//             <div className="relative">
//               <label className="block text-gray-700 text-sm mb-2">تعداد نفرات</label>
//               <select className="w-full p-3 border rounded-lg">
//                 <option>۱ نفر</option>
//                 <option>۲ نفر</option>
//                 <option>۳ نفر</option>
//                 <option>۴ نفر</option>
//                 <option>بیشتر</option>
//               </select>
//             </div>
//           </div>
          
//           <button className="w-full mt-6 bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
//             جستجوی تور
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// } 
"use client";

import { useState } from "react";

export default function Hero() {
  const [isForeign, setIsForeign] = useState(true);

  return (
    <div className="hero">
      <h1>با مسافر سفر کن</h1>
      <p>مرجع  تور های زیارتی تفریحی و کویر و جنگل </p>

      <div className="tour-buttons">
        <button
          className={`tour-button foreign-tours ${isForeign ? "active" : ""}`}
          onClick={() => setIsForeign(true)}
        >
          تورهای خارجی 🌎
        </button>
        <button
          className={`tour-button domestic-tours ${!isForeign ? "active" : ""}`}
          onClick={() => setIsForeign(false)}
        >
          تور های داخلی 🏠
        </button>
      </div>

      <div className="window-views">
        {[1, 2, 3].map((item, index) => (
          <div className="plane-window" key={index}>
            {isForeign ? (
              <img
                src={
                  [
                    "/logo.png",
                    "/logo.png",
                    "/logo.png",
                  ][index]
                }
                alt="foreign view"
              />
            ) : (
              <img
                src={
                  [
                    "https://images.pexels.com/photos/1631665/pexels-photo-1631665.jpeg",
                    "https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg",
                    "https://images.pexels.com/photos/1646311/pexels-photo-1646311.jpeg",
                  ][index]
                }
                alt="domestic view"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
