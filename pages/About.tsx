import React from 'react';
import { Award, Users, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const About: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-3 md:mb-6">About Us</h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Dedicated to providing high-quality healthcare services to our community with integrity and compassion.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <Reveal>
              <div className="space-y-6 md:space-y-8">
                <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary">Our Mission & Vision</h2>
                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p>
                    At Venu Clinic, we believe that healthcare should be accessible, affordable, and compassionate. Our mission is to enhance the quality of life of our patients through comprehensive medical care.
                  </p>
                  <p>
                    Founded in 2008, we have grown from a small consultation room to a full-fledged family clinic, earning the trust of thousands of families in the Hyderabad area.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2">
                  <div className="p-4 md:p-6 bg-secondary rounded-xl border border-primary/5">
                     <div className="flex items-center gap-2 text-primary font-bold text-xl md:text-2xl mb-1">
                       <Users className="w-5 h-5 md:w-6 md:h-6" /> 15k+
                     </div>
                     <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">Happy Patients</p>
                  </div>
                  <div className="p-4 md:p-6 bg-secondary rounded-xl border border-primary/5">
                     <div className="flex items-center gap-2 text-primary font-bold text-xl md:text-2xl mb-1">
                       <Award className="w-5 h-5 md:w-6 md:h-6" /> 15+
                     </div>
                     <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">Years Experience</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative group perspective">
                <a 
                  href="https://maps.app.goo.gl/q29TjrNpdcFcAkSJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl group/image"
                >
                  {/* Image points to screenshot.jpg with robust fallback to png then unsplash */}
                  <img 
                    src="/images/screenshot.jpg" 
                    alt="Venu Clinic Exterior" 
                    className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('screenshot.jpg')) {
                        target.src = '/images/screenshot.png';
                      } else {
                        target.onerror = null;
                        target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop';
                      }
                    }}
                  />
                  
                  {/* Hover Overlay indicating map link */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="bg-white/95 backdrop-blur-sm text-primary px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                        <MapPin className="w-4 h-4 text-accent" /> View Location
                     </div>
                  </div>
                </a>
                
                {/* Floating Card: Static on mobile, Absolute on desktop */}
                <div className="md:absolute md:-bottom-6 md:-left-6 mt-6 md:mt-0 bg-white p-6 rounded-xl shadow-xl max-w-xs border border-gray-100 z-10 relative mx-auto md:mx-0 pointer-events-none">
                  <div className="flex items-start gap-4">
                     <div className="bg-success/10 p-3 rounded-full text-success shrink-0">
                        <Clock className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">Quick Support</h4>
                       <p className="text-xs text-gray-500 mt-1">We value your time. Minimal waiting periods for appointments.</p>
                     </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-12 md:py-24 bg-[#FAFAF9]">
        <div className="container mx-auto px-4">
            <Reveal>
              <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="grid md:grid-cols-2">
                      <div className="h-64 md:h-auto bg-gray-200 relative overflow-hidden group">
                           {/* Using standard default doctor image */}
                           <img 
                              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2000&auto=format&fit=crop"
                              alt="Dr. Ramu" 
                              className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent"></div>
                      </div>
                      <div className="p-8 md:p-16 flex flex-col justify-center">
                          <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm mb-3">Lead Physician</span>
                          <h3 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Dr. Ramu</h3>
                          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                              MBBS, MD (General Medicine) <br/>
                              Specialist in Chronic Disease Management
                          </p>
                          <ul className="space-y-4">
                              <li className="flex items-center gap-3 text-base text-foreground/80">
                                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> 
                                  <span>20+ Years of Experience</span>
                              </li>
                              <li className="flex items-center gap-3 text-base text-foreground/80">
                                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> 
                                  <span>Gold Medalist</span>
                              </li>
                              <li className="flex items-center gap-3 text-base text-foreground/80">
                                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> 
                                  <span>Patient-Centric Approach</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
            </Reveal>
        </div>
      </section>
    </div>
  );
};