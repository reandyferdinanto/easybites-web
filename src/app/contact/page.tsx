'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-brand/5 pt-12 md:pt-20 pb-12 md:pb-24">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-10 text-6xl animate-[float_6s_ease-in-out_infinite_reverse] opacity-60">💌</div>
        <div className="absolute bottom-10 left-10 text-5xl animate-[float_5s_ease-in-out_infinite] opacity-60">🍪</div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-brand/10 text-brand font-bold text-sm mb-4 border border-brand/20">
            We&apos;d love to hear from you
          </span>
          <h1 className="text-5xl md:text-7xl font-display text-text mb-6">
            Say <span className="text-accent">Hello!</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Whether you have a question about our cookies, want to order a custom hamper, or just want to say hi—we are all ears.
          </p>
        </div>
      </section>

      {/* Main Content (Form & Info) */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-display text-text mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-accent/10 border-2 border-accent/20 rounded-[2rem] p-10 flex flex-col items-center text-center">
                <span className="text-6xl mb-4">✨</span>
                <h3 className="text-2xl font-display text-text mb-2">Message Sent!</h3>
                <p className="text-text-muted">
                  Thank you for reaching out. We&apos;ve received your sweet note and our bakers will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 bg-white text-text font-bold rounded-full border border-surface-alt hover:shadow-sm transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-text uppercase tracking-wider ml-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Your sweet name" 
                    className="w-full bg-surface-alt text-text font-semibold px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all placeholder:font-normal"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-text uppercase tracking-wider ml-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="hello@example.com" 
                    className="w-full bg-surface-alt text-text font-semibold px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all placeholder:font-normal"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-bold text-text uppercase tracking-wider ml-2">Subject</label>
                  <select 
                    id="subject" 
                    className="w-full bg-surface-alt text-text font-semibold px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Order">Custom Order / Hampers</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-text uppercase tracking-wider ml-2">Message</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={5}
                    placeholder="How can we help you today?" 
                    className="w-full bg-surface-alt text-text font-body leading-relaxed px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all resize-none placeholder:font-normal"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 bg-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  {!isSubmitting && (
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Info & Map */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-display text-text mb-8">Kunjungi Toko Kami</h2>
            
            <div className="flex flex-col gap-8 mb-10">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-surface-alt p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <h4 className="font-bold text-text mb-1">Main Store</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Jl Raya Hankam RT004/ RW005 No. 49<br />
                    Ujung Aspal, Jatiranggon, Bekasi
                  </p>
                </div>

                <div className="bg-surface-alt p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <h4 className="font-bold text-text mb-1">Branch Store</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Jl. Haji Nawi RT005 / RW013 No. A2<br />
                    Jatimakmur, Pondok Gede, Bekasi
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-surface-alt p-6 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                  </div>
                  <h4 className="font-bold text-text mb-1">Jam Operasional</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Sen-Jum: 08:00 - 20:00<br />
                    Sab-Min: 09:00 - 18:00
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-alt text-text-muted flex items-center justify-center">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <span className="font-bold text-text">0813 1534 1342</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-alt text-text-muted flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </div>
                    <a href="https://instagram.com/easybites.baking" target="_blank" rel="noreferrer" className="font-bold text-text hover:text-brand transition-colors">@easybites.baking</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Organic Google Maps Embed */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-[3rem] overflow-hidden shadow-lg border-4 border-white group">
              <div className="absolute inset-0 bg-brand/10 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              {/* Google Maps iframe using a generic embed URL since the provided link is a share redirect link. */}
              {/* Replace the src URL with the exact embed URL from Google Maps for production */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126938.86884639943!2d106.74103173787702!3d-6.186851410148408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1655184288079!5m2!1sen!2sid" 
                className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href="https://share.google/QaA3PX2JqePjVj3Yn" 
                target="_blank" 
                rel="noreferrer"
                className="absolute bottom-4 right-4 z-20 bg-white text-text font-bold px-4 py-2 rounded-full shadow-md text-sm hover:text-brand hover:scale-105 transition-all flex items-center gap-2"
              >
                Open in Maps
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
            <p className="text-center text-text-muted text-xs mt-3">
              * Lokasi peta tertanam berdasarkan tautan yang dibagikan.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}