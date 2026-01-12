import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Clock, MapPin, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/Reveal';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full bg-[#F5F5F0] overflow-hidden pt-8 pb-16 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-primary/10 shadow-sm text-primary text-xs md:text-sm font-semibold">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  <span>Trusted by 500+ Families</span>
                </div>
              </Reveal>
              
              <Reveal>
                <div className="space-y-3 md:space-y-4">
                  <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-6xl text-primary leading-tight tracking-tight">
                    Your Health, <br/>
                    <span className="text-accent">Our Priority</span>
                  </h1>
                  <h2 className="font-heading font-bold text-lg sm:text-2xl lg:text-3xl text-primary/80">
                    మీ ఆరోగ్యం, మా బాధ్యత
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                    Experience compassionate care with modern medical expertise at Venu Clinic. 
                    Serving the community with dedication for over 15 years.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg">
                      Book Appointment <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/services" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20">
                      Our Services
                    </Button>
                  </Link>
                </div>
              </Reveal>

              <Reveal>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Mon-Sat: 9AM - 11PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Badangpet, Telangana</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative group order-1 lg:order-2">
              <Reveal>
                <a 
                  href="https://maps.app.goo.gl/q29TjrNpdcFcAkSJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white group/image transition-transform hover:scale-[1.02] duration-300"
                >
                  <div className="overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[500px] relative">
                    {/* Image points to screenshot.jpg with robust fallback to png then unsplash */}
                    <img 
                      src="/images/screenshot.jpg" 
                      alt="Venu Clinic Storefront" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                       <div className="bg-white/95 backdrop-blur-sm text-primary px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                          <MapPin className="w-4 h-4 text-accent" /> View Location
                       </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-8 z-20 pointer-events-none">
                    <p className="text-white font-medium text-sm md:text-lg italic">"Excellent care and very professional staff. Highly recommended!"</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                </a>
              </Reveal>
              {/* Decorative blob */}
              <div className="absolute -z-10 top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-accent/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary mb-3 md:mb-4">Why Choose Ramu Clinic?</h2>
              <p className="text-muted-foreground text-base md:text-lg">We combine advanced medical technology with a patient-centric approach to deliver the best healthcare outcomes.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Expert Doctors",
                desc: "Highly qualified specialists with years of experience providing accurate diagnosis and effective treatments.",
                icon: Shield,
              },
              {
                title: "Modern Facilities",
                desc: "Equipped with state-of-the-art diagnostic and treatment technology to ensure the highest standards of care.",
                icon: Star,
              },
              {
                title: "Patient First",
                desc: "We prioritize your well-being with personalized care plans tailored to your specific health needs and lifestyle.",
                icon: CheckCircle,
              }
            ].map((feature, idx) => (
              <Reveal key={idx} className="h-full">
                <div className="h-full p-6 md:p-8 rounded-2xl bg-secondary cursor-default border border-transparent hover:border-primary/10">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center text-primary mb-4 md:mb-6 shadow-sm">
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Reveal>
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-5xl mb-4 md:mb-6 tracking-tight">Ready to prioritize your health?</h2>
              <p className="text-primary-foreground/90 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light">
                Book an appointment today and experience the difference in compassionate care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link to="/contact" className="w-full sm:w-auto">
                    <Button variant="accent" size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 text-lg shadow-xl">Book Now</Button>
                 </Link>
                 <a href="tel:09866629019" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 text-lg border-white text-primary bg-white/90 hover:bg-white">Call Us</Button>
                 </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};