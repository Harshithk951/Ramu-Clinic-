import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { SERVICE_OPTIONS } from '../types';
import { createAppointment } from '../services/api';
import { Reveal } from '../components/Reveal';

export const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  // Reference for the date input to safely access it without getElementById
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Calculate today's date once for the min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Helper to attempt opening the date picker programmatically.
   * Returns true if successful, false otherwise.
   */
  const openDatePicker = (input: HTMLInputElement) => {
    try {
      if ('showPicker' in input && typeof input.showPicker === 'function') {
        input.showPicker();
        return true;
      }
    } catch (err) {
      console.debug('Date picker launch error:', err);
    }
    return false;
  };

  /**
   * Handle click directly on the input field
   */
  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Attempt to use the modern API
    if (openDatePicker(e.currentTarget)) {
        // If successful, prevent default to stop keyboard flashing/focus ring
        e.preventDefault();
    }
    // If failed (e.g. not supported or security restriction), let default browser behavior occur
  };

  /**
   * Handle click on the arrow icon
   */
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const input = dateInputRef.current;
    if (input) {
        // If programmatic open fails, fallback to focus
        if (!openDatePicker(input)) {
            input.focus();
        }
    }
  };

  const validateForm = () => {
    // Name Validation
    if (formData.name.trim().length < 3) {
        toast.error('Full Name must be at least 3 characters long.');
        return false;
    }

    // Phone Validation (Basic check for digits and length)
    const phoneCleaned = formData.phone.replace(/[^0-9]/g, '');
    if (phoneCleaned.length < 10) {
        toast.error('Please enter a valid phone number (at least 10 digits).');
        return false;
    }

    // Email Validation (Optional but must be valid if provided)
    if (formData.email && formData.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
    }

    // Service Validation
    if (!formData.service) {
        toast.error('Please select a service type.');
        return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run validation before submission
    if (!validateForm()) {
        return;
    }

    setLoading(true);

    try {
      // Create payload strictly matching the DB schema to avoid sending unknown columns like 'date' or 'time'
      await createAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        service: formData.service,
        preferred_date: formData.date,
        preferred_time: formData.time,
        message: formData.message,
        status: 'pending'
      });
      
      toast.success('Appointment request sent successfully! We will confirm shortly.');
      setFormData({
        name: '', phone: '', email: '', service: '', date: '', time: '', message: ''
      });
    } catch (error: any) {
      console.error("Submission Error:", error);
      // Display specific error message from API if available, otherwise generic
      const message = error.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 
        Inject styles to hide the default calendar picker indicator 
        so we can show the custom dropdown arrow instead.
      */}
      <style>{`
        .custom-date-input::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none;
        }
      `}</style>

      <section className="bg-secondary py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-3 md:mb-4">Contact Us</h1>
              <p className="text-muted-foreground text-base md:text-lg">Book an appointment or reach out for inquiries.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Contact Info */}
          <Reveal>
            <div className="space-y-8 md:space-y-10">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-6 md:mb-8">Get in Touch</h2>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 md:p-4 rounded-full text-primary shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">Visit Us</h4>
                      <p className="text-sm md:text-base text-muted-foreground mt-1 leading-relaxed">
                        Grampanchayat, Balaji Nagar Rd,<br/>
                        Balaji Nagar, Badangpet,<br/>
                        Telangana 500112
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 md:p-4 rounded-full text-primary shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">Call Us</h4>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">
                        <a href="tel:09866629019" className="hover:text-primary transition-colors text-lg font-medium">098666 29019</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 md:p-4 rounded-full text-primary shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">Email Us</h4>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">
                        contact@ramuclinic.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 md:p-4 rounded-full text-primary shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">Working Hours</h4>
                      <div className="text-muted-foreground mt-1 space-y-1 text-sm md:text-base">
                        <p className="flex justify-between gap-6 md:gap-8"><span>Mon - Sat:</span> <span className="font-medium">9:00 AM - 11:00 PM</span></p>
                        <p className="flex justify-between gap-6 md:gap-8"><span>Sunday:</span> <span className="font-medium">10:00 AM - 2:00 PM</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-64 lg:h-96 w-full bg-gray-100 relative">
                 <iframe 
                  src="https://maps.google.com/maps?q=17.3093282,78.5097486&t=&z=18&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Clinic Location"
                />
              </div>
            </div>
          </Reveal>

          {/* Appointment Form */}
          <Reveal>
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-border relative">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-2">Book Appointment</h3>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">Fill out the form below and we will get back to you to confirm.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <Input 
                    label="Full Name *" 
                    name="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                  <Input 
                    label="Phone Number *" 
                    name="phone"
                    placeholder="+91 99999 99999" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <Input 
                  label="Email Address" 
                  name="email"
                  type="email"
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12"
                />

                <Select 
                  label="Service Type *" 
                  name="service"
                  options={SERVICE_OPTIONS}
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="h-12"
                />

                {/* Stacked on mobile, side-by-side on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   {/* 
                     Date Input - Customized to look like a dropdown (Select)
                   */}
                   <div className="w-full">
                      <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                         <input 
                           ref={dateInputRef}
                           id="date"
                           name="date"
                           type="date"
                           value={formData.date}
                           onChange={handleChange}
                           min={today}
                           onClick={handleDateClick}
                           className="custom-date-input flex h-12 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer relative z-10 appearance-none"
                         />
                         {/* The Dropdown Arrow Icon (mimicking Select component) */}
                         <div 
                           onClick={handleIconClick}
                           className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground z-20 cursor-pointer hover:text-primary transition-colors"
                         >
                           <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                           </svg>
                         </div>
                      </div>
                   </div>

                   <Select
                     label="Preferred Time"
                     name="time"
                     value={formData.time}
                     onChange={handleChange}
                     className="h-12" 
                     options={[
                       { label: 'Morning (9AM - 12PM)', value: 'morning' },
                       { label: 'Afternoon (12PM - 4PM)', value: 'afternoon' },
                       { label: 'Evening (4PM - 9PM)', value: 'evening' },
                     ]}
                   />
                </div>

                <Textarea 
                  label="Message / Symptoms" 
                  name="message"
                  placeholder="Briefly describe your health concern..." 
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[120px]"
                />

                <Button type="submit" className="w-full text-lg h-12 font-bold" size="lg" isLoading={loading}>
                  Confirm Booking
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By booking, you agree to our terms of service.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
