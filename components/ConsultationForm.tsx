'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: 'Phone' | 'Email';
  areas: string[];
  message: string;
};

const areaOptions = [
  'Arms', 'Chin', 'Male Chest', 'Stomach', 'Back',
  'Hips', 'Thighs', 'Legs', 'Female Breasts', 'Buttocks',
];

export default function ConsultationForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { preferredContact: 'Email', areas: [] },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitState('loading');
    try {
      // Send email notification via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          preferred_contact: data.preferredContact,
          areas: data.areas.join(', ') || 'Not specified',
          message: data.message || 'No message',
          to_email: EMAILJS_CONFIG.toEmail,
        },
        EMAILJS_CONFIG.publicKey
      );

      // Also send to CRM (fire-and-forget — don't block on failure)
      const crmUrl = process.env.NEXT_PUBLIC_CRM_INTAKE_URL;
      if (crmUrl) {
        fetch(crmUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone || null,
            preferred_contact: data.preferredContact.toLowerCase(),
            areas_of_interest: data.areas,
            message: data.message || null,
          }),
        }).catch(() => {}); // Silently ignore CRM errors
      }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section id="consult" className="py-24 lg:py-32 bg-tcl-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-tcl-gold" />
              <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Get Started</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-3">
              Request a Consultation
            </h2>
            <p className="text-tcl-gray mb-10">Take the first step toward the body you&apos;ve always wanted.</p>

            {submitState === 'success' ? (
              <div className="flex items-start gap-4 p-6 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="text-tcl-gold shrink-0 mt-0.5" size={24} />
                <div>
                  <p className="font-medium text-tcl-dark">Thank you!</p>
                  <p className="text-tcl-gray text-sm mt-1">We&apos;ll be in touch within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-tcl-dark mb-1.5">
                      First Name <span className="text-tcl-gold">*</span>
                    </label>
                    <input
                      id="firstName"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-tcl-dark mb-1.5">
                      Last Name <span className="text-tcl-gold">*</span>
                    </label>
                    <input
                      id="lastName"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-tcl-dark mb-1.5">
                    Email Address <span className="text-tcl-gold">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-tcl-dark mb-1.5">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <p className="block text-sm font-medium text-tcl-dark mb-2">Preferred Contact</p>
                  <div className="flex gap-6">
                    {['Phone', 'Email'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-tcl-gray">
                        <input type="radio" value={opt} {...register('preferredContact')} className="accent-tcl-gold" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="block text-sm font-medium text-tcl-dark mb-3">Areas of Interest</p>
                  <div className="grid grid-cols-2 gap-2">
                    {areaOptions.map((area) => (
                      <label key={area} className="flex items-center gap-2 cursor-pointer text-sm text-tcl-gray">
                        <input type="checkbox" value={area} {...register('areas')} className="accent-tcl-gold" />
                        {area}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-tcl-dark mb-1.5">Message / Questions</label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white resize-none"
                    placeholder="Tell us about your goals or any questions you have..."
                  />
                </div>

                {submitState === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-red-700">
                      Something went wrong. Please email us directly at{' '}
                      <a href="mailto:info@tulliaprocedure.com" className="underline">
                        info@tulliaprocedure.com
                      </a>
                    </p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={submitState === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-tcl-gold text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-tcl-gold-dark transition-colors disabled:opacity-70"
                >
                  {submitState === 'loading' ? 'Sending...' : 'Request My Consultation'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Side image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="hidden lg:block"
          >
            <div className="relative h-[700px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                alt="Confident woman — body contouring consultation"
                fill
                className="object-cover object-center"
                data-slot="consultation-side-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tcl-dark/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
                  <p className="font-serif text-lg text-tcl-dark mb-1">&ldquo;The results were immediate.&rdquo;</p>
                  <p className="text-sm text-tcl-gray">15-minute procedure. No downtime. Lasting results.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
