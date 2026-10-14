'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Phone, Clock } from 'lucide-react';
import { CRM_BASE_URL } from '@/lib/crm';
import { trackFbq } from '@/lib/fbq';

type Slot = { start: string; end: string; date: string; label: string };
type SlotDay = { date: string; label: string; slots: Slot[] };
type Booking = { starts_at: string; when_label: string };

// Shown right after the consultation form submits. Lets the prospect pick a
// 30-minute follow-up call slot from the CRM's published availability.
export default function SchedulePicker() {
  const token = useSearchParams().get('t');

  const [firstName, setFirstName] = useState('');
  const [days, setDays] = useState<SlotDay[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selected, setSelected] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState(false);

  const loadSlots = useCallback(async () => {
    const res = await fetch(`${CRM_BASE_URL}/api/public/slots`);
    if (!res.ok) throw new Error('slots');
    const data = await res.json();
    const list: SlotDay[] = data.days || [];
    setDays(list);
    setSelectedDate((prev) => (list.some((d) => d.date === prev) ? prev : list[0]?.date || ''));
    setSelected(null);
  }, []);

  useEffect(() => {
    if (!token || !CRM_BASE_URL) {
      setInvalid(true);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        // A returning visitor with an existing booking just sees it confirmed.
        const me = await fetch(`${CRM_BASE_URL}/api/public/book?token=${encodeURIComponent(token)}`);
        if (me.status === 401 || me.status === 404) {
          setInvalid(true);
          return;
        }
        if (me.ok) {
          const data = await me.json();
          setFirstName(data.first_name || '');
          if (data.appointment) {
            setBooked({ starts_at: data.appointment.starts_at, when_label: data.appointment.when_label });
            return;
          }
        }
        await loadSlots();
      } catch {
        setError('We couldn’t load available times right now.');
      } finally {
        setLoading(false);
      }
    })();
  }, [token, loadSlots]);

  async function confirm() {
    if (!selected || !token) return;
    setBooking(true);
    setError('');
    try {
      const res = await fetch(`${CRM_BASE_URL}/api/public/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, starts_at: selected.start }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.code === 'already_booked' && data.existing) {
          setBooked({ starts_at: data.existing.starts_at, when_label: data.existing.when_label });
          return;
        }
        if (data.code === 'slot_taken' || data.code === 'slot_unavailable') {
          setError('That time was just taken — please choose another.');
          await loadSlots();
          return;
        }
        setError(data.error || 'Something went wrong. Please try another time.');
        return;
      }
      setBooked({ starts_at: data.appointment.starts_at, when_label: data.appointment.when_label });
      trackFbq('Schedule');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBooking(false);
    }
  }

  const card = 'bg-white border border-tcl-border rounded-lg p-8 lg:p-10';

  if (loading) {
    return <div className={`${card} text-center text-tcl-gray`}>Loading available times…</div>;
  }

  if (invalid) {
    return (
      <div className={`${card} text-center`}>
        <h2 className="font-serif text-3xl text-tcl-dark font-semibold mb-3">This link isn&apos;t valid</h2>
        <p className="text-tcl-gray mb-6">
          It looks like this scheduling link is missing or expired. We&apos;ll still be in touch within 24 hours of your request.
        </p>
        <a href="/" className="inline-block px-6 py-3 bg-tcl-gold text-white text-sm font-medium tracking-wide rounded-sm hover:bg-tcl-gold-dark transition-colors">
          Back to home
        </a>
      </div>
    );
  }

  if (booked) {
    return (
      <div className={card}>
        <div className="flex items-start gap-4">
          <CheckCircle className="text-tcl-gold shrink-0 mt-1" size={28} />
          <div>
            <h2 className="font-serif text-3xl text-tcl-dark font-semibold mb-2">You&apos;re all set{firstName ? `, ${firstName}` : ''}</h2>
            <p className="text-tcl-gray mb-5">Your follow-up call is confirmed for:</p>
            <p className="text-xl font-medium text-tcl-dark bg-tcl-bg border border-tcl-border rounded-md px-5 py-4 mb-6">
              {booked.when_label}
            </p>
            <p className="text-tcl-gray text-sm leading-relaxed mb-3">
              <Phone size={14} className="inline mr-1.5 text-tcl-gold" />
              A member of the TuLi team will call you at the number you provided.
            </p>
            <p className="text-tcl-gray text-sm leading-relaxed">
              Please note the time above. Need to change it? Call <a href="tel:+12012251101" className="text-tcl-gold-dark underline underline-offset-4">(201) 225-1101</a>.
            </p>
            <a href="/" className="inline-block mt-8 text-sm text-tcl-gold-dark underline underline-offset-4 hover:text-tcl-gold">
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const day = days.find((d) => d.date === selectedDate);

  return (
    <div className={card}>
      <h2 className="font-serif text-3xl lg:text-4xl text-tcl-dark font-semibold mb-2">
        {firstName ? `Thanks, ${firstName}.` : 'Thank you.'} Pick a time for your call.
      </h2>
      <p className="text-tcl-gray mb-8">
        Choose a 30-minute window and a member of the TuLi team will call you then to talk through your goals.{' '}
        <span className="inline-flex items-center gap-1 whitespace-nowrap"><Clock size={13} className="text-tcl-gold" /> All times are Eastern (ET).</span>
      </p>

      {days.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-tcl-gray mb-6">No open times in the next two weeks — we&apos;ll reach out within 24 hours to find one.</p>
          <a href="/" className="inline-block px-6 py-3 bg-tcl-gold text-white text-sm font-medium tracking-wide rounded-sm hover:bg-tcl-gold-dark transition-colors">
            Back to home
          </a>
        </div>
      ) : (
        <>
          {/* Day chips */}
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
            {days.map((d) => {
              const active = d.date === selectedDate;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => { setSelectedDate(d.date); setSelected(null); }}
                  className={`shrink-0 px-4 py-2.5 rounded-sm border text-sm transition-colors ${
                    active ? 'bg-tcl-dark text-white border-tcl-dark' : 'bg-white text-tcl-dark border-tcl-border hover:border-tcl-gold'
                  }`}
                >
                  <span className="block text-[11px] tracking-[0.15em] uppercase opacity-70">{d.label.split(',')[0]}</span>
                  <span className="block font-medium">{d.label.split(', ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Slots */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-5">
            {day?.slots.map((s) => {
              const active = selected?.start === s.start;
              return (
                <button
                  key={s.start}
                  type="button"
                  onClick={() => setSelected(s)}
                  className={`py-3 rounded-sm border text-sm font-medium transition-colors ${
                    active ? 'bg-tcl-gold text-white border-tcl-gold' : 'bg-white text-tcl-dark border-tcl-border hover:border-tcl-gold'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {error && <p className="text-red-600 text-sm mt-5">{error}</p>}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={confirm}
              disabled={!selected || booking}
              className="px-8 py-4 bg-tcl-gold text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-tcl-gold-dark transition-colors disabled:opacity-50"
            >
              {booking ? 'Confirming…' : selected ? `Confirm ${selected.label} · ${day?.label.split(', ')[1]}` : 'Select a time'}
            </button>
            <a href="/" className="text-sm text-tcl-gray underline underline-offset-4 hover:text-tcl-dark">
              I&apos;ll wait for a call instead
            </a>
          </div>
        </>
      )}
    </div>
  );
}
