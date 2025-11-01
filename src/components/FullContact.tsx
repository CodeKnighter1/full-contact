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
  Award
} from 'lucide-react';
import instagram from '@/images/icons8-instagram-48.png'
import telegram from '@/images/icons8-telegram-logo-50.png';
import correct from '@/images/icons8-correct-100.png'
import contact from '@/images/icons8-contact-58.png'

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
import correcto from '@/images/icons8-correct-64 (1).png'
import commers from "@/images/icons8-correct-80.png"

// Key Features Data
const KEY_FEATURES = [
  {
    icon: Clock,
    title: 'Qurilish tezligi:',
    description: 'An\'anaviy g\'isht yoki beton binolarga qaraganda, metall konstruksiya qismlari oldindan tayyorlanadi va tez yig\'iladi. Bu vaqt va mehnatni tejaydi.',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: UserCheck,
    title: 'Mustahkamlik va chidamlilik:',
    description: 'Metall konstruksiyalar zilzilaga, shamolga va boshqa tashqi ta\'sirlarga bardoshli. Yillar davomida shaklini yo\'qotmaydi.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Cpu,
    title: 'Arzonroq xarajat:',
    description: 'Qurilish xom-ashyolari va vaqt kam sarflangani uchun umumiy narx ham nisbatan past bo\'ladi. Bundan tashqari ta\'mirlash xarajatlarini talab qilmaydi.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Heart,
    title: 'Ko\'chirish va kengaytirish imkoniyati:',
    description: 'Metall konstruksiya modulli bo\'lgani uchun keyinchalik do\'konni kattalashtirish yoki boshqa joyga ko\'chirish imkoniyati mavjud.',
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
  'Bizda viloyatlar bo\'ylab 100 ga yaqin ustalarimiz mavjud bo\'lib 10 dan ortiq ish boshqaruvchilarimiz bor.',
  'Ishlab chiqarishning barcha bosqichlari nazorat ostida amalga oshiriladi.',
];

const SERVICES = [
  'Ko\'chma va yig\'ma shahobchalar',
  'Metal konstruksiyadan iborat yingil tipdagi savdo shahobchalari va sotuv ofislari.',
  'Ishlab chiqarish va xizmat ko\'rsatish binoo-inshootlari',
  'Modul va prefabrik uylar',
  'Loyihadan boshlab tayyor holatda topshiramiz.',
  'Do\'kon va savdo nuqtalari – qisqa vaqt ichida qurib, foydalanishga tayyor qilib beramiz.',
  'Omborxonalar – katta maydonli, keng va xavfsiz konstruksiyalar.',
  'Loyihani 3 kundan 15 kungacha bo\'lgan muddatda tayyorlab beramiz.',
  'Respublika bo\'ylab kelishilgan holda yetkazib beramiz.',
  'Fabrikada har bir loyiha uchun menejrlar, loyihachilar, konstruktorlar, smetachilar, birgadirlar, ustalar va yetkazib beruvchilar xizmat ko\'rsatadi.'
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
    <div className={`min-h-screen bg-gradient-to-b from-slate-900 via-teal-900 to-slate-900 overflow-hidden`}>
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

      <div className="container mx-auto overflow-x-hidden relative z-10 bg-white">
        {/* Hero Section */}
        <motion.div
          className="text-center py-10 "
          initial={variants.fadeInUp.initial}
          animate={variants.fadeInUp.animate}
          transition={variants.fadeInUp.transition}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mt-6 mb-6 px-4"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          >
            <span className="text-2xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 text-gray-900 bg-clip-text">
              "KO'CHMA DO'KON" FABRIKASI.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-950 mt-10 tracking-widest font-medium"
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={{ delay: 0.2, ...variants.fadeInUp.transition }}
          >
            MIJOZ UCHUN SIFAT <br /> BIZ UCHUN MAS'ULIYAT!
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
              <div className="space-y-3 text-gray-900 text-lg leading-relaxed">
                <p className="text-xl font-semibold text-center text-gray-900">
                  Yengil konstruksiyadan iborat.
                </p>
                <p className='font-medium'>
                  Ko'chma do'kon - savdo va xizmat ko'rsatish shahobchalari - kiyoskalar -
                  kapsula do'kon - konteyner - foodtruck va modul uylar - ishlab chiqarish.
                </p>

                <div>
                  <Carousel rows={rows} baseDuration={30} pauseOnHover={true} />
                </div>
              </div>

              {/* Yo'nalishlarimiz */}
              <div className="px-1 py-8 sm:p-8 md:p-6 lg:p-14">
                <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-teal-700 mb-4 sm:mb-6 text-center">
                  YO'NALISHLARIMIZ
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <ul className="list-none sm:pl-5 space-y-1 sm:space-y-2">
                    {[
                      "Ko'chma do'kon",
                      "Kontainer City",
                      "Modul Uylar",
                    ].map((item, index) => (
                      <div className='flex items-center gap-2'>
                        <img src={correcto} alt="" className='w-7' />
                        <li key={index} className="tracking-wide text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                          {item}
                        </li>
                      </div>
                    ))}
                  </ul>

                  <ul className="list-none space-y-1 sm:space-y-2">
                    {[
                      "Capsula Do'kon",
                      "Food Trucklar",
                      "Akfa Butkalar"
                    ].map((item, index) => (
                      <div className='flex items-center gap-2'>
                        <img src={correcto} alt="" className='w-7' />
                        <li key={index} className="tracking-wide text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                          {item}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mahsulotlarimiz */}
              <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-8 font-bold tracking-wider text-teal-700 mb-4 sm:mb-6 text-center">
                  MAHSULOTLARIMIZ
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 sm:gap-4 md:gap-6">
                  <ul className="list-none sm:pl-5 space-y-1 sm:space-y-2">
                    {[
                      "Ko'chma do'konlar",
                      "Savdo va sotuv ofislari",
                      "Xizmat ko'rsatish bino-inshoatlari",
                      "Aqlli-bekatlar",
                      "Sotuv ofislari"
                    ].map((item, index) => (
                      <div className='flex items-center gap-2'>
                        <img src={correcto} alt="" className='w-7' />
                        <li key={index} className="tracking-wide text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 transition-colors duration-200 cursor-pointer">
                          {item}
                        </li>
                      </div>
                    ))}
                  </ul>

                  <ul className="list-none pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                    {[
                      "Bio-Tualetlar",
                      "Bankomatlar",
                      "Sartaroshxona",
                      "Modulli uylar",
                      "Kontainerdan uylar",
                      "Omborxonalar",
                      "Va turli inshoatlar"
                    ].map((item, index) => (
                      <div className='flex items-center gap-1'>
                        <img src={correcto} alt="" className='w-7' />
                        <li key={index} className="tracking-wide text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 transition-colors duration-200 cursor-pointer">
                          {item}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoCard>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
          >
            <InfoCard variant="gradient" className="max-w-4xl mx-auto">
              <SectionHeader className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-gray-900'>IJTIMOIY <br /> TARMOQLARIMIZ</SectionHeader>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6">
                  <a
                    href="https://www.instagram.com/kochma.dokon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <img src={instagram} alt="Instagram" className="w-8 h-8 sm:w-6 sm:h-6" />
                    <span className="font-medium text-lg sm:text-xl">I n s t a g r a m</span>
                  </a>
                  <a
                    href="https://t.me/kochmadokon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <img src={telegram} alt="Telegram" className="w-8 h8 sm:w-6 sm:h-6" />
                    <span className="font-medium text-lg sm:text-xl">T e l e g r a m</span>
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
                    <img src={commers} alt="" className="w-7 h7 md:w-10 md:h-10 mt-0.5" />
                    <span className="text-slate-800 tracking-wide font-medium text-lg sm:text-xl md:text-2xl">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
            className='hover:shadow-2xl transition-all duration-300'
          >
            <SectionHeader className='text-teal-700 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2'>
              {/* <img src={advantage} alt="advantage icon" className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14' /> */}
              <div className="text-center tracking-wide sm:text-left">
                MAHSULOTNING <br />
                <span className="text-teal-700">AFZALLIKLARI</span>
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4">
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
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`p-2 sm:p-3 hidden sm:block rounded-xl bg-gradient-to-r ${feature.color} shadow-lg flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl sm:text-2xl md:text-2xl font-bold lg:text-3xl text-slate-800 mb-2 sm:mb-3 group-hover:text-teal-600 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-slate-800 tracking-wide text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
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

          {/* Comparison Section */}
          <div className='bg-gradient-to-br from-blue-50 via-white to-blue-50/30 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm border border-blue-100/50 hover:shadow-md transition-all duration-300'>
            <div className="space-y-8 sm:space-y-6">
              <div>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold tracking-widest text-teal-700'>XISOB - KITOB</h1>
              </div>
              <div>
                <h1 className='text-2xl sm:text-2xl md:text-2xl text-center font-semibold text-teal-700 mb-3'>O'ZINGIZ QURSANGIZ QANDAY BO'LADI?</h1>
                <div className="space-y-2 tracking-wide text-lg sm:text-xl md:text-2xl font-medium">
                  <p>Siz xom-ashyolarni metrlab olasiz.</p>
                  <p>Siz bu do'konni tayyorlashda tajribasi kam ustalarga tayyorlatasiz.</p>
                  <p>Siz do'kon qurilishining boshlanishidan oxirigacha jarayonni nazorat qilishingiz kerak bo'ladi va bu sizning ko'p vaqtingizni oladi.</p>
                  <p>Do'konning har bir qismi uchun alohida usta topishingiz kerak bo'ladi. Misol uchun alikafonchi, tunikafonchi, elektr montajchi va boshqalar.</p>
                  <p>Do'koningizning loyihasi uchun alohida mablag' ajratishingiz kerak.</p>
                </div>
              </div>
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-500 shadow-md" />
                {/* <span className="mx-4 text-sm md:text-base text-teal-700 font-semibold bg-white px-3 py-1 rounded-full shadow">Qiyoslash</span> */}
                <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-500 shadow-md" />
              </div>
              <div>
                <h1 className='text-2xl sm:text-xl md:text-2xl text-center font-semibold text-teal-700 mb-3'>FABRIKADA QANDAY BO'LADI?</h1>
                <div className="space-y-2 tracking-wide text-lg sm:text-xl md:text-2xl font-medium">
                  <p>Biz materiallarni zavoddan tonnalab optom narxga olamiz va bu arzonga aylanadi.</p>
                  <p>Bizda do'konlarni bu sohadagi ko'p yillik tajribaga ega viloyatlar bo'ylab 100 dan ortiq ustalar va 10 ga yaqin mutahasislar ishlaydi.</p>
                  <p>Bizda bu ish qurilish sohasidagi malakali brigadirlar tomonidan nazoratga olinadi.</p>
                  <p>Biz sizga do'konning loyihasi tekinga tayyorlab beramiz.</p>
                </div>
              </div>
              <div>
                <h1 className='text-2xl sm:text-xl md:text-2xl text-center font-semibold text-teal-700'>ESLATMA!!</h1>
                <p className='tracking-widest text-center text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mt-3'>KO'CHMA DO'KONLAR FABRIKASI O'ZBEKISTONDA BIRINCHI RAQAMLI YAGONA FABRIKA.</p>
              </div>
            </div>
          </div>

          {/* About Mobile Shops */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 px-4 items-center"
            initial={variants.fadeInLeft.initial}
            animate={variants.fadeInLeft.animate}  // <-- Animate immediately
            transition={variants.fadeInLeft.transition}
          >
            <motion.div
              initial={variants.fadeInRight.initial}
              animate={variants.fadeInRight.animate}
              transition={variants.fadeInRight.transition}
            >
              <InfoCard className='bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 md:p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300'>
                <h3 className="text-2xl font-bold tracking-widest text-teal-700 mb-6 text-center">
                  XIZMATLARIMIZ
                </h3>
                <ul className="space-y-3">
                  {SERVICES.map((service, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-lg font-medium tracking-wide space-x-3 text-black"
                      initial={variants.fadeInUp.initial}
                      animate={variants.fadeInUp.animate}
                      transition={{ delay: 0.1 * index, ...variants.fadeInUp.transition }}
                    >
                      <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>
            </motion.div>
          </motion.div>


          <div className="p-4 sm:p-6 md:p-8">
            {/* YouTube Videos */}
            <div className="mt-4 sm:mt-8 md:mt-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold tracking-wider text-teal-700 mb-6 sm:mb-8">
                ISHLARIMIZ
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                {[
                  "B3RgSFGSYss",
                  "88_USdQr204",
                  "Vun_jMPowq4",
                  "o4SCL-2VxVY",
                  "WLf5A8SgXoQ",
                  "PZh-W0EfBZQ"
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

              <div className="flex justify-center mt-2">
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
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-50 via-white to-blue-50/30 rounded-xl p-6 md:p-8 mb-6 shadow-sm border border-blue-100/50 hover:shadow-md transition-all duration-300'>
            {/* Sarlavha */}
            <h2 className="text-2xl md:text-3xl tracking-widest font-bold text-teal-700 mb-6 text-center">
              DO'KON NARXLARI
            </h2>

            {/* Asosiy narx ma'lumoti */}
            <div className="space-y-4 mb-8">
              <div className="bg-white/60 rounded-lg px-4 md:p-5">
                <p className="text-gray-700 text-lg font-medium leading-relaxed">
                  Har bir kvadrat devor, tom va pataloklari <span className="font-semibold text-teal-600">35 $</span> dan boshlab <span className="font-semibold text-teal-600">100 $</span> gacha bo'lishi mumkin. <br />
                  Agar poldan hisoblansa <span className="font-semibold text-teal-600">100 $</span> dan <span className="font-semibold text-teal-600">400 $</span> gacha.
                </p>
              </div>

              <div className="bg-white/60 rounded-lg px-4 md:p-5">
                <p className="text-gray-700 text-lg font-medium leading-relaxed">
                  Sababi ishlatiladigan xom-ashyo materiallarining sifatiga, loyihaning modeliga hamda dizayniga qarab narxlar o'zgarib boradi.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={variants.fadeInUp.initial}
            animate={variants.fadeInUp.animate}
            transition={variants.fadeInUp.transition}
          >
            <InfoCard className='bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300'>
              <SectionHeader className='text-teal-700 flex flex-col tracking-wider sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6'>
                <img src={contact} alt="contact icon" className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10' />
                MUROJAT UCHUN
              </SectionHeader>

              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <motion.div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                      <div className='text-base sm:text-lg md:text-xl font-medium'>
                        Call Center:
                      </div>
                      <div className='flex gap-2 items-center bg-gray-50 px-3 sm:px-4 py-3 sm:py-4 rounded-lg w-full sm:w-auto'>
                        <Phone className='text-teal-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                        <a href='tel:+998787777557' className='text-sm sm:text-base font-medium'>+998 78 777 75 57</a>
                      </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3'>
                      <div className='text-base sm:text-lg md:text-xl font-medium'>
                        Shaxsiy:
                      </div>
                      <div className='flex gap-2 items-center bg-gray-50 px-3 sm:px-4 py-3 sm:py-4 rounded-lg w-full sm:w-auto'>
                        <Phone className='text-teal-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                        <a href="tel:+998771047557" className='text-sm sm:text-base font-medium'>+998 77 104 75 57</a>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 mt-4">
                      <h3 className="text-lg sm:text-lg md:text-xl lg:text-2xl text-center font-medium text-gray-800 mb-3 sm:mb-4">
                        Telegramdan murojat uchun
                      </h3>
                      <a
                        href="https://t.me/kochma_dokon_adminstratsiya"
                        className="inline-block bg-teal-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-8 sm:px-10 md:px-12 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base sm:text-base md:text-lg w-full sm:w-auto text-center"
                      >
                        Telegram
                      </a>
                    </div>

                    <div className='flex gap-2 sm:gap-3 mt-3 sm:mt-4 items-start bg-gray-50 px-3 sm:px-4 py-3 sm:py-4 md:py-5 rounded-lg'>
                      <MapPin className='text-teal-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5' />
                      <h3 className='text-base sm:text-base md:text-lg font-medium'>
                        Toshkent shahar, Yangihayot tumani <br />
                        Metro: Turon bekat <br />
                        Index bozor chorraxasi
                      </h3>
                    </div>
                    <div className="rounded-lg text-center bg-emerald-600 px-3 sm:px-4 py-3 sm:py-4 mt-3 sm:mt-4 hover:bg-emerald-700 transition-colors">
                      <a
                        href="https://maps.app.goo.gl/abZn34TbaSjzdd9c6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-lg md:text-xl text-center font-semibold flex gap-1 sm:gap-2 items-center justify-center text-yellow-300"
                      >
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                        Lokatsiyamiz
                      </a>
                    </div>
                  </motion.div>
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
                © 2025 Ko'chma Do'kon. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </motion.footer>
        </section>
      </div >
    </div >
  );
};

export default FullContact;