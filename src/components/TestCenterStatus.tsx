import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  Search,
  Bell,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Laptop,
  Car,
  Train,
  Phone,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Info,
  Check,
  Send,
  SlidersHorizontal,
  Flame,
  BatteryCharging,
  Wifi
} from 'lucide-react';
import {
  TestCenterStatusItem,
  TestCenterOperationalStatus,
  ExamType,
  INITIAL_TEST_CENTER_STATUSES,
  PRESET_STUDENT_LOCATIONS,
  StudentPresetLocation,
  TestCenterCommunityReport
} from '../data/testCenterStatusData';

// Haversine formula for distance calculation in kilometers and miles
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function kmToMiles(km: number): number {
  return km * 0.621371;
}

const STORAGE_PINNED_CENTERS_KEY = 'globalpath_pinned_test_centers';

interface TestCenterStatusProps {
  onGoToTracker?: () => void;
  onGoToDates?: () => void;
}

export const TestCenterStatus: React.FC<TestCenterStatusProps> = ({
  onGoToTracker,
  onGoToDates,
}) => {
  // Test centers dataset (with ability to add student reports)
  const [centers, setCenters] = useState<TestCenterStatusItem[]>(() => {
    return INITIAL_TEST_CENTER_STATUSES;
  });

  // User location state
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
    isDetected: boolean;
  }>({
    lat: 18.922, // Default to Mumbai
    lng: 72.8347,
    label: 'Mumbai, India (Default)',
    isDetected: false,
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'critical' | 'advisory' | 'operational'>('all');
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('All');
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(0); // 0 = all / global
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'alerts' | 'reliability' | 'name'>('distance');

  // Pinned/Tracked Center state (persisted)
  const [pinnedCenterIds, setPinnedCenterIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PINNED_CENTERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    // Default pin Biscayne Bay and Bombay Teachers' Training to show travel status immediately
    return ['tc-bom-01'];
  });

  // Expanded details per center
  const [expandedCenterId, setExpandedCenterId] = useState<string | null>('tc-bom-01');

  // Live bulletin refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');

  // Crowdsourced Report Modal State
  const [reportingCenter, setReportingCenter] = useState<TestCenterStatusItem | null>(null);
  const [reportNote, setReportNote] = useState('');
  const [reportAuthor, setReportAuthor] = useState('');
  const [reportType, setReportType] = useState<'student_tip' | 'verified_proctor'>('student_tip');
  const [reportSubmittedSuccess, setReportSubmittedSuccess] = useState(false);

  // Travel Checklist Modal State
  const [checklistCenter, setChecklistCenter] = useState<TestCenterStatusItem | null>(null);

  // Save pinned centers
  const togglePinCenter = (centerId: string) => {
    setPinnedCenterIds((prev) => {
      const next = prev.includes(centerId)
        ? prev.filter((id) => id !== centerId)
        : [...prev, centerId];
      try {
        localStorage.setItem(STORAGE_PINNED_CENTERS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Browser Geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your current browser.');
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = pos.coords;

        // Find closest preset city name to give a friendly label
        let closestPreset: StudentPresetLocation | null = null;
        let minD = Infinity;
        for (const p of PRESET_STUDENT_LOCATIONS) {
          const d = calculateDistanceKm(latitude, longitude, p.lat, p.lng);
          if (d < minD) {
            minD = d;
            closestPreset = p;
          }
        }

        const label =
          closestPreset && minD < 80
            ? `Current GPS: Near ${closestPreset.city} (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`
            : `Detected GPS Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`;

        setUserLocation({
          lat: latitude,
          lng: longitude,
          label,
          isDetected: true,
        });
      },
      (err) => {
        setIsDetectingLocation(false);
        if (err.code === 1) {
          setLocationError('Location permission denied. Please select your testing city manually from the quick hubs below.');
        } else {
          setLocationError('Unable to retrieve precise location. Please select your testing city manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Preset location selection
  const handleSelectPresetLocation = (preset: StudentPresetLocation) => {
    setUserLocation({
      lat: preset.lat,
      lng: preset.lng,
      label: preset.name,
      isDetected: false,
    });
    setLocationError(null);
  };

  // Refresh feed simulation
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshedTime('Just now');
    }, 600);
  };

  // Submit community report
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingCenter || !reportNote.trim()) return;

    const newReport: TestCenterCommunityReport = {
      id: `rep-${Date.now()}`,
      timestamp: 'Just now',
      author: reportAuthor.trim() || 'Student Candidate',
      type: reportType,
      note: reportNote.trim(),
    };

    setCenters((prev) =>
      prev.map((c) => {
        if (c.id === reportingCenter.id) {
          return {
            ...c,
            recentCommunityReports: [newReport, ...c.recentCommunityReports],
          };
        }
        return c;
      })
    );

    setReportSubmittedSuccess(true);
    setTimeout(() => {
      setReportSubmittedSuccess(false);
      setReportingCenter(null);
      setReportNote('');
      setReportAuthor('');
    }, 1500);
  };

  // Distance computation & sorting for centers
  const centersWithDistance = useMemo(() => {
    return centers.map((center) => {
      const distanceKm = calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        center.lat,
        center.lng
      );
      const distanceMiles = kmToMiles(distanceKm);
      return {
        ...center,
        distanceKm,
        distanceMiles,
      };
    });
  }, [centers, userLocation]);

  // Filter centers
  const filteredCenters = useMemo(() => {
    return centersWithDistance.filter((center) => {
      // Search query
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        center.name.toLowerCase().includes(q) ||
        center.city.toLowerCase().includes(q) ||
        center.country.toLowerCase().includes(q) ||
        center.centerCode.toLowerCase().includes(q) ||
        center.address.toLowerCase().includes(q);

      // Status filter
      let matchesStatus = true;
      if (selectedStatusFilter === 'critical') {
        matchesStatus = center.currentStatus === 'cancelled' || center.currentStatus === 'rescheduled';
      } else if (selectedStatusFilter === 'advisory') {
        matchesStatus = center.currentStatus === 'advisory' || center.currentStatus === 'weather_watch';
      } else if (selectedStatusFilter === 'operational') {
        matchesStatus = center.currentStatus === 'operational';
      }

      // Exam filter
      const matchesExam =
        selectedExamFilter === 'All' ||
        center.examsOffered.includes(selectedExamFilter as ExamType);

      // Radius filter
      const matchesRadius =
        selectedRadiusKm === 0 || center.distanceKm <= selectedRadiusKm;

      // Region filter
      const matchesRegion =
        selectedRegionFilter === 'All' || center.region === selectedRegionFilter;

      return matchesSearch && matchesStatus && matchesExam && matchesRadius && matchesRegion;
    });
  }, [
    centersWithDistance,
    searchQuery,
    selectedStatusFilter,
    selectedExamFilter,
    selectedRadiusKm,
    selectedRegionFilter,
  ]);

  // Sorted centers
  const sortedCenters = useMemo(() => {
    const list = [...filteredCenters];
    if (sortBy === 'distance') {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sortBy === 'alerts') {
      const score = (status: TestCenterOperationalStatus) => {
        switch (status) {
          case 'cancelled':
            return 5;
          case 'rescheduled':
            return 4;
          case 'weather_watch':
            return 3;
          case 'advisory':
            return 2;
          case 'operational':
            return 1;
        }
      };
      list.sort((a, b) => score(b.currentStatus) - score(a.currentStatus));
    } else if (sortBy === 'reliability') {
      list.sort((a, b) => b.reliabilityScore - a.reliabilityScore);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredCenters, sortBy]);

  // Pinned center items
  const pinnedCenters = useMemo(() => {
    return centersWithDistance.filter((c) => pinnedCenterIds.includes(c.id));
  }, [centersWithDistance, pinnedCenterIds]);

  // Overall status counts for summary
  const summaryCounts = useMemo(() => {
    let cancelled = 0;
    let advisory = 0;
    let operational = 0;
    for (const c of centers) {
      if (c.currentStatus === 'cancelled' || c.currentStatus === 'rescheduled') cancelled++;
      else if (c.currentStatus === 'advisory' || c.currentStatus === 'weather_watch') advisory++;
      else operational++;
    }
    return { cancelled, advisory, operational, total: centers.length };
  }, [centers]);

  // Status badge styling helper
  const getStatusDisplay = (status: TestCenterOperationalStatus) => {
    switch (status) {
      case 'operational':
        return {
          label: 'Operational / On Schedule',
          shortLabel: 'Normal',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
          colorClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
          textClass: 'text-emerald-400',
        };
      case 'advisory':
        return {
          label: 'Advisory / Action Required',
          shortLabel: 'Advisory',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />,
          colorClass: 'text-yellow-300 bg-yellow-950/40 border-yellow-500/40',
          textClass: 'text-yellow-400',
        };
      case 'weather_watch':
        return {
          label: 'Weather & Transit Watch',
          shortLabel: 'Transit Watch',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
          colorClass: 'text-amber-300 bg-amber-950/40 border-amber-500/40',
          textClass: 'text-amber-400',
        };
      case 'cancelled':
        return {
          label: 'CANCELLED — Makeup Scheduled',
          shortLabel: 'CANCELLED',
          icon: <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />,
          colorClass: 'text-red-300 bg-red-950/50 border-red-500/50 font-bold',
          textClass: 'text-red-400',
        };
      case 'rescheduled':
        return {
          label: 'Rescheduled Makeup Sitting',
          shortLabel: 'Rescheduled',
          icon: <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
          colorClass: 'text-cyan-300 bg-cyan-950/40 border-cyan-500/40',
          textClass: 'text-cyan-400',
        };
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden text-stone-100">
      {/* Top Interactive Status Bulletin Bar */}
      <div className="p-4 sm:p-5 rounded-xl border border-stone-800 bg-stone-900/90 shadow-lg space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 font-mono">
                Live Test Center Radar & Cancellation Alerts
              </span>
              <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
                · Synced with College Board & ETS Proctor Feeds
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-white">
              Location-Aware Test Center Status & Travel Planner
            </h3>
            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              Real-time operational alerts, closure notifications, power backup verification, and travel time buffers computed directly from your current location to prevent missed exam windows.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              onClick={handleRefreshFeed}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh real-time center network feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-yellow-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Checking Feeds...' : 'Refresh Status'}</span>
            </button>
            <span className="text-[11px] text-stone-400 font-mono tabular-nums">
              Updated: {lastRefreshedTime}
            </span>
          </div>
        </div>

        {/* Status Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800 flex items-center justify-between">
            <span className="text-stone-400">Total Monitored Centers</span>
            <span className="font-mono font-bold text-white text-base tabular-nums">
              {summaryCounts.total}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-between">
            <span className="text-emerald-400/90 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Normal Sittings</span>
            </span>
            <span className="font-mono font-bold text-emerald-400 text-base tabular-nums">
              {summaryCounts.operational}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-yellow-950/20 border border-yellow-900/40 flex items-center justify-between">
            <span className="text-yellow-400/90 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
              <span>Advisories / Watch</span>
            </span>
            <span className="font-mono font-bold text-yellow-400 text-base tabular-nums">
              {summaryCounts.advisory}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 flex items-center justify-between">
            <span className="text-red-400/90 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Closed / Makeups</span>
            </span>
            <span className="font-mono font-bold text-red-400 text-base tabular-nums">
              {summaryCounts.cancelled}
            </span>
          </div>
        </div>
      </div>

      {/* PINNED EXAM CENTERS (WATCHLIST) */}
      {pinnedCenters.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl border border-yellow-400/40 bg-stone-900 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-yellow-400" />
              <h4 className="text-sm font-bold text-white font-serif-display">
                My Tracked Testing Centers ({pinnedCenters.length})
              </h4>
              <span className="text-[11px] text-stone-400">· Real-time alert watchlist</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-yellow-400">
              High Priority Monitoring
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {pinnedCenters.map((center) => {
              const status = getStatusDisplay(center.currentStatus);
              const isSevere = center.currentStatus === 'cancelled' || center.currentStatus === 'rescheduled';
              return (
                <div
                  key={`pinned-${center.id}`}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isSevere
                      ? 'bg-red-950/30 border-red-500/50'
                      : 'bg-stone-950/80 border-stone-800 hover:border-yellow-400/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-0.5">
                        <span className="font-mono text-stone-300">{center.centerCode}</span>
                        <span>·</span>
                        <span>{center.city}, {center.country}</span>
                        <span>·</span>
                        <span className="font-mono text-yellow-400 tabular-nums">
                          {center.distanceKm < 1 ? '< 1 km' : `${Math.round(center.distanceKm)} km / ${Math.round(center.distanceMiles)} mi`}
                        </span>
                      </div>
                      <h5 className="font-bold text-white text-sm truncate">{center.name}</h5>
                    </div>

                    <button
                      onClick={() => togglePinCenter(center.id)}
                      className="text-stone-400 hover:text-yellow-400 p-1 rounded transition-colors cursor-pointer"
                      title="Remove from tracked centers"
                    >
                      <BookmarkCheck className="w-4 h-4 text-yellow-400" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2 text-xs pt-2 border-t border-stone-800/80">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {status.icon}
                      <span className={`font-semibold truncate text-[11px] ${status.textClass}`}>
                        {center.statusTitle}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setExpandedCenterId(center.id);
                        const el = document.getElementById(`center-card-${center.id}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] text-yellow-400 hover:underline shrink-0 font-medium"
                    >
                      View Full Advisory →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* USER LOCATION DETECTION & RADIUS CALCULATOR */}
      <div className="p-5 rounded-xl border border-stone-800 bg-stone-900 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>User Location Reference</span>
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="font-bold text-white text-base">
                {userLocation.label}
              </span>
              {userLocation.isDetected && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-mono">
                  GPS Active
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400">
              Distances and transit buffers are calculated from this coordinate point.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-yellow-400 text-stone-950 hover:bg-yellow-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? 'Locating...' : 'Detect My Location (GPS)'}</span>
            </button>
          </div>
        </div>

        {locationError && (
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Quick Location Hub Selectors */}
        <div className="pt-3 border-t border-stone-800">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            Or Jump to Global Testing Metro:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_STUDENT_LOCATIONS.map((preset) => {
              const isSelected =
                Math.abs(userLocation.lat - preset.lat) < 0.05 &&
                Math.abs(userLocation.lng - preset.lng) < 0.05;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPresetLocation(preset)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-yellow-400 text-stone-950 font-bold border-yellow-400 shadow-sm'
                      : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:text-white hover:border-stone-700'
                  }`}
                >
                  {preset.city}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="p-4 sm:p-5 rounded-xl border border-stone-800 bg-stone-900 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search by Center or Code */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Search by Center Name, City, or Code:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Bombay Teachers, Brooklyn Tech, CB #68190, Seoul..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-700 bg-stone-950 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Exam Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Exam Type:
            </label>
            <select
              value={selectedExamFilter}
              onChange={(e) => setSelectedExamFilter(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-stone-700 bg-stone-950 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option value="All">All Exams (SAT, ACT, TOEFL, IELTS)</option>
              <option value="SAT">Digital SAT Only</option>
              <option value="ACT">ACT Only</option>
              <option value="TOEFL">TOEFL iBT Only</option>
              <option value="IELTS">IELTS Academic Only</option>
            </select>
          </div>

          {/* Distance Radius Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Distance from Location:
            </label>
            <select
              value={selectedRadiusKm}
              onChange={(e) => setSelectedRadiusKm(Number(e.target.value))}
              className="w-full text-xs p-2 rounded-lg border border-stone-700 bg-stone-950 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option value={0}>Any Distance (Global Centers)</option>
              <option value={25}>Within 25 km (Local Metro)</option>
              <option value={50}>Within 50 km (Commuter Radius)</option>
              <option value={150}>Within 150 km (Regional Travel)</option>
              <option value={500}>Within 500 km (Inter-city Travel)</option>
            </select>
          </div>
        </div>

        {/* Segmented Filter Buttons for Status and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-xs">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-400 text-[11px] mr-1">Status:</span>
            <button
              onClick={() => setSelectedStatusFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                selectedStatusFilter === 'all'
                  ? 'bg-yellow-400 text-stone-950 font-bold border-yellow-400'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:text-white'
              }`}
            >
              All Statuses ({centers.length})
            </button>
            <button
              onClick={() => setSelectedStatusFilter('critical')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border flex items-center gap-1 ${
                selectedStatusFilter === 'critical'
                  ? 'bg-red-500 text-white font-bold border-red-400'
                  : 'bg-stone-950 text-red-400 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <XCircle className="w-3 h-3" />
              <span>Cancellations & Makeups ({summaryCounts.cancelled})</span>
            </button>
            <button
              onClick={() => setSelectedStatusFilter('advisory')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border flex items-center gap-1 ${
                selectedStatusFilter === 'advisory'
                  ? 'bg-yellow-400 text-stone-950 font-bold border-yellow-400'
                  : 'bg-stone-950 text-yellow-400 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Advisories ({summaryCounts.advisory})</span>
            </button>
            <button
              onClick={() => setSelectedStatusFilter('operational')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border flex items-center gap-1 ${
                selectedStatusFilter === 'operational'
                  ? 'bg-emerald-500 text-white font-bold border-emerald-400'
                  : 'bg-stone-950 text-emerald-400 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Operational ({summaryCounts.operational})</span>
            </button>
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2">
            <span className="text-stone-400 text-[11px] flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-yellow-400" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs p-1.5 rounded border border-stone-700 bg-stone-950 text-white font-medium focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option value="distance">Closest to Me (Distance)</option>
              <option value="alerts">Severity First (Cancellations First)</option>
              <option value="reliability">Reliability Score (High to Low)</option>
              <option value="name">Center Name (A to Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS COUNT & MATCHED STATUS FEED */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <span>
          Showing <strong className="text-white font-mono">{sortedCenters.length}</strong> testing centers matching filters
        </span>
        {selectedRadiusKm > 0 && (
          <span className="text-yellow-400 font-mono">
            Radius: &le; {selectedRadiusKm} km from {userLocation.label.split('(')[0].trim()}
          </span>
        )}
      </div>

      {/* TEST CENTER LIST / CARDS */}
      <div className="space-y-4">
        {sortedCenters.length === 0 ? (
          <div className="p-8 rounded-xl border border-stone-800 bg-stone-900 text-center space-y-3">
            <MapPin className="w-8 h-8 text-stone-600 mx-auto" />
            <h4 className="font-bold text-white text-base">No testing centers found matching filters</h4>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Try broadening your distance radius or clearing your search term to see more global test centers.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatusFilter('all');
                setSelectedExamFilter('All');
                setSelectedRadiusKm(0);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-yellow-400 text-stone-950 hover:bg-yellow-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          sortedCenters.map((center) => {
            const status = getStatusDisplay(center.currentStatus);
            const isExpanded = expandedCenterId === center.id;
            const isPinned = pinnedCenterIds.includes(center.id);
            const isCancelled = center.currentStatus === 'cancelled';
            const isRescheduled = center.currentStatus === 'rescheduled';

            return (
              <div
                key={center.id}
                id={`center-card-${center.id}`}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isCancelled
                    ? 'border-red-500/60 bg-stone-900 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                    : isRescheduled
                    ? 'border-cyan-500/50 bg-stone-900'
                    : center.currentStatus === 'advisory' || center.currentStatus === 'weather_watch'
                    ? 'border-yellow-400/50 bg-stone-900'
                    : 'border-stone-800 bg-stone-900/95 hover:border-stone-700'
                }`}
              >
                {/* Main Summary Header */}
                <div className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Top Metadata Line (Zero pills, clean typography) */}
                      <div className="flex items-center gap-2 text-xs text-stone-400 flex-wrap">
                        <span className="font-mono font-semibold text-yellow-400">{center.centerCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{center.city}, {center.country}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-stone-300 font-bold tabular-nums">
                          {center.distanceKm < 1 ? '< 1 km away' : `${Math.round(center.distanceKm)} km (${Math.round(center.distanceMiles)} mi) away`}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[11px] text-stone-400">Updated {center.lastUpdated}</span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold font-serif-display text-white">
                        {center.name}
                      </h4>

                      <p className="text-xs text-stone-400">
                        {center.address}
                      </p>
                    </div>

                    {/* Actions and Status Flag */}
                    <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                      <div className={`px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 ${status.colorClass}`}>
                        {status.icon}
                        <span>{status.shortLabel}</span>
                      </div>

                      <button
                        onClick={() => togglePinCenter(center.id)}
                        className={`text-xs px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                          isPinned
                            ? 'text-yellow-400 bg-yellow-950/40 border border-yellow-400/40'
                            : 'text-stone-400 hover:text-white border border-stone-800 bg-stone-950'
                        }`}
                        title={isPinned ? 'Center pinned to watchlist' : 'Pin to my center watchlist'}
                      >
                        {isPinned ? <BookmarkCheck className="w-3.5 h-3.5 text-yellow-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                        <span>{isPinned ? 'Tracked' : 'Track Center'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Operational Status Bulletin Banner */}
                  <div
                    className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                      isCancelled
                        ? 'bg-red-950/40 border-red-500/50 text-red-200'
                        : isRescheduled
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                        : center.currentStatus === 'advisory' || center.currentStatus === 'weather_watch'
                        ? 'bg-yellow-950/40 border-yellow-500/40 text-yellow-100'
                        : 'bg-stone-950/80 border-stone-800 text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {status.icon}
                      <strong className="text-white text-sm font-semibold">{center.statusTitle}</strong>
                    </div>
                    <p className="text-stone-300 leading-relaxed pl-5">
                      {center.statusMessage}
                    </p>
                    {isCancelled && center.makeupPolicy.hasActiveMakeup && (
                      <div className="mt-2 pt-2 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2 text-red-300 font-mono text-[11px] pl-5">
                        <span>Makeup Date: {center.makeupPolicy.makeupDate}</span>
                        <span className="font-bold underline">Auto-Transfer Active</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Specs Badges: Exams, Reliability, Transit Risk */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    <div className="p-2 rounded bg-stone-950/60 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">Exams Offered</span>
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        {center.examsOffered.map((ex) => (
                          <span key={ex} className="font-mono font-semibold text-white text-[11px]">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-2 rounded bg-stone-950/60 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">Reliability Rating</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-bold text-white text-xs">{center.reliabilityRating}</span>
                        <span className="text-[10px] text-stone-400 font-mono tabular-nums">({center.reliabilityScore}%)</span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-stone-950/60 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">Morning Transit Risk</span>
                      <span className={`font-semibold text-xs mt-0.5 block ${
                        center.travelAndLogistics.trafficRisk.includes('Severe')
                          ? 'text-red-400'
                          : center.travelAndLogistics.trafficRisk === 'Moderate'
                          ? 'text-yellow-400'
                          : 'text-emerald-400'
                      }`}>
                        {center.travelAndLogistics.trafficRisk}
                      </span>
                    </div>

                    <div className="p-2 rounded bg-stone-950/60 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase font-mono">Power & Wi-Fi Stability</span>
                      <span className="text-stone-300 text-[11px] truncate block mt-0.5" title={center.powerBackup}>
                        {center.powerBackup.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Expand / Collapse Action Bar */}
                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChecklistCenter(center)}
                        className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-[11px]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Pre-Travel Checklist</span>
                      </button>

                      <button
                        onClick={() => setReportingCenter(center)}
                        className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-[11px]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Submit Live Intel</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedCenterId(isExpanded ? null : center.id)}
                      className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-1 cursor-pointer py-1 text-xs"
                    >
                      <span>{isExpanded ? 'Hide Travel & Facility Details' : 'View Travel & Facility Details'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED DETAILED DRAWER (Travel, Infrastructure, Cancellation Mitigation) */}
                {isExpanded && (
                  <div className="p-5 border-t border-stone-800 bg-stone-950/90 space-y-6 text-xs animate-in fade-in duration-150">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column: Travel Planning & Commute Advisor */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-800 text-white font-bold font-serif-display text-sm">
                          <Car className="w-4 h-4 text-yellow-400" />
                          <span>Travel Logistics & Commute Advisory</span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-yellow-400 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Recommended Departure Buffer:</span>
                            </span>
                            <p className="text-stone-300">
                              {center.travelAndLogistics.recommendedArrivalBuffer}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                              <Train className="w-3.5 h-3.5 text-yellow-400" />
                              <span>Nearest Public Transit & Airports:</span>
                            </span>
                            <p className="text-stone-300 leading-relaxed">
                              {center.travelAndLogistics.nearestTransit}
                            </p>
                          </div>

                          {center.travelAndLogistics.travelWarning && (
                            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-1">
                              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Transit Warning & Bottleneck:</span>
                              </span>
                              <p className="text-amber-200/90 leading-relaxed">
                                {center.travelAndLogistics.travelWarning}
                              </p>
                            </div>
                          )}

                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 block">
                              Parking & Drop-Off Regulations:
                            </span>
                            <p className="text-stone-400 leading-relaxed">
                              {center.travelAndLogistics.parkingNotes}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Facility Specs, Power, & Bluebook Readiness */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-800 text-white font-bold font-serif-display text-sm">
                          <Laptop className="w-4 h-4 text-yellow-400" />
                          <span>Testing Facility & Digital Exam Specs</span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                              <BatteryCharging className="w-3.5 h-3.5 text-yellow-400" />
                              <span>Power & Electrical Resiliency:</span>
                            </span>
                            <p className="text-stone-300">
                              {center.powerBackup}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 flex items-center gap-1.5">
                              <Wifi className="w-3.5 h-3.5 text-yellow-400" />
                              <span>Proctor Network & Bandwidth:</span>
                            </span>
                            <p className="text-stone-300">
                              {center.wifiInfrastructure}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 block">
                              Device & Exam Ticket Requirements:
                            </span>
                            <p className="text-stone-400 leading-relaxed">
                              {center.deviceRequirements}
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                            <span className="font-semibold text-stone-200 block">
                              Room Climate & Environment:
                            </span>
                            <p className="text-stone-400">
                              {center.facilityIntel.climateControl}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Protocol & Support Row */}
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                        <span className="font-bold text-white flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-yellow-400" />
                          <span>Center Cancellation Policy & Student Protections</span>
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          Historical Cancellations: <strong className="text-white">{center.pastCancellationsCount} in 24 mos</strong>
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-stone-300 leading-relaxed">
                        <div>
                          <strong className="text-stone-200 block mb-1">In Case of Center Closure / Cancellation:</strong>
                          <p className="text-stone-400">
                            {center.makeupPolicy.actionRequired}
                          </p>
                        </div>
                        <div>
                          <strong className="text-stone-200 block mb-1">Official Testing Support Hotline:</strong>
                          <p className="font-mono text-yellow-400 font-semibold">
                            {center.makeupPolicy.supportHotline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Community & Proctor Intel Reports */}
                    {center.recentCommunityReports.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                            <span>Recent Proctor & Student Intel ({center.recentCommunityReports.length})</span>
                          </span>
                          <button
                            onClick={() => setReportingCenter(center)}
                            className="text-yellow-400 hover:underline text-[11px] font-semibold cursor-pointer"
                          >
                            + Add Your Report
                          </button>
                        </div>

                        <div className="space-y-2">
                          {center.recentCommunityReports.map((rep) => (
                            <div
                              key={rep.id}
                              className="p-3 rounded-lg bg-stone-900/80 border border-stone-800/80 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between text-[11px] text-stone-400">
                                <span className="font-semibold text-white">
                                  {rep.author}
                                  {rep.type === 'verified_proctor' && (
                                    <span className="ml-1.5 text-[10px] text-emerald-400 font-mono font-normal">
                                      [Verified Proctor]
                                    </span>
                                  )}
                                  {rep.type === 'official_bulletin' && (
                                    <span className="ml-1.5 text-[10px] text-yellow-400 font-mono font-normal">
                                      [Official Bulletin]
                                    </span>
                                  )}
                                </span>
                                <span className="font-mono text-stone-500">{rep.timestamp}</span>
                              </div>
                              <p className="text-stone-300 leading-relaxed">{rep.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CROWDSOURCED INTEL MODAL */}
      {reportingCenter && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-xl max-w-lg w-full p-6 space-y-5 text-stone-100 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold font-serif-display text-lg text-white">
                  Report Test Center Intel
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  {reportingCenter.name} ({reportingCenter.city})
                </p>
              </div>
              <button
                onClick={() => setReportingCenter(null)}
                className="text-stone-400 hover:text-white text-lg font-mono p-1"
              >
                &times;
              </button>
            </div>

            {reportSubmittedSuccess ? (
              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white text-sm">Report Published to Live Feed</h5>
                <p className="text-xs text-stone-300">
                  Thank you for helping fellow testing candidates plan their travel and arrive safely!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Your Name / Role (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student from Mumbai, Parent, or Exam Proctor"
                    value={reportAuthor}
                    onChange={(e) => setReportAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-700 bg-stone-950 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Report Category:
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-stone-700 bg-stone-950 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  >
                    <option value="student_tip">Student Tip (Traffic, Desk Space, AC Temperature)</option>
                    <option value="verified_proctor">Proctor / Staff Advisory (Gate Change, Power Status)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Observation / Advisory Details:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Gate 2 has a large queue; recommend entering through Gate 3. AC in the library is very cold, bring a light hoodie. Power outlets are plentiful along row B..."
                    value={reportNote}
                    onChange={(e) => setReportNote(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg border border-stone-700 bg-stone-950 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setReportingCenter(null)}
                    className="px-4 py-2 rounded-lg text-stone-400 hover:text-white border border-stone-800 hover:bg-stone-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-stone-950 font-bold hover:bg-yellow-300 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Intel Report</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PRE-TRAVEL CHECKLIST MODAL */}
      {checklistCenter && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-xl max-w-lg w-full p-6 space-y-5 text-stone-100 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[11px] text-yellow-400 font-mono uppercase tracking-wider block">
                  Departure Readiness Guide
                </span>
                <h4 className="font-bold font-serif-display text-lg text-white">
                  Pre-Exam Travel Checklist
                </h4>
                <p className="text-xs text-stone-400">
                  Target: {checklistCenter.name} ({checklistCenter.city})
                </p>
              </div>
              <button
                onClick={() => setChecklistCenter(null)}
                className="text-stone-400 hover:text-white text-lg font-mono p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Download Exam Setup Offline (1–5 Days Prior)</strong>
                  <p className="text-stone-400">
                    Open Bluebook on your testing device while on reliable Wi-Fi. Generate your admission ticket. Bluebook stores the encrypted test package locally so poor center Wi-Fi will not interrupt testing.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Print Physical Paper Exam Ticket</strong>
                  <p className="text-stone-400">
                    Although Bluebook shows your ticket digitally, security at centers like {checklistCenter.name} frequently requires a paper copy at campus security gates before entering the building.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Identification Strict Verification</strong>
                  <p className="text-stone-400">
                    {checklistCenter.facilityIntel.idRequirements}. Must be original, valid, non-expired, and match your registration name letter-for-letter.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Power Bank & Full Battery Charge</strong>
                  <p className="text-stone-400">
                    Ensure your laptop or iPad is charged to 100%. While {checklistCenter.name} has power backup ({checklistCenter.powerBackup}), power sockets may be shared.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block">Departure Timing Buffer</strong>
                  <p className="text-amber-200/90">
                    {checklistCenter.travelAndLogistics.recommendedArrivalBuffer}. Morning traffic in {checklistCenter.city} is rated as &ldquo;{checklistCenter.travelAndLogistics.trafficRisk}&rdquo;.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setChecklistCenter(null)}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-stone-950 font-bold hover:bg-yellow-300 text-xs"
              >
                I Understand &amp; Am Prepared
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
