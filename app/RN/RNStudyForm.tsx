'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle, Calendar, Clock, Timer, MapPin, Gift } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FormData = {
  nursingDegree: string;
  mondayTimes: string[];
  tuesdayTimes: string[];
  name: string;
  phone: string;
  email: string;
};

const timeSlots = ['8 AM – 10 AM', '10 AM – noon', 'Noon – 2 PM', '2 PM – 4 PM'];

const RECIPIENT_EMAIL = 'jwaldstreicher@karimedical.com';

export default function RNStudyForm() {
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
        'MEDICAL DEVICE SUMMATIVE STUDY — NURSE APPLICATION',
        '',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Nursing degree: ${data.nursingDegree}`,
        '',
        `Monday, June 15 availability: ${monday}`,
        `Tuesday, June 16 availability: ${tuesday}`,
      ].join('\n');

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: `${data.name} (RN Study)`,
          from_email: data.email,
          phone: data.phone,
          preferred_contact: 'Email',
          areas: `Nursing degree: ${data.nursingDegree}`,
          message: messageBody,
          to_email: RECIPIENT_EMAIL,
        },
        EMAILJS_CONFIG.publicKey
      );

      setSubmitState('success');
      reset();
    } catch (err) {
      console.error('RN study form submission failed', err);
      setSubmitState('error');
    }
  };

  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      {/* Header */}
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-tcl-alt">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Sponsored by */}
          <p className="text-center text-tcl-gray text-sm mb-4">
            Sponsored by{' '}
            <span className="font-semibold tracking-wide text-tcl-dark">
              KARI MEDICAL
            </span>
          </p>

          {/* Sub-banner */}
          <div className="mx-auto mb-10 max-w-3xl bg-tcl-gold text-white text-center text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold py-3 px-6 rounded-sm">
            OR Nurses Needed · Paid Research Study
          </div>

          {/* Hook */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-5xl lg:text-7xl text-tcl-dark font-semibold mb-3">
              Earn $200
            </h1>
            <p className="font-serif text-xl lg:text-2xl text-tcl-gray italic">
              for 90 minutes of your time
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-24 bg-tcl-gold mx-auto mb-10" />

          {/* What is it? */}
          <div className="text-center mb-12 max-w-xl mx-auto">
            <p className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-4">
              What is it?
            </p>
            <p className="font-serif text-xl text-tcl-dark mb-3">
              Medical Device Summative Study
            </p>
            <p className="text-tcl-gray text-base leading-relaxed">
              Nurses pair with a doctor to operate a device. Includes training,
              hands-on use & debrief.
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Calendar, label: 'Dates', value: 'June 15 & 16, 2026' },
              { icon: Clock, label: 'Time Slots', value: '8:00 AM – 4:00 PM' },
              { icon: Timer, label: 'Duration', value: '90 Minutes' },
              {
                icon: MapPin,
                label: 'Location',
                value: '67 Route 59\nSpring Valley, NY 10977',
              },
              {
                icon: Gift,
                label: 'Compensation',
                value: '$200 Amazon Gift Card',
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white border border-tcl-border rounded-lg p-5 text-center"
              >
                <Icon className="text-tcl-gold mx-auto mb-2" size={20} />
                <p className="text-tcl-gold text-xs tracking-[0.2em] uppercase font-semibold mb-2">
                  {label}
                </p>
                <p className="text-tcl-dark text-sm font-medium whitespace-pre-line">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA lead-in */}
          <div className="text-center mt-14">
            <p className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-semibold mb-2">
              Reserve Your Spot
            </p>
            <p className="text-tcl-gray text-base">
              Sign up using the form below.
            </p>
          </div>
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
              {/* Nursing degree */}
              <div>
                <label
                  htmlFor="nursingDegree"
                  className="block text-sm font-medium text-tcl-dark mb-1.5"
                >
                  What nursing degree do you have?{' '}
                  <span className="text-tcl-gold">*</span>
                </label>
                <input
                  id="nursingDegree"
                  {...register('nursingDegree', {
                    required: 'Please tell us your nursing degree',
                  })}
                  className="w-full px-4 py-3 border border-tcl-border rounded-sm text-sm focus:outline-none focus:border-tcl-gold transition-colors bg-white"
                  placeholder="e.g., BSN, MSN, RN"
                />
                {errors.nursingDegree && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nursingDegree.message}
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
