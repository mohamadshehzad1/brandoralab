// content/blogs/sa/أفضل-استضافة-مواقع-في-السعودية.js
import React from "react";
import Link from "next/link";
import CTA from "@/components/Cta";
import SEO from "@/components/SEO";
import HostInfoBox from "@/components/HostInfoBox";

const SaudiHostingContent = () => {
  return (
    <main>
      {/* Cover / header */}
      <section className="relative w-full h-72 md:h-96 flex items-center justify-center bg-gray-800 text-white">
        <img
          src="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-saudi_xabcd.avif"
          alt="أفضل استضافة مواقع في السعودية 2025"
          className="w-full h-full object-cover opacity-70"
        />
      </section>

      <section className="container mx-auto px-5 md:px-0 max-w-3xl py-10 font-serif leading-relaxed text-lg text-gray-800 space-y-6">

        <h1 className="text-3xl font-bold mt-6">أفضل استضافة مواقع في السعودية لعام 2025</h1>
        <p>
          إذا كنت تفكر في إنشاء موقع إلكتروني جديد في السعودية سواء كان مدونة شخصية، متجر إلكتروني، أو موقع لشركتك
          فإن اختيار شركة استضافة مناسبة هو أول وأهم خطوة في نجاح موقعك.
        </p>

        <p>
          في هذا المقال سنعرض لك أهم مزودي خدمات الاستضافة في السعودية لعام 2025 مع مزايا وعيوب كل شركة حتى تتمكن من
          اتخاذ القرار الصحيح.
        </p>

        <h2 className="text-2xl font-bold mt-6">لماذا تحتاج إلى استضافة موثوقة؟</h2>
        <p>
          سرعة الموقع وأمانه واستقراره عوامل أساسية تؤثر مباشرة في تجربة الزوار وثقة العملاء. 
          الاستضافة الضعيفة قد تسبب بطء في التحميل أو انقطاع متكرر مما يؤدي إلى خسارة العملاء.
        </p>

        <section className="relative w-full aspect-[16/9] md:aspect-[21/9]">
          <img
            src="https://res.cloudinary.com/dpgspconw/image/upload/v1759154338/saudi-hosting-benefits_jkjd8d.avif"
            alt="مميزات الاستضافة في السعودية"
            className="w-full h-full object-cover opacity-70"
          />
        </section>

        <h2 className="text-2xl font-bold mt-6">أفضل شركات استضافة مواقع في السعودية 2025</h2>
        <p>
          اخترنا لك هذه الشركات بناءً على سرعة السيرفرات، دعم العملاء، السعر، وسهولة الاستخدام.
        </p>

        <h2 className="text-2xl font-bold mt-6">جدول المقارنة السريع</h2>

        {/* Desktop / Tablet View */}
        <div className="hidden md:block mt-4">
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-sm md:text-base text-left text-gray-700">
              <thead className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">الشركة</th>
                  <th className="px-4 py-3 font-semibold">الأفضل من أجل</th>
                  <th className="px-4 py-3 font-semibold">السعر المبدئي</th>
                  <th className="px-4 py-3 font-semibold">أبرز المزايا</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["بلوهوست", "المبتدئين ووردبريس", "$2.95/شهرياً", "تنصيب ووردبريس بنقرة واحدة"],
                  ["هوستجيتور", "الشركات الصغيرة", "$3.49/شهرياً", "دعم عملاء 24/7"],
                  ["سايت جراوند", "السرعة والأمان", "$2.99/شهرياً", "خوادم فائقة السرعة + نسخ احتياطي يومي"],
                  ["جودادي السعودية", "النطاقات مع الاستضافة", "$3.99/شهرياً", "أكبر مزود نطاقات مع استضافة سهلة"],
                  ["هوستنجر", "الميزانيات المحدودة", "$1.99/شهرياً", "أسعار منخفضة جداً + استضافة سريعة"],
                ].map(([host, best, price, feature], idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium bg-gradient-to-r from-indigo-50 to-blue-50">{host}</td>
                    <td className="px-4 py-3">{best}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{price}</td>
                    <td className="px-4 py-3">{feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View - Card Style */}
        <div className="grid gap-4 md:hidden mt-6">
          {[
            { host: "بلوهوست", best: "المبتدئين ووردبريس", price: "$2.95/شهرياً", feature: "تنصيب ووردبريس بنقرة واحدة" },
            { host: "هوستجيتور", best: "الشركات الصغيرة", price: "$3.49/شهرياً", feature: "دعم عملاء 24/7" },
            { host: "سايت جراوند", best: "السرعة والأمان", price: "$2.99/شهرياً", feature: "خوادم فائقة السرعة + نسخ احتياطي يومي" },
            { host: "جودادي السعودية", best: "النطاقات مع الاستضافة", price: "$3.99/شهرياً", feature: "أكبر مزود نطاقات مع استضافة سهلة" },
            { host: "هوستنجر", best: "الميزانيات المحدودة", price: "$1.99/شهرياً", feature: "أسعار منخفضة جداً + استضافة سريعة" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-2 text-white font-semibold">
                {item.host}
              </div>
              <div className="p-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">الأفضل من أجل:</span> {item.best}</p>
                <p>
                  <span className="font-medium">السعر:</span>{" "}
                  <span className="text-green-600 font-semibold">{item.price}</span>
                </p>
                <p><span className="font-medium">ميزة:</span> {item.feature}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-6">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">ما هي أرخص استضافة مواقع في السعودية؟</summary>
            <div className="mt-2 text-sm text-gray-700">
              أرخص خيار لعام 2025 هو هوستنجر بأسعار تبدأ من $1.99 شهرياً فقط.
            </div>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">هل يمكنني ترقية خطة الاستضافة لاحقاً؟</summary>
            <div className="mt-2 text-sm text-gray-700">
              نعم، معظم الشركات مثل بلوهوست وهوستجيتور تسمح بترقية الخطط بسهولة مع نمو موقعك.
            </div>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">هل أحتاج خبرة تقنية لبدء الاستضافة؟</summary>
            <div className="mt-2 text-sm text-gray-700">
              لا، جميع الشركات المذكورة توفر تنصيب ووردبريس بنقرة واحدة ولوحة تحكم سهلة.
            </div>
          </details>
        </div>

        {/* CTA */}
        <CTA
          heading="ابدأ موقعك الآن 🚀"
          offer="اختر أفضل استضافة من قائمتنا واطلق موقعك اليوم."
          buttonText="ابدأ الآن"
          buttonLink="https://bluehost.com"
        />
      </section>
    </main>
  );
};

/* Blog metadata + exported object */
const saudiHosting = {
  slug: "afdal-istidafat-mawaqe3-fi-als3wdia",
  title: "أفضل استضافة مواقع في السعودية 2025: أهم 5 شركات",
  author: "BrandoraLab",
  date: "أكتوبر 1, 2025",
  description:
    "دليلك لاختيار أفضل استضافة مواقع في السعودية لعام 2025. تعرف على الشركات الأعلى أداءً من حيث السرعة، الأمان، والدعم الفني.",
  imageUrl:
    "https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-saudi_xabcd.avif",
  keywords: [
    "أفضل استضافة مواقع في السعودية",
    "استضافة سعودية 2025",
    "أفضل شركات الاستضافة السعودية",
    "استضافة رخيصة في السعودية",
    "هوستنجر السعودية",
    "بلوهوست السعودية",
    "استضافة للمبتدئين في السعودية",
  ],
  content: SaudiHostingContent,
};

export default saudiHosting;
