// CRM v3
'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Search, Plus, Download, X, ChevronUp, ChevronDown,
  Edit2, Trash2, Phone, Globe, DollarSign,
  Users, TrendingUp, CheckCircle, Flame, AlertCircle, Save
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'committed' | 'warm' | 'cold' | 'new'
type SortKey = keyof Investor

interface Investor {
  id: string
  firstName: string
  lastName: string
  committedCapital: number | null
  phone: string
  email: string
  discipline: string
  location: string
  nextSteps: string
  priorContact: string
  website: string
  status: Status
  notes: string
  lastUpdated: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { label: string; badge: string; dot: string }> = {
  committed: { label: 'Committed',  badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-500' },
  warm:      { label: 'Warm Lead',  badge: 'bg-amber-100 text-amber-800 border border-amber-200',      dot: 'bg-amber-500'   },
  cold:      { label: 'Cold',       badge: 'bg-sky-100 text-sky-800 border border-sky-200',            dot: 'bg-sky-500'     },
  new:       { label: 'New',        badge: 'bg-gray-100 text-gray-600 border border-gray-200',         dot: 'bg-gray-400'    },
}

const EMPTY_FORM: Omit<Investor, 'id' | 'lastUpdated'> = {
  firstName: '', lastName: '', committedCapital: null, phone: '', email: '',
  discipline: '', location: '', nextSteps: '', priorContact: '', website: '',
  status: 'new', notes: '',
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED: Omit<Investor, 'id' | 'lastUpdated'>[] = [
  // ── Committed ──
  { firstName: 'Jonathan', lastName: 'Waldstreicher',    committedCapital: 250000, phone: '',               email: '',                                              discipline: 'Investor',                  location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'committed', notes: '' },
  { firstName: 'Stuart',   lastName: 'Waldstreicher',    committedCapital: 100000, phone: '',               email: '',                                              discipline: 'Investor',                  location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'committed', notes: '' },
  { firstName: 'Seth',     lastName: 'Lyons & Friends',  committedCapital: 150000, phone: '',               email: '',                                              discipline: 'Investor',                  location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'committed', notes: '' },
  { firstName: 'Ari',      lastName: 'Katz',             committedCapital: 100000, phone: '(347) 585-3788', email: 'katzconnect@gmail.com',                         discipline: 'Investor',                  location: 'West Orange, NJ',       nextSteps: 'Meet',                                priorContact: 'Jon discussion',   website: '',                                      status: 'committed', notes: '' },

  // ── Warm Leads ──
  { firstName: 'Marc',     lastName: 'Everett',          committedCapital: null,   phone: '(516) 673-6633', email: 'marceverett@gmail.com',                         discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: 'Send dinner details, NDA',            priorContact: 'Jon phone pitch',  website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Ira',      lastName: 'Savetsky',         committedCapital: null,   phone: '(516) 319-1243', email: '',                                              discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: 'Send dinner details, NDA',            priorContact: 'Jon phone pitch',  website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Scott',    lastName: 'Farber',           committedCapital: null,   phone: '(646) 853-2447', email: 'dr.farber@hillcountryps.com',                   discipline: 'Plastic Surgeon',           location: 'San Antonio, TX',       nextSteps: 'NDA, Meet again',                     priorContact: 'Jon zoom pitch',   website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Matt',     lastName: 'Greenwood',        committedCapital: null,   phone: '(908) 514-7516', email: 'matt@thegreenwoods.org',                        discipline: 'Investor',                  location: 'West Orange, NJ',       nextSteps: 'Meet',                                priorContact: 'Jon discussion',   website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Brian',    lastName: 'Lester',           committedCapital: null,   phone: '(203) 376-7133', email: 'brianwlester@gmail.com',                        discipline: 'Dermatologist, Investor',   location: 'Brookline, MA',         nextSteps: 'Follow up when $1M from Plastics',    priorContact: '',                 website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Milton',   lastName: 'Hsu',              committedCapital: null,   phone: '',               email: '',                                              discipline: 'Banker, Investor',          location: 'Jackson Hole, WY',      nextSteps: 'Send deck',                           priorContact: '',                 website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'David',    lastName: 'Staffenberg',      committedCapital: null,   phone: '',               email: 'david.staffenberg@nyulangone.org',              discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: 'Jon to email',                        priorContact: '',                 website: '',                                      status: 'warm',      notes: '' },
  { firstName: 'Arnold',   lastName: 'Bretibart',        committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Long Island',           nextSteps: '',                                    priorContact: 'Connection via Dad', website: 'https://drbreitbart.com/',             status: 'warm',      notes: '' },

  // ── New (no outreach) ──
  { firstName: 'Matt',     lastName: 'Ercolani',         committedCapital: null,   phone: '',               email: '',                                              discipline: '',                          location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Jitesh',   lastName: 'Patel',            committedCapital: null,   phone: '',               email: '',                                              discipline: '',                          location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Chris',    lastName: 'Funderbruk',       committedCapital: null,   phone: '',               email: '',                                              discipline: '',                          location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'David',    lastName: 'Rapaport',         committedCapital: null,   phone: '',               email: 'multiple emails',                               discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },

  // ── Cold – NY/NJ/NE ──
  { firstName: 'Samuel',   lastName: 'Beran',            committedCapital: null,   phone: '',               email: 'drsberan@yahoo.com',                            discipline: 'Plastic Surgeon',           location: 'Harrison, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Larry',    lastName: 'Bass',             committedCapital: null,   phone: '',               email: 'drbass@drbass.net',                             discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.drbass.net/',                status: 'cold',      notes: '' },
  { firstName: 'Nolan',    lastName: 'Karp',             committedCapital: null,   phone: '',               email: 'nolan.karp@nyulangone.org',                     discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'M. Zakir', lastName: 'Sabry',            committedCapital: null,   phone: '',               email: 'sabry@mhpsv.com',                               discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Yoel',     lastName: 'Rojas',            committedCapital: null,   phone: '',               email: 'evolve@evolvesurgeons.com',                     discipline: 'Plastic Surgeon',           location: 'Queens, NY & LA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Irene',    lastName: 'Karanetz',         committedCapital: null,   phone: '',               email: 'irena.karanetz@gmail.com',                      discipline: 'Plastic Surgeon',           location: 'Queens, NY',            nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Oren',     lastName: 'Tepper',           committedCapital: null,   phone: '',               email: 'orenteppermd@yahoo.com',                        discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Joshua',   lastName: 'Zuckerman',        committedCapital: null,   phone: '',               email: 'jdzuckerman@gmail.com',                         discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Ryan',     lastName: 'Neinstein',        committedCapital: null,   phone: '',               email: 'drneinstein@neinsteinplasticsurgery.com',        discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Aviva',    lastName: 'Preminger',        committedCapital: null,   phone: '',               email: 'premingermd@gmail.com',                         discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Stelios',  lastName: 'Wilson',           committedCapital: null,   phone: '',               email: 'stelios.wilson@gmail.com',                      discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Sharon',   lastName: 'Giese',            committedCapital: null,   phone: '',               email: 'info@sharongiesemd.com',                        discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Craig',    lastName: 'Baldenhofer',      committedCapital: null,   phone: '',               email: 'craig@craigbaldenhofermd.com',                  discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Andrew',   lastName: 'Weinstein',        committedCapital: null,   phone: '',               email: 'a@drandrewweinstein.com',                       discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Richard',  lastName: 'Tepper',           committedCapital: null,   phone: '',               email: 'info@drrichardtepper.com',                      discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Brielle',  lastName: 'Weinstein',        committedCapital: null,   phone: '',               email: 'brielle.weinstein@gmail.com',                   discipline: '',                          location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Gila',     lastName: 'Weinstein',        committedCapital: null,   phone: '',               email: 'gilahouten@yahoo.com',                          discipline: '',                          location: '',                      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Stephen',  lastName: 'Greenberg',        committedCapital: null,   phone: '',               email: 'docstg@aol.com',                                discipline: 'Plastic Surgeon',           location: 'Woodbury, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.greenbergcosmeticsurgery.com/', status: 'cold', notes: '' },
  { firstName: 'Scott',    lastName: 'Greenberg',        committedCapital: null,   phone: '',               email: 'drgreenberg@wpplasticsurgery.com',              discipline: 'Plastic Surgeon',           location: 'Winter Park, FL',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.wpplasticsurgery.com/',       status: 'cold',      notes: '' },
  { firstName: 'Lauren',   lastName: 'Greenberg',        committedCapital: null,   phone: '',               email: 'lgreenbergmd@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Menlo Park, CA',        nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'David',    lastName: 'Hidalgo',          committedCapital: null,   phone: '',               email: 'dh@drdavidhidalgo.com',                         discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'David',    lastName: 'Cangello',         committedCapital: null,   phone: '',               email: 'cangelld@hotmail.com',                          discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.cangelloplasticsurgery.com/', status: 'cold', notes: '' },
  { firstName: 'Christopher', lastName: 'Chia',          committedCapital: null,   phone: '',               email: 'christophertchia@gmail.com',                    discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.bodysculpt.com/',            status: 'cold',      notes: '' },
  { firstName: 'Jeff',     lastName: 'Lisiecki',         committedCapital: null,   phone: '',               email: 'drjefflisiecki@gmail.com',                      discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.drjefflisiecki.com/',        status: 'cold',      notes: '' },
  { firstName: 'Jeremy',   lastName: 'Nikfarjam',        committedCapital: null,   phone: '',               email: 'executivedirector@thenewyouplasticsurgery.com', discipline: 'Plastic Surgeon',           location: 'Roslyn, NY',            nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.thenewyouplasticsurgery.com/', status: 'cold', notes: '' },
  { firstName: 'Andrew',   lastName: 'Turk',             committedCapital: null,   phone: '',               email: 'aturk@naples-csc.com',                          discipline: 'Plastic Surgeon',           location: 'Naples, FL',            nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Umbareen', lastName: 'Mahmood',          committedCapital: null,   phone: '(917) 426-2936', email: 'drumahmood@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.drumahmood.com',             status: 'cold',      notes: '' },
  { firstName: 'Dierdre',  lastName: 'Marshall',         committedCapital: null,   phone: '',               email: 'deirdremarshall@gmail.com',                     discipline: 'Plastic Surgeon',           location: 'Miami, FL',             nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://zoeplasticsurgery.com/',         status: 'cold',      notes: '' },
  { firstName: 'Dan',      lastName: 'Yamini',           committedCapital: null,   phone: '',               email: 'dan_yamini@yahoo.com',                          discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Barry',    lastName: 'Douglas',          committedCapital: null,   phone: '',               email: 'bdouglas@lipsg.com',                            discipline: 'Plastic Surgeon',           location: 'Long Island, NY',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.lipsg.com/',                status: 'cold',      notes: '' },
  { firstName: 'Leland',   lastName: 'Deane',            committedCapital: null,   phone: '',               email: 'leland.deane@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Long Island, NY',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.lipsg.com/',                status: 'cold',      notes: '' },
  { firstName: 'Trent',    lastName: 'Douglas',          committedCapital: null,   phone: '',               email: 'trentdouglas@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Knoxville, TN',         nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.hkbsurgery.com/',            status: 'cold',      notes: '' },
  { firstName: 'Tansar',   lastName: 'Mir',              committedCapital: null,   phone: '',               email: 'multiple emails',                               discipline: 'Plastic Surgeon',           location: 'New York, NY',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.tmirmd.com',                status: 'cold',      notes: '' },

  // ── Cold – Beverly Hills / LA ──
  { firstName: 'Sheila',   lastName: 'Nazarian',         committedCapital: null,   phone: '',               email: 'snm2626@gmail.com',                             discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.nazarianplasticsurgery.com/', status: 'cold',  notes: '' },
  { firstName: 'Randal',   lastName: 'Haworth',          committedCapital: null,   phone: '',               email: 'rdhaworth@me.com',                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.drhaworth.com/',            status: 'cold',      notes: '' },
  { firstName: 'Steven',   lastName: 'Hoefflin',         committedCapital: null,   phone: '',               email: 'steven@hoefflin.com',                           discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.hoefflin.com/',              status: 'cold',      notes: '' },
  { firstName: 'Brent',    lastName: 'Moelleken',        committedCapital: null,   phone: '',               email: 'drbrent@drbrent.com',                           discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.drbrent.com/',               status: 'cold',      notes: '' },
  { firstName: 'John',     lastName: 'Layke',            committedCapital: null,   phone: '',               email: 'jlayke@yahoo.com',                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Ashkan',   lastName: 'Ghavami',          committedCapital: null,   phone: '',               email: 'ashghavami@yahoo.com',                          discipline: 'Plastic Surgeon',           location: 'Beverly Hills, CA',     nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.ghavamiplasticsurgery.com/', status: 'cold',  notes: '' },
  { firstName: 'Joseph',   lastName: 'Carey',            committedCapital: null,   phone: '',               email: 'josephnicholascarey@gmail.com',                 discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },

  // ── Cold – Other States ──
  { firstName: 'Christine', lastName: 'Fisher',          committedCapital: null,   phone: '',               email: 'chrisfishermd@gmail.com',                       discipline: 'Plastic Surgeon',           location: 'Austin, TX',            nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://christinefishermd.com/',          status: 'cold',      notes: '' },
  { firstName: 'Orna',     lastName: 'Fisher',           committedCapital: null,   phone: '',               email: 'drornafisher@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'San Mateo, CA',         nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.elitesurgerymd.com/',         status: 'cold',      notes: '' },
  { firstName: 'Mark',     lastName: 'Fisher',           committedCapital: null,   phone: '',               email: 'drfisher@drmarkfisher.com',                     discipline: 'Plastic Surgeon',           location: 'Westport, CT',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.drmarkfisher.com/',           status: 'cold',      notes: '' },
  { firstName: 'Brandon',  lastName: 'Reynolds',         committedCapital: null,   phone: '',               email: 'breynolds@reynoldscosmetics.com',                discipline: 'Plastic Surgeon',           location: 'Las Vegas, NV',         nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://reynoldscosmetics.com/',          status: 'cold',      notes: '' },
  { firstName: 'William',  lastName: 'Reynolds',         committedCapital: null,   phone: '',               email: 'wrreynoldsmd@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Memphis, TN',           nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Hector',   lastName: 'Salazar-Reyes',    committedCapital: null,   phone: '',               email: 'hectorsalazarreyes@hotmail.com',                discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.ljcsc.com/',                 status: 'cold',      notes: '' },
  { firstName: 'Samuel',   lastName: 'Corey',            committedCapital: null,   phone: '',               email: 'drcorey@samuelcoreymd.com',                     discipline: 'Plastic Surgeon',           location: 'Indianapolis, IN',      nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'https://www.samuelcoreymd.com',          status: 'cold',      notes: '' },
  { firstName: 'David',    lastName: 'Dreyfus',          committedCapital: null,   phone: '',               email: 'doc@dreyfussplasticsurgery.com',                discipline: 'Plastic Surgeon',           location: 'Orland Park, IL',       nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.dreyfussplasticsurgery.com/', status: 'cold',  notes: '' },
  { firstName: 'Thomas',   lastName: 'Sands',            committedCapital: null,   phone: '',               email: 'drsands@metps.com',                             discipline: 'Plastic Surgeon',           location: 'Metairie, LA',          nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://metairieplasticsurgeons.com/',    status: 'cold',      notes: '' },
  { firstName: 'John',     lastName: 'Corey',            committedCapital: null,   phone: '',               email: 'coreymdpc@gmail.com',                           discipline: 'Plastic Surgeon',           location: 'Scottsdale, AZ',        nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.doctorcorey.com/',            status: 'cold',      notes: '' },
  { firstName: 'Andres',   lastName: 'Taleisnik',        committedCapital: null,   phone: '',               email: 'ataleisnikmd@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Orange, CA',            nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.ataleisnikmd.com/',           status: 'cold',      notes: '' },
  { firstName: 'Duncan',   lastName: 'Hughes',           committedCapital: null,   phone: '',               email: 'duncanhughes@feelsynergy.com',                  discipline: 'Plastic Surgeon',           location: 'Raleigh, NC',           nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: 'http://www.feelsynergy.com/',            status: 'cold',      notes: '' },
  { firstName: 'Kent',     lastName: 'Hughes',           committedCapital: null,   phone: '',               email: 'kentchughesmd@yahoo.com',                       discipline: 'Plastic Surgeon',           location: 'Fort Worth, TX',        nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },
  { firstName: 'Alexey',   lastName: 'Markelov',         committedCapital: null,   phone: '',               email: 'dr.markelov@gmail.com',                         discipline: 'Plastic Surgeon',           location: 'Tampa, FL',             nextSteps: '',                                    priorContact: 'Emailed via ASPS', website: '',                                      status: 'cold',      notes: '' },

  // ── New – Beverly Hills / LA (not yet contacted) ──
  { firstName: 'Paul',     lastName: 'Nassif',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Terry',    lastName: 'Dubrow',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Garth',    lastName: 'Fisher',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Michael',  lastName: 'Obeng',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Chris',    lastName: 'Moss',             committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Robert',   lastName: 'Rey',              committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Kevin',    lastName: 'Sands',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Jason',    lastName: 'Diamond',          committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Ben',      lastName: 'Talei',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Kenneth',  lastName: 'Benjamin Hughes',  committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Los Angeles, CA',       nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },

  // ── New – Orange County / Newport Beach / La Jolla ──
  { firstName: 'Arian',    lastName: 'Mowlavi',          committedCapital: null,   phone: '(949) 488-8110', email: 'drmowlavi@gmail.com',                           discipline: 'Plastic Surgeon',           location: 'Laguna Beach, CA',      nextSteps: '',                                    priorContact: '',                 website: 'https://www.drlaguna.com',               status: 'new',       notes: '' },
  { firstName: 'Milind',   lastName: 'Ambe',             committedCapital: null,   phone: '',               email: 'milind@newportbeachplasticsurgery.com',         discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.newportbeachplasticsurgery.com/', status: 'new', notes: '' },
  { firstName: 'Ali',      lastName: 'Roham',            committedCapital: null,   phone: '',               email: 'draliroham@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'https://rohamplasticsurgery.com/',       status: 'new',       notes: '' },
  { firstName: 'Semira',   lastName: 'Bayati',           committedCapital: null,   phone: '',               email: 'sbayatimd7@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.drbayati.com/',               status: 'new',       notes: '' },
  { firstName: 'Hootan',   lastName: 'Daneshmand',       committedCapital: null,   phone: '',               email: 'hootied@yahoo.com',                             discipline: 'Plastic Surgeon',           location: 'Foothill Ranch, CA',    nextSteps: '',                                    priorContact: '',                 website: 'http://www.ocplasticsurgeons.com/',      status: 'new',       notes: '' },
  { firstName: 'Brandon',  lastName: 'Richland',         committedCapital: null,   phone: '',               email: 'dr.richland@gmail.com',                         discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.richlandmd.com/',             status: 'new',       notes: '' },
  { firstName: 'John',     lastName: 'Larson',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Hisham',   lastName: 'Seify',            committedCapital: null,   phone: '',               email: 'drseify@gmail.com',                             discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.drseify.com/',               status: 'new',       notes: '' },
  { firstName: 'Matthew',  lastName: 'Nykiel',           committedCapital: null,   phone: '',               email: 'mjnykiel@gmail.com',                            discipline: 'Plastic Surgeon',           location: 'Upland, CA',            nextSteps: '',                                    priorContact: '',                 website: 'https://socalplasticsurgeons.com/',      status: 'new',       notes: '' },
  { firstName: 'Deborah',  lastName: 'Ekstrom',          committedCapital: null,   phone: '',               email: 'deborahekstrom@gmail.com',                      discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://orangecountyplasticsurgery.com/', status: 'new',       notes: '' },
  { firstName: 'Jeffrey',  lastName: 'Klein',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Sanjay',   lastName: 'Grover',           committedCapital: null,   phone: '',               email: 'drsanjaygrover@yahoo.com',                      discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'https://www.drgrover.com/',              status: 'new',       notes: '' },
  { firstName: 'Joseph',   lastName: 'Cruise',           committedCapital: null,   phone: '',               email: 'josephcruisemd@gmail.com',                      discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.cruiseplasticsurgery.com/',   status: 'new',       notes: '' },
  { firstName: 'Andrew',   lastName: 'Smith',            committedCapital: null,   phone: '',               email: 'andrewsmithmd@mac.com',                         discipline: 'Plastic Surgeon',           location: 'Irvine, CA',            nextSteps: '',                                    priorContact: '',                 website: 'http://asmithmd.com/',                  status: 'new',       notes: '' },
  { firstName: 'Juris',    lastName: 'Bunkis',           committedCapital: null,   phone: '',               email: 'bunkis@ocps.com',                               discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.orangecountyplasticsurgery.com/', status: 'new', notes: '' },
  { firstName: 'Daniel',   lastName: 'Brown',            committedCapital: null,   phone: '',               email: 'danielbrownmd@gmail.com',                       discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.danielbrownmd.com/',          status: 'new',       notes: '' },
  { firstName: 'Diana',    lastName: 'Breister Ghosh',   committedCapital: null,   phone: '',               email: 'dbreister@hotmail.com',                         discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'https://www.ljcsc.com/',                 status: 'new',       notes: '' },
  { firstName: 'Salvatore', lastName: 'Pacella',         committedCapital: null,   phone: '',               email: 'dr.pacella@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.scripps.org/',               status: 'new',       notes: '' },
  { firstName: 'Amy',      lastName: 'Bandy',            committedCapital: null,   phone: '',               email: 'dramybandy@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.drbandy.com/',               status: 'new',       notes: '' },
  { firstName: 'Johan',    lastName: 'Brahme',           committedCapital: null,   phone: '',               email: 'drbrahme@ljcsc.com',                            discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.ljcsc.com/',                 status: 'new',       notes: '' },
  { firstName: 'Ali',      lastName: 'Sajjadian',        committedCapital: null,   phone: '',               email: 'drsajjadian@gmail.com',                         discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.drsajjadian.com/',            status: 'new',       notes: '' },
  { firstName: 'Jonathan', lastName: 'Zelken',           committedCapital: null,   phone: '',               email: 'drzelken@zelkeninstitute.com',                  discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'https://www.zelkeninstitute.com/',       status: 'new',       notes: '' },
  { firstName: 'Greg',     lastName: 'Park',             committedCapital: null,   phone: '',               email: 'gregpark65@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.drgregpark.com/',             status: 'new',       notes: '' },
  { firstName: 'Hunter',   lastName: 'Benvenuti',        committedCapital: null,   phone: '',               email: 'hunter.benvenuti@gmail.com',                    discipline: 'Plastic Surgeon',           location: 'Mission Viejo, CA',     nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Jeffrey',  lastName: 'Umansky',          committedCapital: null,   phone: '',               email: 'jeffumanskymd@yahoo.com',                       discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.drumansky.com/',              status: 'new',       notes: '' },
  { firstName: 'John',     lastName: 'Smoot',            committedCapital: null,   phone: '',               email: 'johndsmoot@msn.com',                            discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: 'http://www.ljcsc.com/',                 status: 'new',       notes: '' },
  { firstName: 'Larry',    lastName: 'Pollack',          committedCapital: null,   phone: '',               email: 'lljm10@aol.com',                                discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: '',                 website: 'http://www.delmarplasticsurgery.com/',   status: 'new',       notes: '' },
  { firstName: 'Ronald',   lastName: 'Moser',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Juan Capistrano, CA', nextSteps: '',                                  priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Raman',    lastName: 'Mehrzad',          committedCapital: null,   phone: '',               email: 'raman_m1@hotmail.com',                          discipline: 'Plastic Surgeon',           location: 'Los Alamitos, CA',      nextSteps: '',                                    priorContact: '',                 website: 'http://www.oceanplasticsurgery.com/',    status: 'new',       notes: '' },
  { firstName: 'Richard',  lastName: 'Chaffoo',          committedCapital: null,   phone: '',               email: 'rchaffoomd@gmail.com',                          discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: 'http://www.lajollaskin.com/',            status: 'new',       notes: '' },
  { firstName: 'S. Robert', lastName: 'Pollack',         committedCapital: null,   phone: '',               email: 'rpollack@drpollack.com',                        discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Tenley',   lastName: 'Lawton',           committedCapital: null,   phone: '',               email: 'tenleylawton@gmail.com',                        discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: 'http://www.lawtonmd.com/',              status: 'new',       notes: '' },
  { firstName: 'William',  lastName: 'Umansky',          committedCapital: null,   phone: '',               email: 'umandr@aol.com',                                discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Wael',     lastName: 'Khouli',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Marguerite', lastName: 'Bernett',        committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Charles',  lastName: 'Sarosy',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Carl',     lastName: 'Powell',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Luke',     lastName: 'Swistun',          committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Gilbert',  lastName: 'Lee',              committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Robert',   lastName: 'Singer',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Brian',    lastName: 'Awadalla',         committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'John',     lastName: 'Hilinski',         committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'James',    lastName: 'Koehler',          committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Jason',    lastName: 'Pham',             committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Huntington Beach, CA',  nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Sarmela',  lastName: 'Sunder',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Newport Beach, CA',     nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Brian',    lastName: 'Rolfes',           committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'Huntington Beach, CA',  nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Kiersten', lastName: 'Riedler',          committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'La Jolla, CA',          nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Michael',  lastName: 'Golpa',            committedCapital: null,   phone: '',               email: '',                                              discipline: 'Plastic Surgeon',           location: 'San Diego, CA',         nextSteps: '',                                    priorContact: '',                 website: '',                                      status: 'new',       notes: '' },
  { firstName: 'Elan',     lastName: 'Singer',           committedCapital: null,   phone: '',               email: 'elansinger@aol.com',                            discipline: 'Plastic Surgeon',           location: '',                      nextSteps: '',                                    priorContact: '',                 website: 'http://www.ebsplasticsurgery.com/',      status: 'new',       notes: '' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function seedWithIds(): Investor[] {
  return SEED.map(s => ({ ...s, id: genId(), lastUpdated: new Date().toISOString() }))
}

function fmt$$(n: number | null): string {
  if (!n) return '—'
  return '$' + n.toLocaleString()
}

function exportCSV(investors: Investor[]) {
  const headers = ['First Name','Last Name','Status','Committed Capital','Phone','Email','Discipline','Location','Next Steps','Prior Contact','Website','Notes']
  const rows = investors.map(i => [
    i.firstName, i.lastName, STATUS_CONFIG[i.status].label,
    i.committedCapital ?? '',
    i.phone, i.email, i.discipline, i.location,
    i.nextSteps, i.priorContact, i.website, i.notes
  ])
  const csv = [headers, ...rows]
    .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `investor-crm-${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

interface ModalProps {
  investor: Partial<Investor>
  onSave: (data: Omit<Investor, 'id' | 'lastUpdated'>) => void
  onClose: () => void
  title: string
}

function InvestorModal({ investor, onSave, onClose, title }: ModalProps) {
  const [form, setForm] = useState<Omit<Investor, 'id' | 'lastUpdated'>>({
    ...EMPTY_FORM,
    ...investor,
    committedCapital: investor.committedCapital ?? null,
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value
    setForm(prev => ({ ...prev, [k]: k === 'committedCapital' ? (v === '' ? null : Number(v.replace(/[^0-9.]/g, ''))) : v }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.lastName} onChange={set('lastName')} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.status} onChange={set('status')}>
                {(Object.keys(STATUS_CONFIG) as Status[]).map(s => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Committed Capital ($)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.committedCapital ?? ''} onChange={set('committedCapital')} placeholder="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.phone} onChange={set('phone')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.email} onChange={set('email')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Discipline</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.discipline} onChange={set('discipline')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.location} onChange={set('location')} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.website} onChange={set('website')} placeholder="https://" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Prior Contact</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.priorContact} onChange={set('priorContact')} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Next Steps</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.nextSteps} onChange={set('nextSteps')} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
            <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" value={form.notes} onChange={set('notes')} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <Save size={14} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Table Header Components ─────────────────────────────────────────────────

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: 'asc' | 'desc' }) {
  if (sortKey !== col) return <ChevronUp size={12} className="text-gray-300" />
  return sortDir === 'asc' ? <ChevronUp size={12} className="text-blue-600" /> : <ChevronDown size={12} className="text-blue-600" />
}

function TH({ col, label, sortKey, sortDir, onSort }: {
  col: SortKey; label: string; sortKey: SortKey; sortDir: 'asc' | 'desc'; onSort: (k: SortKey) => void
}) {
  return (
    <th onClick={() => onSort(col)} className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none whitespace-nowrap">
      <span className="flex items-center gap-1">{label}<SortIcon col={col} sortKey={sortKey} sortDir={sortDir} /></span>
    </th>
  )
}

// ─── Main CRM Component ───────────────────────────────────────────────────────

export default function CRMPage() {
  const [investors, setInvestors] = useState<Investor[]>([])
  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('lastName')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('crystalshape_crm')
    if (saved) {
      try { setInvestors(JSON.parse(saved)) } catch { setInvestors(seedWithIds()) }
    } else {
      setInvestors(seedWithIds())
    }
    setLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (loaded) localStorage.setItem('crystalshape_crm', JSON.stringify(investors))
  }, [investors, loaded])

  // ── Stats ──
  const stats = useMemo(() => {
    const committed = investors.filter(i => i.status === 'committed')
    const totalCapital = committed.reduce((s, i) => s + (i.committedCapital ?? 0), 0)
    return {
      total: investors.length,
      committed: committed.length,
      warm: investors.filter(i => i.status === 'warm').length,
      cold: investors.filter(i => i.status === 'cold').length,
      newCount: investors.filter(i => i.status === 'new').length,
      totalCapital,
    }
  }, [investors])

  // ── Filter + Sort ──
  const filtered = useMemo(() => {
    let list = investors
    if (statusFilter !== 'all') list = list.filter(i => i.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(i =>
        [i.firstName, i.lastName, i.email, i.phone, i.location, i.discipline, i.nextSteps, i.priorContact, i.notes]
          .some(f => f.toLowerCase().includes(q))
      )
    }
    return [...list].sort((a, b) => {
      let av = a[sortKey] ?? ''
      let bv = b[sortKey] ?? ''
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
      av = String(av).toLowerCase(); bv = String(bv).toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [investors, search, statusFilter, sortKey, sortDir])

  // ── Handlers ──
  const toggleSort = useCallback((key: SortKey) => {
    setSortKey(prev => { if (prev === key) { setSortDir(d => d === 'asc' ? 'desc' : 'asc'); return key } setSortDir('asc'); return key })
  }, [])

  const handleSave = useCallback((data: Omit<Investor, 'id' | 'lastUpdated'>) => {
    if (editingId) {
      setInvestors(prev => prev.map(i => i.id === editingId ? { ...i, ...data, lastUpdated: new Date().toISOString() } : i))
      setEditingId(null)
    } else {
      setInvestors(prev => [...prev, { ...data, id: genId(), lastUpdated: new Date().toISOString() }])
      setAdding(false)
    }
  }, [editingId])

  const handleDelete = useCallback((id: string) => {
    setInvestors(prev => prev.filter(i => i.id !== id))
    setDeleteConfirm(null)
    setExpandedId(null)
  }, [])

  const editingInvestor = editingId ? investors.find(i => i.id === editingId) : undefined

  if (!loaded) return <div className="flex items-center justify-center h-screen text-gray-500">Loading…</div>

  const TABS: { key: Status | 'all'; label: string; count: number }[] = [
    { key: 'all',       label: 'All',       count: stats.total    },
    { key: 'committed', label: 'Committed', count: stats.committed },
    { key: 'warm',      label: 'Warm',      count: stats.warm     },
    { key: 'cold',      label: 'Cold',      count: stats.cold     },
    { key: 'new',       label: 'New',       count: stats.newCount },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-0.5">Crystal Shape</p>
            <h1 className="text-xl font-bold text-gray-900">Investor CRM</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => exportCSV(filtered)} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
              <Download size={15} /> Export CSV
            </button>
            <button onClick={() => setAdding(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus size={15} /> Add Contact
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-emerald-600 mb-1"><DollarSign size={16} /><span className="text-xs font-semibold uppercase tracking-wide">Committed</span></div>
            <p className="text-2xl font-bold text-gray-900">{fmt$$(stats.totalCapital)}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stats.committed} investor{stats.committed !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-amber-600 mb-1"><Flame size={16} /><span className="text-xs font-semibold uppercase tracking-wide">Warm Leads</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.warm}</p>
            <p className="text-xs text-gray-500 mt-0.5">Active engagement</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-sky-600 mb-1"><TrendingUp size={16} /><span className="text-xs font-semibold uppercase tracking-wide">Cold</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.cold}</p>
            <p className="text-xs text-gray-500 mt-0.5">Contacted, no response</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1"><Users size={16} /><span className="text-xs font-semibold uppercase tracking-wide">Total</span></div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stats.newCount} not yet contacted</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name, email, location, discipline…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
            </div>
            <div className="flex gap-1 flex-wrap">
              {TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setStatusFilter(t.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === t.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {t.label} <span className={`ml-1 ${statusFilter === t.key ? 'opacity-80' : 'text-gray-400'}`}>({t.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/50">
                <tr>
                  <TH col="lastName" label="Name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <TH col="discipline" label="Discipline" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <TH col="location" label="Location" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <TH col="email" label="Email" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <TH col="nextSteps" label="Next Steps" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <TH col="committedCapital" label="Capital" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No contacts found.</td></tr>
                )}
                {filtered.map(inv => (
                  <React.Fragment key={inv.id}>
                    <tr

                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${expandedId === inv.id ? 'bg-blue-50/60' : ''}`}
                      onClick={() => setExpandedId(expandedId === inv.id ? null : inv.id)}
                    >
                      <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {inv.firstName} {inv.lastName}
                      </td>
                      <td className="px-3 py-3"><StatusBadge status={inv.status} /></td>
                      <td className="px-3 py-3 text-gray-600 text-xs">{inv.discipline || '—'}</td>
                      <td className="px-3 py-3 text-gray-600 text-xs whitespace-nowrap">{inv.location || '—'}</td>
                      <td className="px-3 py-3 text-gray-600 text-xs">
                        {inv.email && inv.email !== 'multiple emails' && inv.email !== 'N/A'
                          ? <a href={`mailto:${inv.email}`} onClick={e => e.stopPropagation()} className="text-blue-600 hover:underline">{inv.email}</a>
                          : <span>{inv.email || '—'}</span>}
                      </td>
                      <td className="px-3 py-3 text-gray-600 text-xs max-w-[180px] truncate" title={inv.nextSteps}>{inv.nextSteps || '—'}</td>
                      <td className="px-3 py-3 text-gray-900 font-medium text-xs whitespace-nowrap">
                        {inv.committedCapital ? <span className="text-emerald-700 font-semibold">{fmt$$(inv.committedCapital)}</span> : '—'}
                      </td>
                      <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-1 justify-end">
                          <button onClick={() => setEditingId(inv.id)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"><Edit2 size={14} /></button>
                          <button onClick={() => setDeleteConfirm(inv.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expandedId === inv.id && (
                      <tr key={`${inv.id}-expanded`} className="bg-blue-50/30">
                        <td colSpan={8} className="px-4 pb-4 pt-2">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                            {inv.phone && (
                              <div className="flex items-start gap-2">
                                <Phone size={13} className="text-gray-400 mt-0.5 shrink-0" />
                                <div><p className="text-xs text-gray-500">Phone</p><p className="text-gray-800">{inv.phone}</p></div>
                              </div>
                            )}
                            {inv.website && (
                              <div className="flex items-start gap-2">
                                <Globe size={13} className="text-gray-400 mt-0.5 shrink-0" />
                                <div><p className="text-xs text-gray-500">Website</p>
                                  <a href={inv.website.startsWith('http') ? inv.website : `https://${inv.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs truncate block max-w-[200px]">{inv.website}</a>
                                </div>
                              </div>
                            )}
                            {inv.priorContact && (
                              <div className="flex items-start gap-2">
                                <AlertCircle size={13} className="text-gray-400 mt-0.5 shrink-0" />
                                <div><p className="text-xs text-gray-500">Prior Contact</p><p className="text-gray-800">{inv.priorContact}</p></div>
                              </div>
                            )}
                            {inv.notes && (
                              <div className="flex items-start gap-2 col-span-2">
                                <CheckCircle size={13} className="text-gray-400 mt-0.5 shrink-0" />
                                <div><p className="text-xs text-gray-500">Notes</p><p className="text-gray-800">{inv.notes}</p></div>
                              </div>
                            )}
                            <div className="text-xs text-gray-400 col-span-2 sm:col-span-4">
                              Last updated {new Date(inv.lastUpdated).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
              Showing {filtered.length} of {investors.length} contacts
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(adding || editingId) && (
        <InvestorModal
          title={editingId ? 'Edit Contact' : 'Add Contact'}
          investor={editingInvestor ?? {}}
          onSave={handleSave}
          onClose={() => { setAdding(false); setEditingId(null) }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Contact?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This will permanently remove <strong>{investors.find(i => i.id === deleteConfirm)?.firstName} {investors.find(i => i.id === deleteConfirm)?.lastName}</strong> from your CRM.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
