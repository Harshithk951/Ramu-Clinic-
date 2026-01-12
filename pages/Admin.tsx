import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { getAppointments, updateAppointmentStatus, signOut, deleteAppointments } from '../services/api';
import { Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { 
  LogOut, Calendar, Clock, Check, X, Phone, 
  Trash2, Loader2, Search, 
  Activity, Users, LayoutDashboard, Download, Printer,
  ChevronLeft, ChevronRight, X as XIcon
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isClearing, setIsClearing] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard | Ramu Clinic";
    checkUser();
    fetchData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Could not load appointments');
    } finally {
      setLoading(false);
    }
  };

  // --- Core Actions ---

  const handleStatusUpdate = async (id: string | undefined, status: 'confirmed' | 'cancelled') => {
    if (!id) return;
    
    // Optimistic Update
    const previousAppointments = [...appointments];
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));

    try {
      await updateAppointmentStatus(id, status);
      toast.success(`Appointment marked as ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
      setAppointments(previousAppointments); // Revert
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to permanently delete this record?')) {
        const previousAppointments = [...appointments];
        
        // Optimistic UI removal
        setAppointments(prev => prev.filter(app => app.id !== id));

        try {
            await deleteAppointments([id]);
            toast.success('Record deleted');
        } catch (error: any) {
            console.error("Delete failed:", error);
            setAppointments(previousAppointments); // Revert
            toast.error("Failed to delete. Please try again.");
        }
    }
  };

  const handleClearAll = async () => {
    const cancelledItems = appointments.filter(a => a.status === 'cancelled');
    const count = cancelledItems.length;

    if (count === 0) return;

    if (window.confirm(`Permanently delete all ${count} cancelled appointments?`)) {
        setIsClearing(true);
        const previousAppointments = [...appointments];
        const idsToDelete = cancelledItems.map(a => a.id).filter((id): id is string => !!id);

        // 1. CRITICAL: Optimistic Update - Remove from UI IMMEDIATELY
        setAppointments(prev => prev.filter(a => a.status !== 'cancelled'));

        try {
            // 2. Perform DB deletion
            await deleteAppointments(idsToDelete);
            toast.success(`Cleared ${count} cancelled appointments`);
        } catch (error: any) {
            console.error("Clear Failed:", error);
            setAppointments(previousAppointments); // Revert UI if DB fails
            toast.error('Failed to clear appointments from server');
        } finally {
            setIsClearing(false);
        }
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // --- Export & Print ---

  const exportCSV = () => {
    if (filteredAppointments.length === 0) {
        toast.error("No data to export");
        return;
    }

    const headers = ['Name', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Message'];
    const csvContent = [
      headers.join(','),
      ...filteredAppointments.map(a => [
        `"${a.name}"`,
        `"${a.phone}"`,
        `"${a.service}"`,
        a.preferred_date,
        a.preferred_time,
        a.status,
        `"${a.message || ''}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Export downloaded");
  };

  const handlePrint = () => {
    window.print();
  };

  // --- Filtering & Pagination Logic ---

  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      // 1. Search Filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        app.name.toLowerCase().includes(searchLower) ||
        app.phone.includes(searchLower) ||
        app.service.toLowerCase().includes(searchLower);
      
      // 2. Status Filter
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus;

      // 3. Date Range Filter
      let matchesDate = true;
      if (dateRange.start) {
        matchesDate = matchesDate && (app.preferred_date >= dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && (app.preferred_date <= dateRange.end);
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, filterStatus, dateRange]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, dateRange]);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    today: appointments.filter(a => {
      const today = new Date().toISOString().split('T')[0];
      return a.preferred_date === today;
    }).length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20 font-sans print:bg-white print:pb-0">
      
      {/* Print Styles */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { background: white; -webkit-print-color-adjust: exact; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
            thead { display: table-header-group; }
            tr { page-break-inside: avoid; }
          }
        `}
      </style>

      {/* Navigation (Hidden on Print) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm no-print">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-primary text-white p-2 rounded-lg hidden md:block">
               <LayoutDashboard className="w-5 h-5" />
             </div>
             <div>
               <h1 className="font-heading font-bold text-xl md:text-2xl text-gray-900 leading-none">Dashboard</h1>
               <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Welcome back, Dr. Ramu</p>
             </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
             <Button variant="ghost" size="sm" onClick={handlePrint} className="hidden lg:flex gap-2">
                <Printer className="w-4 h-4" /> Print
             </Button>
             <Button variant="ghost" size="sm" onClick={exportCSV} className="hidden lg:flex gap-2">
                <Download className="w-4 h-4" /> Export
             </Button>
             <div className="h-6 w-px bg-gray-200 hidden lg:block mx-1"></div>
             
             {stats.cancelled > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearAll}
                disabled={isClearing}
                className="text-error border-error/20 hover:bg-error/5 text-xs md:text-sm h-9 md:h-10"
              >
                {isClearing ? <Loader2 className="w-4 h-4 animate-spin md:mr-2" /> : <Trash2 className="w-4 h-4 md:mr-2" />}
                <span className="hidden md:inline">Clear Cancelled ({stats.cancelled})</span>
              </Button>
             )}
             
             <Button variant="secondary" size="sm" onClick={handleLogout} className="gap-2 text-xs md:text-sm h-9 md:h-10">
               <LogOut className="w-4 h-4" /> 
               <span className="hidden md:inline">Sign Out</span>
             </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        
        {/* --- SCREEN VIEW (Interactive) --- */}
        <div className="no-print space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
               <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1">Pending</span>
                  <div className="flex items-end justify-between">
                     <span className="text-2xl md:text-4xl font-bold text-yellow-600">{stats.pending}</span>
                     <Activity className="w-5 h-5 md:w-6 md:h-6 text-yellow-500/50 mb-1" />
                  </div>
               </div>
               <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1">Today</span>
                  <div className="flex items-end justify-between">
                     <span className="text-2xl md:text-4xl font-bold text-primary">{stats.today}</span>
                     <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary/50 mb-1" />
                  </div>
               </div>
               <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1">Total</span>
                  <div className="flex items-end justify-between">
                     <span className="text-2xl md:text-4xl font-bold text-gray-800">{stats.total}</span>
                     <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-400 mb-1" />
                  </div>
               </div>
               {/* Mobile Only: Quick Filter Button */}
               <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex flex-col justify-center items-center md:hidden cursor-pointer active:scale-95 transition-transform" onClick={() => document.getElementById('search-bar')?.focus()}>
                  <Search className="w-6 h-6 text-primary mb-1" />
                  <span className="text-primary font-bold text-sm">Search</span>
               </div>
            </div>

            {/* Toolbar: Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-4 sticky top-[65px] md:top-[81px] z-20">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    {/* Search */}
                    <div className="relative w-full md:max-w-md">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                         id="search-bar"
                         type="text" 
                         placeholder="Search name, phone, service..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                       />
                    </div>
                    
                    {/* Date Filters */}
                    <div className="flex gap-2 items-center overflow-x-auto pb-1 md:pb-0">
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                            <input 
                                type="date" 
                                className="bg-transparent text-xs md:text-sm border-none focus:ring-0 p-1 text-gray-600 w-28 md:w-auto"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                            />
                            <span className="text-gray-400 text-xs">to</span>
                            <input 
                                type="date" 
                                className="bg-transparent text-xs md:text-sm border-none focus:ring-0 p-1 text-gray-600 w-28 md:w-auto"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                            />
                            {(dateRange.start || dateRange.end) && (
                                <button onClick={() => setDateRange({start: '', end: ''})} className="p-1 hover:text-red-500">
                                    <XIcon className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex w-full overflow-x-auto pb-1 gap-2 no-scrollbar">
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                                filterStatus === status 
                                ? 'bg-primary text-white border-primary' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            <span className="ml-2 opacity-70 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                                {status === 'all' 
                                    ? appointments.length 
                                    : appointments.filter(a => a.status === status).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty State or List */}
            {paginatedAppointments.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-300" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900">No appointments found</h3>
                   <p className="text-gray-500">Try adjusting your search or filters</p>
                   <Button 
                     variant="ghost" 
                     onClick={() => {setSearchTerm(''); setFilterStatus('all'); setDateRange({start:'', end:''});}}
                     className="mt-4 text-primary"
                   >
                     Clear All Filters
                   </Button>
                </div>
            ) : (
                <>
                    {/* DESKTOP TABLE VIEW */}
                    <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                    {app.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{app.name}</p>
                                                    <a href={`tel:${app.phone}`} className="text-xs text-gray-500 hover:text-primary">{app.phone}</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-700 font-medium">{app.service}</p>
                                            {app.message && <p className="text-xs text-gray-400 truncate max-w-[200px] mt-1" title={app.message}>{app.message}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm">
                                                <span className="font-medium text-gray-900">{app.preferred_date}</span>
                                                <span className="text-gray-500 capitalize text-xs">{app.preferred_time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${
                                                app.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                app.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleStatusUpdate(app.id, 'confirmed')} className="p-1.5 hover:bg-green-50 text-green-600 rounded-md transition-colors" title="Confirm">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleStatusUpdate(app.id, 'cancelled')} className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors" title="Cancel">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {app.status === 'confirmed' && (
                                                    <button onClick={() => handleStatusUpdate(app.id, 'cancelled')} className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-md transition-colors" title="Cancel">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {app.status === 'cancelled' && (
                                                    <button onClick={() => handleDelete(app.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE CARD VIEW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                        {paginatedAppointments.map((appointment) => (
                            <div 
                                key={appointment.id} 
                                className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden ${
                                appointment.status === 'cancelled' ? 'opacity-75 bg-gray-50' : ''
                                }`}
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                                    appointment.status === 'pending' ? 'bg-yellow-400' :
                                    appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>

                                <div className="flex justify-between items-start mb-3 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {appointment.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{appointment.name}</h3>
                                            <p className="text-xs text-primary font-medium">{appointment.service}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                                        appointment.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                        appointment.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4 pl-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{appointment.preferred_date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="capitalize">{appointment.preferred_time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 col-span-2">
                                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                                        <a href={`tel:${appointment.phone}`} className="hover:text-primary underline decoration-dotted">{appointment.phone}</a>
                                    </div>
                                </div>

                                <div className="flex gap-2 pl-2">
                                    {appointment.status === 'pending' && (
                                        <>
                                            <Button size="sm" className="flex-1 bg-green-600 h-9" onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}>
                                                <Check className="w-3.5 h-3.5 mr-1" /> Accept
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 h-9" onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}>
                                                <X className="w-3.5 h-3.5 mr-1" /> Reject
                                            </Button>
                                        </>
                                    )}
                                    {appointment.status === 'confirmed' && (
                                        <Button size="sm" variant="outline" className="flex-1 border-gray-200 text-gray-600 h-9" onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}>
                                            Cancel Appointment
                                        </Button>
                                    )}
                                    {appointment.status === 'cancelled' && (
                                        <Button size="sm" variant="ghost" className="flex-1 text-red-500 hover:bg-red-50 h-9 justify-start" onClick={() => handleDelete(appointment.id)}>
                                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium">{Math.min(filteredAppointments.length, (currentPage - 1) * itemsPerPage + 1)}</span> to <span className="font-medium">{Math.min(filteredAppointments.length, currentPage * itemsPerPage)}</span> of <span className="font-medium">{filteredAppointments.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium px-2">Page {currentPage} of {Math.max(1, totalPages)}</span>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>

        {/* --- PRINT VIEW (Hidden on Screen, Visible on Print) --- */}
        <div className="hidden print:block">
            <div className="mb-6 border-b border-black pb-4">
                <h1 className="text-2xl font-bold mb-2">Ramu Clinic - Appointment Report</h1>
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Generated: {new Date().toLocaleString()}</p>
                    <p>Total Records: {filteredAppointments.length}</p>
                </div>
                {filterStatus !== 'all' && (
                    <p className="text-sm font-bold mt-2">Filter: {filterStatus.toUpperCase()}</p>
                )}
            </div>

            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 font-bold">Patient Name</th>
                        <th className="py-2 font-bold">Service</th>
                        <th className="py-2 font-bold">Date & Time</th>
                        <th className="py-2 font-bold">Phone</th>
                        <th className="py-2 font-bold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((app) => (
                            <tr key={app.id} className="border-b border-gray-300">
                                <td className="py-3 font-medium">{app.name}</td>
                                <td className="py-3">{app.service}</td>
                                <td className="py-3">{app.preferred_date} <br/> <span className="text-xs text-gray-500 uppercase">{app.preferred_time}</span></td>
                                <td className="py-3">{app.phone}</td>
                                <td className="py-3 capitalize">{app.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500 italic">No appointments found matching the current criteria.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>Confidential Medical Data - For Internal Use Only</p>
            </div>
        </div>
      </div>
    </div>
  );
};