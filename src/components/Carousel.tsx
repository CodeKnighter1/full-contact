import React from "react";

type ImageItem = {
  src: string;
  width?: string; // Har bir rasm uchun alohida width
  alt?: string;
};

type Props = {
  rows: (string[] | ImageItem[])[];
  baseDuration?: number;
  pauseOnHover?: boolean;
};

const Carousel: React.FC<Props> = ({ rows, baseDuration = 30, pauseOnHover = true }) => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6">
        KO'CHMA DO'KON MAHSULOTLARI
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {rows.map((row, rowIndex) => {
          const duration = Math.max(10, Math.round((baseDuration * row.length) / 5));
          const directionClass = rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right";

          // Har bir rasm uchun ma'lumotlarni tayyorlash
          const processImage = (item: string | ImageItem, idx: number) => {
            if (typeof item === 'string') {
              return {
                src: item,
                alt: `Product ${rowIndex + 1}-${idx + 1}`,
                width: 'w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]',
                height: 'h-[150px] sm:h-[170px] md:h-[190px] lg:h-[210px] xl:h-[230px]'
              };
            } else {
              return {
                src: item.src,
                alt: item.alt || `Product ${rowIndex + 1}-${idx + 1}`,
                width: item.width || 'w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]'
              };
            }
          };

          return (
            <div
              key={rowIndex}
              className={`overflow-hidden ${pauseOnHover ? "group" : ""}`}
              role="region"
              aria-label={`Product carousel row ${rowIndex + 1}`}
            >
              <div
                className={`flex gap-2 sm:gap-3 md:gap-4 ${directionClass} ${pauseOnHover ? "group-hover:animation-paused" : ""}`}
                style={{
                  "--marquee-duration": `${duration}s`,
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)", // GPU tezlatish uchun
                } as React.CSSProperties}
              >
                {/* Birinchi to'plam - asosiy */}
                {row.map((item, idx) => {
                  const imageData = processImage(item, idx);
                  return (
                    <div
                      key={`${rowIndex}-${idx}`}
                      className={`flex-shrink-0 ${imageData.width} p-1 sm:p-2`}
                    >
                      <div className="w-full rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" style={{ height: '150px' }}>
                        <img
                          src={imageData.src}
                          alt={imageData.alt}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
                {/* Ikkinchi to'plam - cheksiz aylanish uchun */}
                {row.map((item, idx) => {
                  const imageData = processImage(item, idx);
                  return (
                    <div
                      key={`${rowIndex}-${idx}-duplicate`}
                      className={`flex-shrink-0 ${imageData.width} p-1 sm:p-2`}
                      aria-hidden="true"
                    >
                      <div className="w-full rounded-md overflow-hidden shadow-sm" style={{ height: '150px' }}>
                        <img
                          src={imageData.src}
                          alt={imageData.alt}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;