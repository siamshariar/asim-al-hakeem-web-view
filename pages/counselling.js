import { useState, useEffect, useRef } from 'react';
import { server } from "../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../lib/fetch";
import Meta from "../components/meta";
import Header2 from "../components/header1";
import Share from '../components/share2';
import { Mail, Send } from 'lucide-react';

export default function CounsellingSession({ playlists, headerLectures, qna_categories }) {

const dateInputRef = useRef(null);
const timeInputRef = useRef(null);

useEffect(() => {
  const handleFocusDate = () => {
    dateInputRef.current.showPicker();
  };

  const handleFocusTime = () => {
    timeInputRef.current.showPicker();
  };

  const dateInput = dateInputRef.current;
  const timeInput = timeInputRef.current;

  if (dateInput) {
    dateInput.addEventListener('focus', handleFocusDate);
  }
  if (timeInput) {
    timeInput.addEventListener('focus', handleFocusTime);
  }

  return () => {
    if (dateInput) {
      dateInput.removeEventListener('focus', handleFocusDate);
    }
    if (timeInput) {
      timeInput.removeEventListener('focus', handleFocusTime);
    }
  };
}, []);
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    date: '',
    time: ''
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    setSubmissionSuccess(true);
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <Meta
        title="Counselling Session"
        description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia."
        image={`${server}/img/id/default_share.jpeg`}
        url={`${server}/counselling-session`}
        type="website"
      />

      <Header2
        playlists={playlists}
        lectures={headerLectures}
        qna_categories={qna_categories}
      />

      <div className="page-container section-spacing">
        <div className="mx-auto space-y-12">
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Counselling Session</h1>
            <p className="text-xl text-gray-600 mb-6">One-to-one Live Counseling with Sheikh Assim Al-Hakeem</p>
            <div className="space-y-4">
              <p className="text-gray-700">Need Marriage Counseling? Or any other one-to-one Live Counseling Via Skype, IMO, Facetime, or Phone Call with Sheikh Assim Al-Hakeem?</p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Mail size={20} />
                <a href="mailto:sheikhassim.bookings@gmail.com" className="hover:underline">
                  sheikhassim.bookings@gmail.com
                </a>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Donate for the Needy</h2>
            <p className="text-gray-700 text-lg mb-4">Want to help a brother/sister in need who cannot afford to consult the Sheikh regarding their Marital Issues, OCD Waswas, and the like?</p>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Donation Details</h3>
              <div className="space-y-2 text-lg text-gray-700">
                <p>Assim Lugman Alhakeem</p>
                <p>A/c: 164128664188</p>
                <p>Maybank investment Berhad</p>
                <p>Bangsar, KL Malaysia</p>
                <p>Swift code: MBBEMYKLXXX</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
            <p className="text-gray-700 text-lg mb-6">For booking of live counselling sessions, send us an email at{" "}
              <a href="mailto:sheikhassim.bookings@gmail.com" className="text-blue-600 hover:underline">
                sheikhassim.bookings@gmail.com
              </a> or get in touch by filling in the details below:
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="fullname"
                  value={formValues.fullname}
                  onChange={handleChange}
                  placeholder="Name"
                  className="pl-12 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="pl-6 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formValues.date}
                  ref={dateInputRef}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className='relative'> 
                  <input
                  type="time"
                  className="input"
                  ref={timeInputRef}
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-[#44929C] hover:text-black pt-4 flex items-center justify-center space-x-2"
              >
                <Send size={24} />
                <span className='text-xl'>Submit</span>
              </button>
              {submissionSuccess && <p className="text-green-500 mt-4">Form submitted successfully!</p>}
            </form>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Share</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#44929C] hover:text-black px-2 py-2  ">
                <Share size={24} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  try {
    const playlists = await getAllPlaylists2();
    const headerLectures = await getHeaderLectures();
    const qna_categories = await getAllQnaCategory();

    return {
      props: {
        playlists: playlists?.playlists || [],
        headerLectures: headerLectures || [],
        qna_categories: qna_categories || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        playlists: [],
        headerLectures: [],
        qna_categories: [],
      },
    };
  }
}
