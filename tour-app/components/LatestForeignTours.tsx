// import { FaPlaneArrival, FaPlaneDeparture, FaClock } from 'react-icons/fa'

const latestTours = [
  {
    id: 1,
    nights: 3,
    title: 'تور دبی فروردین ۱۴۰۴',
    agency: 'آژانس: اوج ماندگار پرواز',
    departure: '۱۴۰۴/۰۱/۱۵ - ۰۸:۰۰',
    return: '۱۴۰۴/۰۱/۱۸ - ۱۲:۰۰',
    price: '۲۵,۰۰۰,۰۰۰',
    installments: '۶ قسط ۴,۱۶۶,۰۰۰ تومانی'
  },
  {
    id: 2,
    nights: 4,
    title: 'تور استانبول فروردین ۱۴۰۴',
    agency: 'آژانس: سفرهای ماندگار',
    departure: '۱۴۰۴/۰۱/۱۶ - ۰۹:۳۰',
    return: '۱۴۰۴/۰۱/۲۰ - ۱۱:۰۰',
    price: '۳۰,۰۰۰,۰۰۰',
    installments: '۶ قسط ۵,۰۰۰,۰۰۰ تومانی'
  },
  {
    id: 3,
    nights: 5,
    title: 'تور آنتالیا فروردین ۱۴۰۴',
    agency: 'آژانس: گردشگران برتر',
    departure: '۱۴۰۴/۰۱/۱۷ - ۱۰:۰۰',
    return: '۱۴۰۴/۰۱/۲۲ - ۱۳:۳۰',
    price: '۳۵,۰۰۰,۰۰۰',
    installments: '۶ قسط ۵,۸۳۳,۰۰۰ تومانی'
  }
]

export default function LatestForeignTours() {
  return (
    <section className="latest-tours container mx-auto">
      <div className="latest-tour-header">
        <h2 className="section-title text-center">جدیدترین تورهای خارجی</h2>
        <a href="#" className="see-all-tours text-center block mt-4">
          مشاهده تمام تورها &larr;
        </a>
      </div>

      <div className="latest-tour-cards my-3">
        {latestTours.map((tour) => (
          <div key={tour.id} className="latest-tour-card">
            <div className="tour-details">
              <div className="nights-count">{tour.nights} شب</div>

              <div className="tour-main-info text-center">
                <h3 className="tour-title">{tour.title}</h3>
                <div className="tour-agency">{tour.agency}</div>

                <div className="tour-times">
                  <div className="time-detail justify-center">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c5ce7'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 14.293L11 11V6h2v4.414l4.707 4.707-1.414 1.172z'/%3E%3C/svg%3E"
                      alt="time"
                    />
                    ساعت رفت: {tour.departure}
                  </div>

                  <div className="time-detail justify-center">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c5ce7'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.293 14.293L11 11V6h2v4.414l4.707 4.707-1.414 1.172z'/%3E%3C/svg%3E"
                      alt="time"
                    />
                    ساعت برگشت: {tour.return}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="price-value">{tour.price} تومان</div>
                  <div className="installment-badge mt-2">{tour.installments}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 