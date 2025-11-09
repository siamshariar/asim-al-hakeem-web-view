import { useEffect, useRef, useState } from 'react';

const BookAppointment = () => {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    date: "",
    time: "",
  })

  const [errors, setErrors] = useState({
    fullName: false,
    phoneNumber: false,
    date: false,
    time: false,
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (formSubmitted) {
      setErrors({
        ...errors,
        [name]: value.trim() === "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {
      fullName: formData.fullName.trim() === "",
      phoneNumber: formData.phoneNumber.trim() === "",
      date: formData.date === "",
      time: formData.time === "",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const isValid = validateForm()

    if (isValid) {
      console.log("Form submitted successfully:", formData)
    }
  }

  return (
    <section className='appointment section-spacing'>
      <div className='page-container'>
        <h2 className='appointment__title h2 mb-5 xl:mb-[50px] text-center xl:text-left'>
          Book Appointment or call:
          <span className='text-accent-tertiary'>(+487 384 9452)</span>
        </h2>
        <form className='appointment__form flex flex-col gap-y-5' onSubmit={handleSubmit}>
          <div className='flex flex-col xl:flex-row gap-5'>
            <div className="w-full relative">
              <input
                type="text"
                className={`input w-full ${errors.fullName ? "border-red-500" : ""}`}
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1 absolute -bottom-6">Full name is required</p>}
            </div>

            <div className="w-full relative">
              <input
                type="text"
                className={`input w-full ${errors.phoneNumber ? "border-red-500" : ""}`}
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1 absolute -bottom-6">Phone number is required</p>
              )}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-5 mt-2">
            <div className="w-full relative">
              <input
                type="date"
                className={`input w-full ${errors.date ? "border-red-500" : ""}`}
                ref={dateInputRef}
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1 absolute -bottom-6">Date is required</p>}
            </div>

            <div className="w-full relative">
              <input
                type="time"
                className={`input w-full ${errors.time ? "border-red-500" : ""}`}
                ref={timeInputRef}
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1 absolute -bottom-6">Time is required</p>}
            </div>
          </div>

          <button type="submit" className="btn mt-8 btn-sm btn-accent self-start mt-2">
            Book an appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
