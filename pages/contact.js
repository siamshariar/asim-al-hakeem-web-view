import { useState } from 'react';
import { GetStaticProps } from 'next';
import { getAllPlaylists2, getAllQnaCategory, getHeaderLectures } from '../lib/fetch';
import Meta from '../components/meta';
import Header2 from '../components/header1';

export default function Contact({ playlists, headerLectures, qna_categories }) {
  const [formData, setFormData] = useState({
    firstName: '',
    subject: '', // Renamed from lastName to subject
    email: '',
    phone: '', // Added phone number to form data
    message: '',
    services: {
      websiteDesign: false,
      contentCreation: false,
      uxDesign: false,
      strategyConsulting: false,
      userResearch: false,
      other: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your server
  };

  return (
    <>
      <Meta title="Contact" description="Get in touch with our experts" />
      <Header2 playlists={playlists} headerLectures={headerLectures} qna_categories={qna_categories} />
      <main className="page-container section-spacing">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/2 relative min-h-[500px] md:min-h-[650px]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0" 
              style={{ 
                backgroundImage: 'url(/img/contact/contact-img.png)',
                backgroundAttachment: 'scroll'
              }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
            <div className="relative z-10 p-8 text-white flex items-end h-full">
              <div className="pb-8">
                <p className="text-white text-lg font-semibold">- Asim Al Hakeem</p>
                <p className="text-sm text-white">Islamic scholar, Jeddah</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="subject" className="block text-xl font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject} // Updated to subject
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-xl font-medium text-gray-700">Phone</label>
                  <input
                    type="tel" // Changed type to tel for better validation
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xl font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full h-[150px] rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  style={{ border: '2px solid #E7E7E7' }}  
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 mt-10 border tracking-normal border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#18ABBC] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
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
};
