import { useState } from "react";

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question:
        "Is there any zakat on 62 grams of gold or not?",
      answer:
        "No, there’s no zakat on 62 gms of gold. Zakat is on 85 gms and above of gold. However, if you have cash that’s above nisab, you must include your gold, whether 62 gms or even less.",
    },
    {
      question: "Is witr fard? The one who doesn't pray witr, is he sinful?",
      answer:
        "The one who doesn’t pray witr is not sinful as it is not an obligatory prayer, but one will miss a great reward.",
    },
    {
      question:
        "Does feeding a fasting person require a full meal to get the reward?",
      answer:
        "It is an issue of dispute among scholars. Some say that it is sufficient to give him whatever breaks his fast, even if it was a sip of water, and this is the opinion of Sheikh Ibn Othaimeen and others. Other scholars said that it has to be a full meal that would nurture a person and give him strength to worship Allah, and this is the opinion of Ibn Taimiyah.",
    },
    {
      question:
        "Can we use scented soaps while in ihram (احرام), or can we use face creams while in ihram for umrah?",
      answer: "You can use normal everyday soaps.",
    },
  ];

  return (
    <section className="faq bg-white section-spacing">
      <div className="page-container">
        <h2 className="faq__title h2 text-[#4C5354] text-center mb-[20px]">We've got answers</h2>

        <div className="mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq__item pt-7 pb-4 accordion-item border-b-[1px] border-[#DCDCDC] cursor-pointer select-none ${
                activeIndex === index ? "open" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between mb-[10px]">
                <h3 className="h3 text-[#4C5354] mr-4">{faq.question}</h3>
                <div className="faq__btn text-accent">
                  <i
                    className={`${
                      activeIndex === index ? "ri-subtract-fill" : "ri-add-fill"
                    } text-2xl`}
                  ></i>
                </div>
              </div>
              <div
                className={`faq__answer transition-all duration-1000 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="font-light transition-opacity duration-500 ease-in-out">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
