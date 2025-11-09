import Link from "next/link"
import Image from "next/image"

export default function Banner() {
  return (
    <section className="bg-[#F4F4F4] mt-10 section-spacing overflow-hidden">
      <div className="page-container h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between h-full">
          <div className="xl:w-[50%] text-center xl:text-left">
            
            <h1 className="h1 mb-6">Sheikh Assim Alhakeem</h1>
            <p className="mb-[42px] md:max-w-xl">
              Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of
              Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia.
              He was raised there until the age of 12 before he and his family
              moved to the Western Province of Saudi Arabia, to the city of
              Jeddah. The city of Jeddah is the gateway to the two Holy Mosques,
              with Makkah being about 85-90 kilometers away and Madinah.
            </p>
            <button className="btn  btn-lg btn-accent mx-auto xl:mx-0">
              SEE MORE
            </button>



          </div>

          <div className="hero__img hidden xl:flex max-w-[814px] self-end relative w-full h-[500px]">
            <Image 
              src="/img/profile-banner.png" 
              alt="Sheikh Assim Alhakeem" 
              fill
              sizes="814px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
