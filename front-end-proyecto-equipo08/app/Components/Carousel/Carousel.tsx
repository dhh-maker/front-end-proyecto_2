// components/Carrusel.jsx
'use client' 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {SlideLayer} from '../Carousel/Carousel.types'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
  const slides = [
    { id: 1, titulo: "HOLA", color: "bg-red-500", texto: "Contenido del slide 1",imagen:"/imagenes/mi-primerintership.jpg",link: "https://careers.ibm.com/en_US/careers/JobDetail?jobId=108234", linktext:"Empieza tu primer intership ahora! en conjunto con IBM"},
    { id: 2, titulo: "A LA GRANDE LE PUSE CUCA", color: "bg-blue-500", texto: "Contenido del slide 2", imagen:"/imagenes/cedetec.jpg", linktext:"¡El CEDETEC podria ser tu proxima gran historia!, ¡informate sobre su Servicio Social ahora!"},
    { id: 3, titulo: "goku todas sus transformaciones del 1 al 20.wmv", color: "bg-yellow-500", texto: "Contenido del slide 3", link: "https://www.youtube.com/watch?v=Inbg9Pcu7u8", linktext:"ver esencia", imagen: "/imagenes/gokutablos.jpeg"},
    { id: 4, titulo: "Arriba jesus abajo la pagina de la fes acatlan(viene del infierno)", color: "bg-purple-500", imagen:"/imagenes/fede.jpg" },
  ];

export default function Carousel(){
  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        
        // Configuración básica
        spaceBetween={20}
        slidesPerView={1}
        
        // Navegación
        navigation={true}
        pagination={{ clickable: true }}
        
        // Auto reproducción (opcional)
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        
        // Responsive breakpoints (opcional)
        breakpoints={{
          // Cuando la pantalla es >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // Cuando la pantalla es >= 1024px
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        
        // Estilos con Tailwind (usando clases arbitrarias)
       className="mySwiper [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:bg-black/50 [&_.swiper-button-prev]:bg-black/50 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:p-4 [&_.swiper-button-prev]:p-4 [&_.swiper-pagination-bullet-active]:!bg-white"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a
              href={slide.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
              >
           <div className="relative h-96 rounded-xl shadow-lg overflow-hidden">
            {slide.imagen &&(
                <Image 
                src={slide.imagen}
                alt='Imagen sobre la vacante'
                fill
                className="object-cover object-bottom" 
                style={{ objectPosition: '20% 25%' }} 
                ></Image>
              )
            }
             <div className="absolute inset-0 bg-black/20 z-10">
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
                  <button className=" mt-10 left-1/2 -translate-x-1 px-6 py-3 bg-black/60 text-white-800 rounded-lg font-semibold hover:bg-gray-100/20 transition ">
                  {slide.linktext} →
                 </button>
                </div>
             </div>
           </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
    
  )
}