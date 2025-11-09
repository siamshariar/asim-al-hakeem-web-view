import { server } from "../lib/config";
import Image from "next/image";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../lib/fetch";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Header2 from "../components/header1";
import Share from "../components/share2";
import { Mail, DollarSign, Calendar } from 'lucide-react';

export default function AskAQuestion({ playlists, headerLectures, qna_categories }) {
  return (
    <>
      <Meta
        title="Ask a Question"
        description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar..."
        image={`${server}/img/id/default_share.jpeg`}
        url={`${server}/ask-a-question`}
        type="website"
      />

      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qna_categories} />

      <section className="bg-gray-50 min-h-screen section-spacing">
        <div className="page-container">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Ask a Question</h1>
              
              <div className="space-y-8">
                <div className="bg-blue-50 border-l-4 text-[18px] border-blue-500 p-4 rounded-lg leading-loose">
                  <p className="text-blue-700">
                    Assalamu alaikum wa rahmatullahi wa barakatuhu,
                    <br />
                    Our NEW TIMING of taking questions for Ramadan is from 6 A.M (Makkah Time) until the quota finishes...
                    <br />
                    Saturday is our day off
                    <br />
                    Jazakum Allahu Khairan
                    <br />
                    (ADMIN)
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Counseling Sessions</h2>
                  <p className="text-gray-600 text-lg mb-4 leading-loose">
                    Need marriage counseling? Or any other one-to-one live counseling via Skype, FaceTime etc by Sheikh Assim al Hakeem?
                  </p>
                  <div className="flex items-center text-lg pt-2 space-x-2 text-blue-600">
                    <Mail size={20} />
                    <a href="mailto:sheikhassim.bookings@gmail.com" className="hover:underline">
                      sheikhassim.bookings@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-lg pt-1 space-x-2 mt-2 text-green-600">
                    <DollarSign size={20} />
                    <span>$100 / Half Hour</span>
                  </div>
                </div>

                <div className="relative w-full h-[800px] rounded-xl overflow-hidden">
                  <Image
                    src="/img/counselling-sheikh-assim.png"
                    alt="Counseling Session"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    loading="eager"
                    unoptimized
                  />
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl shadow-inner">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Donate for the Needy</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Want to help a brother/sister in need who cannot afford to consult the Sheikh regarding their Marital Issues?
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700">Assim Lugman Alhakeem</p>
                    <p className="text-gray-600">A/c: 164128664188</p>
                    <p className="text-gray-600">Maybank investment Berhad</p>
                    <p className="text-gray-600">Bangsar, KL Malaysia</p>
                    <p className="text-gray-600">Swift code: MBBEMYKLXXX</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <div className="flex items-center space-x-2 text-[#44929C] hover:text-black px-2 py-2">
                  <Share size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qna_categories = await getAllQnaCategory();

  return {
    props: {
      playlists: playlists.playlists,
      headerLectures,
      qna_categories,
    },
  };
}