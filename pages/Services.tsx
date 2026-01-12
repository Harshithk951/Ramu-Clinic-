import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Baby, Activity, ShieldCheck, Thermometer, ArrowRight, Clock, CheckCircle, Pill, FileText, Smartphone, Syringe, MessageCircleHeart, Home as HomeIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/Reveal';

export const Services: React.FC = () => {
  const services = [
    {
      title: "General Consultation",
      telugu: "సాధారణ సమాలోచన",
      desc: "Comprehensive health checkups and primary care for all age groups.",
      icon: Stethoscope,
    },
    {
      title: "Pediatrics",
      telugu: "చిన్నపిల్లల వైద్యం",
      desc: "Specialized care for infants, children, and adolescents.",
      icon: Baby,
    },
    {
      title: "Chronic Care",
      telugu: "దీర్ఘకాలిక వ్యాధులు",
      desc: "Management of diabetes, hypertension, and thyroid disorders.",
      icon: Heart,
    },
    {
      title: "Emergency Care",
      telugu: "అత్యవసర చికిత్స",
      desc: "Immediate attention for acute illnesses and minor injuries.",
      icon: Activity,
    },
    {
      title: "Preventive Care",
      telugu: "నివారణ ఆరోగ్యం",
      desc: "Vaccinations, screenings, and lifestyle counseling.",
      icon: ShieldCheck,
    },
    {
      title: "Fever Clinic",
      telugu: "జ్వరం క్లినిక్",
      desc: "Diagnosis and treatment of seasonal fevers and infections.",
      icon: Thermometer,
    }
  ];

  const additionalServices = [
    {
      title: "Laboratory Services",
      desc: "Basic diagnostic tests and blood work available. Quick results for common health screenings.",
      icon: Syringe
    },
    {
      title: "Health Counseling",
      desc: "Personalized health advice, diet planning, and lifestyle modification guidance for better health.",
      icon: MessageCircleHeart
    },
    {
      title: "Prescription Refills",
      desc: "Easy prescription renewals for regular patients. Call ahead for quick service.",
      icon: Pill
    },
    {
      title: "Home Care Advice",
      desc: "Expert guidance on post-treatment care, wound care at home, and recovery management.",
      icon: HomeIcon
    }
  ];

  return (
    <div className="w-full">
      {/* Main Services Header */}
      <section className="bg-primary text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 md:mb-6">Our Services</h1>
              <p className="text-white/80 max-w-2xl mx-auto text-base md:text-xl font-light">
                Comprehensive medical solutions tailored to your family's needs.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <Reveal key={idx} className="h-full">
                <div className="h-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border group hover:border-primary/20 flex flex-col">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-primary mb-1">{service.title}</h3>
                  <p className="text-sm font-medium text-accent mb-2 md:mb-3">{service.telugu}</p>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow leading-relaxed">{service.desc}</p>
                  <Link to="/contact" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent mt-auto">
                    Book Appointment <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 md:py-24 bg-[#FAFAF9] border-t border-border">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary mb-3 md:mb-4">Additional Services</h2>
              <p className="text-muted-foreground">Supporting your recovery and maintenance.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, idx) => (
              <Reveal key={idx}>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-primary/5 rounded-lg text-primary shrink-0">
                        <service.icon className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-heading font-bold text-lg md:text-xl text-primary mb-2">{service.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.desc}</p>
                     </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Hours CTA */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="bg-[#1A4D2E] rounded-3xl p-6 md:p-12 text-white overflow-hidden shadow-2xl max-w-4xl mx-auto relative">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col items-start space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                    <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-5xl tracking-tight">Open Until 11:00 PM</h2>
                </div>
                <p className="text-white/90 text-base md:text-xl leading-relaxed max-w-2xl">
                  We understand that health emergencies don't follow office hours. That's why we stay open late to serve you better.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4 w-full">
                  {[
                    "No need to take leave from work",
                    "Perfect for working families",
                    "Evening consultations available",
                    "Same-day appointments possible"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
                      <span className="font-medium text-base md:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 md:pt-6 w-full sm:w-auto">
                  <Link to="/contact">
                    <Button 
                      className="bg-transparent border border-white text-white hover:bg-white/10 font-bold text-lg h-12 md:h-14 px-8 rounded-full w-full sm:w-auto inline-flex items-center justify-center shadow-xl"
                    >
                      Book Your Appointment <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Affordable Healthcare */}
      <section className="py-12 md:py-24 bg-[#F5F5F0]">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary mb-4 md:mb-6">Affordable Healthcare</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-10 md:mb-16">
                We believe quality healthcare should be accessible to everyone. We offer transparent pricing and accept various payment methods.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
             <Reveal>
               <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-3xl md:text-5xl font-bold text-primary mb-2 flex items-center tracking-tight">
                    <span className="text-xl md:text-3xl mr-1 font-medium text-muted-foreground">₹</span> 200-500
                  </div>
                  <div className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-wider">Consultation Fee</div>
               </div>
             </Reveal>

             <Reveal>
               <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-2 h-12 md:h-14">
                     <Smartphone className="w-6 h-6 md:w-8 md:h-8" />
                     <span>Cash/UPI</span>
                  </div>
                  <div className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-wider">Payment Methods</div>
               </div>
             </Reveal>

             <Reveal>
               <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-2 h-12 md:h-14">
                     <FileText className="w-6 h-6 md:w-8 md:h-8" />
                     <span>Insurance</span>
                  </div>
                  <div className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-wider">Bills Provided</div>
               </div>
             </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};