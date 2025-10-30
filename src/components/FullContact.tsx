import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Cpu,
  Heart,
  UserCheck,
  Phone,
  MapPin,
  Award,
  ArrowDownIcon
} from 'lucide-react';
import instagram from '@/images/icons8-instagram-48.png'
import telegram from '@/images/icons8-telegram-logo-50.png';
import correct from '@/images/icons8-correct-100.png'
import advantage from '@/images/icons8-advantage-34.png'
import contact from '@/images/icons8-contact-58.png'

import index from '@/images/Hamkorlarimiz/photo_2025-09-19_18-01-10.jpg'
import xalq from '@/images/Hamkorlarimiz/photo_2025-09-19_18-01-41.jpg'
import huquq from '@/images/Hamkorlarimiz/photo_2025-09-19_18-01-46.jpg'
import m1 from '@/images/mahsulot/image copy 2.png'
import m2 from '@/images/mahsulot/image copy 16.png'
import m3 from '@/images/mahsulot/image copy 15.png'
import m4 from '@/images/mahsulot/image copy 7.png'
import m5 from '@/images/mahsulot/image copy 8.png'
import m6 from '@/images/mahsulot/image copy 9.png'
import m7 from '@/images/mahsulot/image copy 10.png'
import m8 from '@/images/mahsulot/image copy 11.png'
import m9 from '@/images/mahsulot/image copy.png'
import m10 from '@/images/mahsulot/image.png'
import Carousel from './Carousel';
import cofee from '@/images/Hamkorlarimiz/cofelitto.png'
import maxw from '@/images/Hamkorlarimiz/maxw.png'



// Key Features Data
const KEY_FEATURES = [
  {
    icon: Clock,
    title: 'Qurilish tezligi',
    description: 'An\'anaviy g\'isht yoki beton binolarga qaraganda, metall konstruksiya qismlari oldindan tayyorlanadi va joyida tez yig\'iladi. Bu vaqt va mehnatni tejaydi.',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: UserCheck,
    title: 'Mustahkamlik va chidamlilik',
    description: 'Metall konstruksiyalar zilzilaga, shamolga va boshqa tashqi ta\'sirlarga bardoshli. Yillar davomida shaklini yo\'qotmaydi.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Cpu,
    title: 'Arzonroq xarajat',
    description: 'Qurilish materiali va vaqt kam sarflangani uchun umumiy narx ham nisbatan past bo\'ladi. Uzoq muddatda ta\'mirlash xarajatlari ham kamroq bo\'ladi.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Heart,
    title: 'Ko\'chirish va kengaytirish imkoniyati',
    description: 'Metall konstruksiya modulli bo\'lgani uchun keyinchalik do\'konni kattalashtirish yoki boshqa joyga ko\'chirish osonroq.',
    color: 'from-pink-500 to-rose-500'
  }
] as const;

const COMPANY_ADVANTAGES = [
  'Sifat va mustahkamlik – ishlatiladigan materiallar yuqori darajali va bardoshli.',
  'Tezkorlik – qisqa vaqt ichida qurilish va o\'rnatish ishlari yakunlanadi.',
  'Hamyonbop narxlar – byudjetingizga mos keladigan yechimlar taklif qilamiz.',
  'Professional jamoa: Bizning jamoamiz malakali va tajribali mutaxassislardan iborat.',
  'Kafolat – har bir qurilgan konstruksiya kafolat bilan topshiriladi.',
  'Mijozlarga yo\'naltirilgan yondashuv: Biz mijozlarimizning ehtiyojlarini tushunishga va ularga mos yechimlar taklif qilishga intilamiz.',
  'Bizda oddiy ustalar emas, balki o‘z ishining haqiqiy mutaxassislari xizmat ko‘rsatadi.',
  'Ishlab chiqarishning barcha bosqichlari nazorat ostida amalga oshiriladi.',
];

const SERVICES = [
  'Do\'kon va savdo nuqtalari – qisqa vaqt ichida qurib, foydalanishga tayyor qilib beramiz.',
  'Omborxonalar – katta maydonli, keng va xavfsiz konstruksiyalar.',
  'Angarlar – qishloq xo\'jaligi, ishlab chiqarish yoki texnika saqlash uchun qulay variant.',
  'Avtoturargohlar – transport vositalaringiz uchun mustahkam va ishonchli joy.',
  'Pavilyon va ustaxonalar – kichik biznes va servis xizmatlari uchun ideal yechim.',
  'Individual buyurtmalar – siz o\'ylagan maxsus metal konstruksiyani loyihalab, sifatli qilib yasab beramiz.'
];

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'accent';
}

interface AnimationVariants {
  fadeInLeft: any;
  fadeInRight: any;
  fadeInUp: any;
  stagger: any;
  scaleIn: any;
}

// Components
const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  className = "",
  gradient = false
}) => (
  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 ${gradient
    ? 'bg-gradient-to-r from-teal-600 via-yellow-600 to-cyan-600 bg-clip-text text-transparent'
    : 'text-slate-800'
    } ${className}`}>
    {children}
  </h2>
);

const InfoCard: React.FC<InfoCardProps> = ({
  children,
  className = "",
  variant = 'default'
}) => {
  const baseClasses = "p-3 md:p-4 mb-2 md:mb-4 backdrop-blur-sm";

  const variantClasses = {
    default: "bg-white/90",
    gradient: "bg-gradient-to-br from-white/95 via-teal-50/90 to-cyan-50/90",
    accent: "bg-gradient-to-br from-yellow-50/90 to-orange-50/90 border border-yellow-200/50"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

const createAnimationVariants = (prefersReducedMotion: boolean): AnimationVariants => ({
  fadeInLeft: {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: prefersReducedMotion ? 0.1 : 0.8, ease: 'easeOut' }
  },
  fadeInRight: {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: prefersReducedMotion ? 0.1 : 0.8, ease: 'easeOut' }
  },
  fadeInUp: {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0.1 : 0.6, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeOut' }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  }
});

const FullContact: React.FC = () => {
  const prefersReducedMotion = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const variants = useMemo(() => createAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);
  const carouselRef = useRef<HTMLDivElement>(null); // Div elementi uchun aniq tur
  const animationRef = useRef<number | null>(null); // Animation frame ID uchun tur

  const partners = [
    index, // O'rnini rasmlar bilan almashtiring
    xalq,
    huquq,
    cofee,
    maxw,
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Harakat tezligi (px/so'z)
    const itemWidth = 120; // Har bir rasmning kengligi (mobil uchun 120px)

    const animate = () => {
      if (!carousel) {
        return;
      }
      scrollPosition -= scrollSpeed;
      if (scrollPosition <= -itemWidth) {
        scrollPosition += itemWidth;
        if (carousel.firstChild) {
          carousel.appendChild(carousel.firstChild as Node); // Cheksiz aylanish uchun oxiriga qo'shish
        }
      }
      // Bu yerda optional chaining o'rniga to'g'ridan-to'g'ri ishlatish mumkin, chunki carousel null emas tushundingmi?
      carousel.style.transform = `translateX(${scrollPosition}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const rows = [
    // Birinchi qator - chapga (barcha rasmlar bir xil height)
    [
      {
        src: m1,
        width: 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Kichik do\'kon'
      },
      {
        src: m2,
        width: 'w-[210px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px]',
        alt: 'Katta do\'kon'
      },
      {
        src: m3,
        width: 'w-[200px] sm:w-[170px] md:w-[190px] lg:w-[210px] xl:w-[230px]',
        alt: 'O\'rta do\'kon'
      },
      {
        src: m4,
        width: 'w-[200px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Keng do\'kon'
      },
      {
        src: m5,
        width: 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Tor do\'kon'
      }
    ],
    // Ikkinchi qator - o'ngga (barcha rasmlar bir xil height)
    [
      {
        src: m6,
        width: 'w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] xl:w-[210px]',
        alt: 'Modern do\'kon'
      },
      {
        src: m7,
        width: 'w-[150px] sm:w-[170px] md:w-[190px] lg:w-[210px] xl:w-[230px]',
        alt: 'Zamonaviy do\'kon'
      },
      {
        src: m8,
        width: 'w-[170px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Klasik do\'kon'
      },
      {
        src: m9,
        width: 'w-[180px] sm:w-[170px] md:w-[190px] lg:w-[210px] xl:w-[230px]',
        alt: 'Elegant do\'kon'
      }
    ],
    // Uchinchi qator - chapga (barcha rasmlar bir xil height)
    [
      {
        src: m10,
        width: 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Kompakt do\'kon'
      },
      {
        src: m1,
        width: 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]',
        alt: 'Mini do\'kon'
      },
      {
        src: m2,
        width: 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px]',
        alt: 'Katta do\'kon'
      },
      {
        src: m3,
        width: 'w-[150px] sm:w-[170px] md:w-[190px] lg:w-[210px] xl:w-[230px]',
        alt: 'O\'rta do\'kon'
      }
    ]
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-900 via-teal-900 to-slate-900 `}>
      {/* Background decorations */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-teal-300 to-cyan-300"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-2xl bg-gradient-to-r from-yellow-300 to-orange-300"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <div className="container mx-auto relative z-10 bg-white">
        {/* Hero Section */}
        <motion.div
          className="text-center py-10 mt-3 "
          initial={variants.fadeInUp.initial}
          animate={variants.fadeInUp.animate}
          transition={variants.fadeInUp.transition}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mt-6 mb-6"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            <span className="text-2xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 text-gray-900 bg-clip-text">
              "KO'CHMA DO'KON" LAR FABRIKASI.
            </span>
            <br />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-black mt-14 font-medium"
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={{ delay: 0.2, ...variants.fadeInUp.transition }}
          >
            Mijoz uchun sifat, biz uchun mas'uliyat!
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <section ref={sectionRef} className="space-y-16 overflow-x-hidden">
          {/* Company Activity */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}  // <-- Remove isInView check; animate immediately
            transition={variants.fadeInUp.transition}
          >
            <InfoCard className='bg-white p-4 md:p-6 mb-7 shadow-xl hover:shadow-2xl transition-all duration-300'>
              <SectionHeader className='text-yellow-300 shadow-2xl'>BIZNING FAOLIYATIMIZ</SectionHeader>
              <div className="space-y-6 text-gray-900 text-lg leading-relaxed">
                <p className="text-xl font-semibold text-center text-gray-900">
                  Yengil konstruksiyadan iborat.
                </p>
                <p>
                  Ko'chma do'kon - savdo va xizmat ko'rsatish shahobchalari - kiyoskalar -
                  kapsula do'kon - konteyner - foodtruck va modul uylar - ishlab chiqarish.
                </p>

                <div>
                  <Carousel rows={rows} baseDuration={30} pauseOnHover={true} />
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                      BIZNING HAMKORLARIMIZ
                    </h1>
                  </div>
                  <div className="overflow-hidden bg-gray-50 rounded-lg shadow-2xl py-4">
                    <div
                      ref={carouselRef}
                      className="flex items-center gap-4 whitespace-nowrap"
                      style={{ minWidth: 'max-content' }}
                    >
                      {partners.concat(partners).map((partner, index) => (
                        <img
                          key={index}
                          src={partner}
                          alt={`partner-${index}`}
                          className="w-[100px] sm:w-[120px] md:w-[150px] rounded-lg object-contain inline-block"
                        />
                      ))}
                    </div>
                  </div>

                  {/* YouTube Videos */}
                  <div className="mt-10 sm:mt-12 md:mt-16">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8">
                      Bizning videolarimiz
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                      {[
                        "B3RgSFGSYss",
                        "88_USdQr204",
                        "Vun_jMPowq4",
                        "o4SCL-2VxVY"
                      ].map((videoId, index) => (
                        <div key={index} className="aspect-[9/16] rounded-xl overflow-hidden bg-gray-100">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6 sm:mt-8">
                      <a
                        href="https://www.youtube.com/@Kochmadokon750"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-colors text-base sm:text-lg"
                      >
                        Batafsil ko'rish
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Delivery Info */}
              <div className="p-4 sm:p-6 mt-5 sm:mt-8">
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                  Yetkazib berish
                </h3>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                  Ko'chma do'kon respublika bo'ylab yetkazish hamda o'rnatib berishni taminlaydi.
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">
                  Ko'chma do'kon mahsulotlari
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Ko'chma do'konlar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Savdo ofislari
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Sotuv ofislari
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Savdo va xizmat ko'rsatish bino inshoatlari
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Aqlli-bekatlar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Sotuv ofislari
                    </li>
                  </ul>

                  <ul className="list-disc pl-5 space-y-0.5">
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Bio-Tualetlar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Bankomatlar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Sartaroshxona
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Modulli uylar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Kontainerdan uylar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Omborxonalar
                    </li>
                    <li className="text-lg sm:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                      Va turli inshoatlar
                    </li>
                  </ul>
                </div>
              </div>
            </InfoCard>
          </motion.div>

          {/* Links to you tube, instagram, and telegram*/}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
            className="px-2"
          >
            <InfoCard variant="gradient" className="max-w-4xl mx-auto">
              <SectionHeader gradient>Bizni ijtimoiy tarmoqlarda kuzatib boring</SectionHeader>
              <div className="space-y-6">
                {/* <h1 className="text-lg md:text-xl font-medium text-gray-900 text-center">Bu you tube videomiz:</h1> */}
                <div className="flex justify-center">
                  <iframe
                    width="600"
                    height="315"
                    src="https://www.youtube.com/embed/IpFn_XDHhU0?si=bvrFx8P8uWNxZTKO"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="max-w-full w-[600px] h-[310px] md:w-[560px] md:h-[315px] lg:w-[700px] lg:h-[380px] rounded-xl"
                  ></iframe>
                </div>
                <div className='flex items-center justify-center'>
                  <h1 className='flex items-center gap-1 text-xl font-medium'>Bu bizning ijtimoiy tarmoqlarimiz <ArrowDownIcon /></h1>
                </div>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://www.instagram.com/kochma.dokon?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img src={instagram} alt="Instagram" className="w-6 h-6" />
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a
                    href="https://t.me/kochmadokon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img src={telegram} alt="Telegram" className="w-6 h-6" />
                    <span className="font-medium">Telegram</span>
                  </a>
                </div>
              </div>
            </InfoCard>
          </motion.div>


          {/* Company Advantages */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
            className='px-4'
          >
            <InfoCard className='bg-white rounded-lg p-4 md:p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300'>
              <SectionHeader className='text-black flex gap-3'>
                <img src={correct} alt="correct icon" className='w-10 h-10 md:w-12 md:h-12' />
                NEGA <span className="text-teal-600">"FABRIKA"</span>
              </SectionHeader>

              <div className="grid md:grid-cols-2 gap-2">
                {COMPANY_ADVANTAGES.map((advantage, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-2 lg:p-3 rounded-lg hover:bg-white/40 transition-colors"
                    initial={variants.fadeInUp.initial}
                    animate={variants.fadeInUp.animate}
                    transition={{ delay: 0.1 * index, ...variants.fadeInUp.transition }}
                  >
                    <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-950 text-lg">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}  // <-- Animate immediately
            transition={variants.fadeInUp.transition}
            className='p-1 md:p-6 mb-6 hover:shadow-2xl transition-all duration-300'
          >
            <SectionHeader className='text-gray-900 flex items-center justify-center gap-2'>
              <img src={advantage} alt="advantage icon" className='w-10 h-10 md:w-14 md:h-14 mb-7' />
              <div>
                KO'CHMA DO'KON <br /> <span className="text-teal-700">AFZALLIKLARI</span>
              </div>

            </SectionHeader>

            <div className="grid md:grid-cols-2 gap-2 md:gap-6">
              {KEY_FEATURES.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="group"
                    initial={variants.scaleIn.initial}
                    animate={variants.scaleIn.animate}
                    transition={{ delay: 0.1 * index, ...variants.scaleIn.transition }}
                    whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  >
                    <InfoCard className="h-full">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 hidden lg:inline-block rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-slate-800 font-medium text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </InfoCard>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* About Mobile Shops */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 px-4 items-center"
            initial={variants.fadeInLeft.initial}
            animate={variants.fadeInLeft.animate}  // <-- Animate immediately
            transition={variants.fadeInLeft.transition}
          >
            <div className="space-y-6">
              <motion.h2
                className="text-3xl md:text-4xl text-center font-bold text-yellow-300 bg-clip-text "
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              >
                KO'CHMA DO'KON <br /> HAQIDA
              </motion.h2>

              <div className="space-y-4 text-black text-lg leading-relaxed">
                {[
                  "Metal konstruksiyadan qurilgan do'konlar bugungi kunda eng samarali va zamonaviy yechim hisoblanadi. Bunday inshootlar nafaqat mustahkam va ishonchli, balki iqtisodiy jihatdan ham foydali.",
                  "Tez quriladi – qisqa muddat ichida do'koningizni ishga tushirishingiz mumkin. Arzonroq – an'anaviy g'isht yoki beton qurilishidan ancha tejamkor. Ko'chma imkoniyat – kerak bo'lsa, konstruksiyani boshqa joyga ko'chirib o'rnatish mumkin.",
                  "Moslashuvchan dizayn – savdo do'konlari, ombor yoki xizmat ko'rsatish shoxobchalari uchun qulay. Uzoq muddatli xizmat – sifatli metall materiallar zangga qarshi maxsus himoya bilan qoplanadi."
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={variants.fadeInUp.initial}
                    animate={variants.fadeInUp.animate}
                    transition={{ delay: 0.2 * (index + 1), ...variants.fadeInUp.transition }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.div
              initial={variants.fadeInRight.initial}
              animate={variants.fadeInRight.animate}
              transition={variants.fadeInRight.transition}
            >
              <InfoCard className='bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 md:p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300'>
                <h3 className="text-2xl font-bold text-black mb-6 text-center">
                  Bizning xizmatlarimiz
                </h3>
                <ul className="space-y-3">
                  {SERVICES.map((service, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-lg space-x-3 text-black"
                      initial={variants.fadeInUp.initial}
                      animate={variants.fadeInUp.animate}
                      transition={{ delay: 0.1 * index, ...variants.fadeInUp.transition }}
                    >
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
          >
            <InfoCard className='bg-white rounded-lg p-4 md:p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300'>
              <SectionHeader className='text-yellow-300 flex items-center justify-center gap-4 md:gap-6'>
                <img src={contact} alt="contact icon" className='w-8 h-8 md:w-10 md:h-10' />
                BIZ BILAN ALOQA
              </SectionHeader>

              <div className="gap-8">
                <div className="space-y-6">
                  <p className="text-black text-lg leading-relaxed">
                    Biznes — birinchi qadamdan boshlanadi.
                    Bizning metal konstruksiyadan qurilgan ko‘chma do‘konlarimiz bilan sizning birinchi qadamingiz mustahkam, ishonchli va hamyonbob bo'lishini taminlaymiz..
                  </p>

                  <div className="space-y-4">
                    <motion.div>
                      <div>
                        <h2 className='text-2xl mb-4'>Murojat uchun</h2>
                      </div>

                      <div className='flex gap-2 items-center bg-gray-50 px-3 py-5 mt-3 rounded-lg'>
                        <Phone className='text-teal-600' />
                        <a href='tel:+99878 777 75 57' className='text-sm md:text-base font-medium'>+998 78 777 75 57</a>
                      </div>

                      <div className='flex gap-2 items-center bg-gray-50 px-3 py-5 mt-3 rounded-lg'>
                        <Phone className='text-teal-600' />
                        <a href="tel:+998771047557" className='text-sm md:text-base font-medium'>+998 77 104 75 57</a>
                      </div>

                      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-center font-medium text-gray-800 mb-4">
                          Savollaringizni telegram lichkada qoldiring va ko'chma do'kon siz bilan bog'lanadi.
                        </h3>
                        <a
                          href="https://t.me/kochma_dokon_adminstratsiya"
                          className="inline-block bg-teal-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
                        >
                          Telegram
                        </a>
                      </div>

                      <div className='flex gap-2 mt-4 items-center bg-gray-50 px-3 py-5 rounded-lg'>
                        <MapPin className='text-teal-600' />
                        <h3 className='text-sm md:text-base font-medium'>Toshkent shahar, Yangihayot tumani <br />
                          Metro: Turon bekat <br />
                          Index bozor chorraxasi</h3>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </div>
            </InfoCard>
          </motion.div>

          {/* Footer */}
          <motion.footer
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-slate-700 bg-clip-text text-transparent">
                KO'CHMA DO'KON
              </h3>
              <p className="text-slate-600">
                O'zbekistondagi eng ishonchli ko'chma do'konlar fabrikasi
              </p>
              <p className="text-sm text-slate-500">
                © 2025 Kontainer City. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </motion.footer>
        </section>
      </div>
    </div>
  );
};

export default FullContact;