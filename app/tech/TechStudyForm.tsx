'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FormData = {
  certifiedSurgicalTech: 'Yes' | 'No';
  mondayTimes: string[];
  tuesdayTimes: string[];
  name: string;
  phone: string;
  email: string;
};

const timeSlots = ['8 AM – 10 AM', '10 AM – noon', 'Noon – 2 PM', '2 PM – 4 PM'];

const RECIPIENT_EMAIL = 'jwaldstreicher@karimedical.com';

export default function TechStudyForm() {
  const [submitState, setSubmitState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { mondayTimes: [], tuesdayTimes: [] },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitState('loading');
    try {
      const monday = data.mondayTimes.length
        ? data.mondayTimes.join(', ')
        : 'None selected';
      const tuesday = data.tuesdayTimes.length
        ? data.tuesdayTimes.join(', ')
        : 'None selected';

      // Compose a single readable body so we don't need a separate
      // EmailJS template — reuse the existing consultation template's
      // {{message}} variable.
      const messageBody = [
        'MEDICAL DEVICE SUMMATIVE STUDY — SURGICAL TECHNOLOGIST APPLICATION',
        '',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Certified Surgical Technologist: ${data.certifiedSurgicalTech}`,
        '',
        `Monday, June 15 availability: ${monday}`,
        `Tuesday, June 16 availability: ${tuesday}`,
      ].join('\n');

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: `${data.name} (Surgical Tech Study)`,
          from_email: data.email,
          phone: data.phone,
          preferred_contact: 'Email',
          areas: `Certified Surgical Technologist: ${data.certifiedSurgicalTech}`,
          message: messageBody,
          to_email: RECIPIENT_EMAIL,
        },
        EMAILJS_CONFIG.publicKey
      );

      setSubmitState('success');
      reset();
    } catch (err) {
      console.error('Tech study form submission failed', err);
      setSubmitState('error');
    }
  };

  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      {/* Header */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-tcl-alt">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">
              Kari Medical
            </span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            Medical Device Summative Study
          </h1>
          <p className="text-tcl-gray text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Thank you for your interest in participating. Please complete the
            form below to share your availability and contact information.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          {submitState === 'success' ? (
            <div className="flex items-start gap-4 p-6 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle
                className="text-tcl-gold shrink-0 mt-0.5"
                size={24}
              />
              <div>
                <p className="font-medium text-tcl-dark">
                  Thank you for your response!
                </p>
                <p className="text-tcl-gray text-sm mt-1">
                  We&apos;ve received your information and will be in touch
                  shortly.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 bg-white border border-tcl-border rounded-lg p-8 lg:p-10"
              noValidate
            >
              {/* Certified Surgical Technologist */}
              <div>
                <p className="block text-sm font-medium text-tcl-dark mb-3">
                  Are you a Certified Surgical Technologist?{' '}
                  <span className="text-tcl-gold">*</span>
                </p>
                <div className="flex gap-6">
                  {(['Yes', 'No'] as const).map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer text-sm text-tcl-gray"
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register('certifiedSurgicalTech', {
                          required: 'Please select Yes or No',
                        })}
                        className="accent-tcl-gold"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.certifiedSurgicalTech && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.certifiedSurgicalTech.message}
                  </p>
                )}
              </div>

              {/* Monday */}
              <div>
                <p className="block text-sm font-medium text-tcl-dark mb-3">
                  What times are you available on{' '}
                  <span className="font-semibold">Monday, June 15</span>?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <label
                      key={`mon-${slot}`}
                      className="flex items-center gap-2 cursor-pointer text-sm text-tcl-gray"
                    >
                      <input
                        type="checkbox"
                        value={slot}
                        {...register('mondayTimes')}
                        className="accent-tcl-gold"
                      />
                      {slot}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tuesday */}
              <div>
                <p className="block text-sm font-medium text-tcl-dark mb-3">
                  What times are you available on{' '}
                  <span className="font-semibold">Tuesday, June 16</span>?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <label
                      key={`tue-${slot}`}
                      className="flex items-center gap-2 cursor-pointer text-sm text-tcl-gray"
                    >
                      <input
                        type="checkbox"
                        value={slot}
                        {...register('tuesdayTimes')}
                        className="accent-tcl-gold"
                      />
                      {slot}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-tcl-dark mb-1.5"
                >
                  Name <span className="text-tcl-gold">*</span>
                </label>
                <input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                  placeholder="First Last"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-tcl-dark mb-1.5"
                >
                  Phone number <span className="text-tcl-gold">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                  })}
                  className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                  placeholder="(555) 000-0000"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-tcl-dark mb-1.5"
                >
                  Email <span className="text-tcl-gold">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {submitState === 'error' && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle
                    className="text-red-500 shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-sm text-red-700">
                    Something went wrong. Please email us directly at{' '}
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}`}
                      className="underline"
                    >
                      {RECIPIENT_EMAIL}
                    </a>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="w-full py-4 bg-tcl-gold text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-tcl-gold-dark transition-colors disabled:opacity-70"
              >
                {submitState === 'loading' ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
