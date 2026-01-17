import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, CheckSquare, FileText, Check, Bell, ChevronRight, X, Heart, Clock, Pin } from 'lucide-react';

interface PlanTabProps {
  userName: string;
  partnerName: string;
}

type View = 'calendar' | 'todos' | 'notes';

interface Task {
  id: number;
  title: string;
  assignedTo: 'user' | 'partner' | 'both';
  completed: boolean;
  overdue?: boolean;
  category?: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  pinned?: boolean;
}

interface CalendarEvent {
  date: number;
  title: string;
  time?: string;
  type: 'user' | 'partner' | 'us' | 'milestone';
  icon?: string;
}

export function PlanTab({ userName, partnerName }: PlanTabProps) {
  const [activeView, setActiveView] = useState<View>('calendar');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'date' | 'event' | 'task' | 'note' | 'availability' | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showDateDetails, setShowDateDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedNoteColor, setSelectedNoteColor] = useState('rgba(247, 183, 49, 0.1)');
  const [isNotePinned, setIsNotePinned] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Pay Electricity Bill', assignedTo: 'user', completed: false, overdue: true, category: 'Finance' },
    { id: 2, title: 'Book Flight Tickets for Goa', assignedTo: 'partner', completed: false, category: 'Travel' },
    { id: 3, title: 'Call Plumber for Kitchen Sink', assignedTo: 'both', completed: false, category: 'Home' },
    { id: 4, title: 'Buy Anniversary Gift', assignedTo: 'user', completed: true, category: 'Social' },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'To Watch', content: 'Panchayat Season 3, Laapataa Ladies, Heeramandi', color: 'rgba(247, 183, 49, 0.1)', pinned: true },
    { id: 2, title: 'Grocery Run', content: 'Oats, Almond Milk, Masala, Paneer, Tomatoes, Coriander', color: 'rgba(78, 205, 196, 0.1)', pinned: false },
    { id: 3, title: 'Bali Trip Ideas', content: 'Ubud rice terraces, Tanah Lot temple, Seminyak beach sunset', color: 'rgba(142, 7, 95, 0.1)', pinned: false },
    { id: 4, title: 'Restaurant Wishlist', content: 'Burma Burma, Masque, The Bombay Canteen', color: 'rgba(247, 183, 49, 0.15)', pinned: false },
  ]);

  const calendarEvents: CalendarEvent[] = [
    { date: 19, title: 'First Diwali Together', type: 'milestone', icon: '🪔' },
    { date: 20, title: 'Dinner at Burma Burma', time: '8:00 PM', type: 'us' },
    { date: 22, title: 'Client Meeting', time: '2:00 PM', type: 'user' },
    { date: 25, title: 'Gym with Friends', time: '6:00 PM', type: 'partner' },
  ];

  const handleNudge = (taskId: number) => {
    alert(`Gentle nudge sent to ${partnerName} 🔔`);
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFABClick = () => {
    if (activeView === 'calendar') {
      // Show Google Calendar style option selector
      setShowTypeSelector(true);
    } else if (activeView === 'todos') {
      setModalType('task');
      setShowModal(true);
    } else if (activeView === 'notes') {
      setModalType('note');
      setShowModal(true);
    }
  };

  const handleTypeSelect = (type: 'date' | 'event' | 'task' | 'availability') => {
    setModalType(type);
    setShowTypeSelector(false);
    setShowModal(true);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setShowDateDetails(true);
  };

  const handlePlanDateClick = () => {
    setModalType('date');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowTypeSelector(false);
    setShowDateDetails(false);
    setModalType(null);
    setSelectedNoteColor('rgba(247, 183, 49, 0.1)');
    setIsNotePinned(false);
  };

  // Generate calendar grid for current month
  const generateCalendar = () => {
    const today = 17; // Current date
    const daysInMonth = 31;
    const startDay = 3; // January 2026 starts on Thursday (3)
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return { days, today };
  };

  const { days, today } = generateCalendar();

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    return calendarEvents.filter(event => event.date === day);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return calendarEvents.filter(event => event.date === selectedDate);
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#F2E8DA' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <h2
          className="laya-headline"
          style={{ 
            fontSize: '32px',
            color: '#3D2E28',
          }}
        >
          Our Rhythm
        </h2>
      </div>

      {/* Segmented Control */}
      <div className="px-6 pb-4">
        <div
          className="flex p-1"
          style={{
            background: '#FFFCF8',
            borderRadius: '50px',
            boxShadow: '0 2px 8px rgba(61, 46, 40, 0.08)',
          }}
        >
          <button
            onClick={() => setActiveView('calendar')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2"
            style={{
              background: activeView === 'calendar' ? '#8E075F' : 'transparent',
              color: activeView === 'calendar' ? 'white' : '#3D2E28',
              borderRadius: '50px',
              fontSize: '15px',
              fontFamily: 'var(--laya-font-body)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <CalendarIcon size={18} />
            Calendar
          </button>
          <button
            onClick={() => setActiveView('todos')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2"
            style={{
              background: activeView === 'todos' ? '#8E075F' : 'transparent',
              color: activeView === 'todos' ? 'white' : '#3D2E28',
              borderRadius: '50px',
              fontSize: '15px',
              fontFamily: 'var(--laya-font-body)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <CheckSquare size={18} />
            To-Dos
          </button>
          <button
            onClick={() => setActiveView('notes')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2"
            style={{
              background: activeView === 'notes' ? '#8E075F' : 'transparent',
              color: activeView === 'notes' ? 'white' : '#3D2E28',
              borderRadius: '50px',
              fontSize: '15px',
              fontFamily: 'var(--laya-font-body)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <FileText size={18} />
            Notes
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        <AnimatePresence mode="wait">
          {activeView === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Calendar Card */}
              <div className="laya-card p-6 mb-4">
                {/* Month Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="laya-headline"
                    style={{ 
                      fontSize: '24px',
                      color: '#3D2E28',
                    }}
                  >
                    January 2026
                  </h3>
                </div>

                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '12px',
                          color: '#3D2E28',
                          opacity: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        {day}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, idx) => {
                    const events = getEventForDay(day);
                    const isToday = day === today;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => day && handleDateClick(day)}
                        className="aspect-square flex flex-col items-center justify-center relative"
                        style={{
                          background: isToday ? '#F7B731' : 'transparent',
                          borderRadius: '12px',
                          border: 'none',
                          cursor: day ? 'pointer' : 'default',
                        }}
                        disabled={!day}
                      >
                        {day && (
                          <>
                            <p
                              className="laya-body"
                              style={{ 
                                fontSize: '15px',
                                color: isToday ? 'white' : '#3D2E28',
                                fontWeight: isToday ? 700 : 500,
                              }}
                            >
                              {day}
                            </p>
                            
                            {/* Event Indicators */}
                            {events && events.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {events.map((event, eventIdx) => (
                                  <div
                                    key={eventIdx}
                                    style={{
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '3px',
                                      background: 
                                        event.type === 'user' ? '#8E075F' :
                                        event.type === 'partner' ? '#4ECDC4' :
                                        event.type === 'us' ? '#F7B731' :
                                        '#8E075F',
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-4" style={{ borderTop: '1px solid rgba(61, 46, 40, 0.1)' }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#8E075F' }} />
                    <p className="laya-body" style={{ fontSize: '12px', color: '#3D2E28', opacity: 0.7 }}>You</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#4ECDC4' }} />
                    <p className="laya-body" style={{ fontSize: '12px', color: '#3D2E28', opacity: 0.7 }}>{partnerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#F7B731' }} />
                    <p className="laya-body" style={{ fontSize: '12px', color: '#3D2E28', opacity: 0.7 }}>Us</p>
                  </div>
                </div>
              </div>

              {/* Plan a Date CTA */}
              <button
                onClick={handlePlanDateClick}
                className="w-full py-4 mb-6 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #8E075F, #4ECDC4)',
                  borderRadius: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(142, 7, 95, 0.2)',
                }}
              >
                <Heart size={20} color="white" fill="white" />
                <span
                  className="laya-body"
                  style={{ 
                    fontSize: '17px',
                    color: 'white',
                    fontWeight: 700,
                  }}
                >
                  Plan a Date
                </span>
              </button>

              {/* Agenda List */}
              <h3
                className="laya-body mb-4"
                style={{ 
                  fontSize: '18px',
                  color: '#3D2E28',
                  fontWeight: 700,
                }}
              >
                Coming Up
              </h3>

              <div className="space-y-3">
                {calendarEvents.map((event, idx) => (
                  <motion.div
                    key={event.date}
                    className="laya-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {event.icon && (
                      <div
                        style={{
                          fontSize: '32px',
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {event.icon}
                      </div>
                    )}
                    
                    {!event.icon && (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '24px',
                          background: 
                            event.type === 'user' ? '#8E075F' :
                            event.type === 'partner' ? '#4ECDC4' :
                            '#F7B731',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CalendarIcon size={24} color="white" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '16px',
                          color: '#3D2E28',
                          fontWeight: 700,
                          marginBottom: '4px',
                        }}
                      >
                        {event.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '13px',
                            color: '#3D2E28',
                            opacity: 0.6,
                          }}
                        >
                          Jan {event.date}
                        </p>
                        {event.time && (
                          <>
                            <span style={{ color: '#3D2E28', opacity: 0.3 }}>•</span>
                            <p
                              className="laya-body"
                              style={{ 
                                fontSize: '13px',
                                color: '#3D2E28',
                                opacity: 0.6,
                              }}
                            >
                              {event.time}
                            </p>
                          </>
                        )}
                        {event.type === 'us' && (
                          <>
                            <span style={{ color: '#3D2E28', opacity: 0.3 }}>•</span>
                            <span
                              className="laya-body"
                              style={{ 
                                fontSize: '11px',
                                color: '#F7B731',
                                fontWeight: 700,
                                background: 'rgba(247, 183, 49, 0.15)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                              }}
                            >
                              Date Night
                            </span>
                          </>
                        )}
                        {event.type === 'milestone' && (
                          <>
                            <span style={{ color: '#3D2E28', opacity: 0.3 }}>•</span>
                            <span
                              className="laya-body"
                              style={{ 
                                fontSize: '11px',
                                color: '#8E075F',
                                fontWeight: 700,
                                background: 'rgba(142, 7, 95, 0.1)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                              }}
                            >
                              Milestone
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <ChevronRight size={20} style={{ color: '#3D2E28', opacity: 0.3 }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'todos' && (
            <motion.div
              key="todos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    className="laya-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    style={{
                      opacity: task.completed ? 0.6 : 1,
                    }}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '14px',
                        border: `2px solid ${task.completed ? '#4ECDC4' : '#8E075F'}`,
                        background: task.completed ? '#4ECDC4' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    >
                      {task.completed && <Check size={16} color="white" strokeWidth={3} />}
                    </button>
                    
                    {/* Task Info */}
                    <div className="flex-1">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '16px',
                          color: task.overdue ? '#D32F2F' : '#3D2E28',
                          fontWeight: 600,
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '4px',
                        }}
                      >
                        {task.title}
                      </p>
                      {task.category && (
                        <span
                          className="laya-body"
                          style={{ 
                            fontSize: '11px',
                            color: '#3D2E28',
                            opacity: 0.6,
                            background: 'rgba(61, 46, 40, 0.08)',
                            padding: '2px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          {task.category}
                        </span>
                      )}
                    </div>
                    
                    {/* Assignment Avatar */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '18px',
                        background: 
                          task.assignedTo === 'user' ? 'linear-gradient(135deg, #8E075F, #4ECDC4)' :
                          task.assignedTo === 'partner' ? 'linear-gradient(135deg, #4ECDC4, #F7B731)' :
                          'linear-gradient(135deg, #8E075F, #F7B731)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'var(--laya-font-headline)',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {task.assignedTo === 'both' ? '👥' : 
                       task.assignedTo === 'user' ? userName.charAt(0) : 
                       partnerName.charAt(0)}
                    </div>
                    
                    {/* Nudge Button for overdue partner tasks */}
                    {task.overdue && task.assignedTo === 'user' && (
                      <button
                        onClick={() => handleNudge(task.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          background: 'rgba(142, 7, 95, 0.1)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Bell size={14} style={{ color: '#8E075F' }} />
                        <span
                          className="laya-body"
                          style={{ 
                            fontSize: '12px',
                            color: '#8E075F',
                            fontWeight: 600,
                          }}
                        >
                          Nudge
                        </span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Empty state hint */}
              <div className="mt-8 text-center">
                <p
                  className="laya-body"
                  style={{ 
                    fontSize: '14px',
                    color: '#3D2E28',
                    opacity: 0.5,
                  }}
                >
                  Tap + to add a new task
                </p>
              </div>
            </motion.div>
          )}

          {activeView === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {notes
                  .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
                  .map((note, idx) => (
                  <motion.div
                    key={note.id}
                    className="p-4 relative"
                    style={{
                      background: note.color,
                      border: '1px solid rgba(61, 46, 40, 0.1)',
                      borderRadius: '16px',
                      minHeight: '140px',
                      boxShadow: '0 2px 8px rgba(61, 46, 40, 0.05)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {note.pinned && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'rgba(142, 7, 95, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Pin size={14} color="#8E075F" fill="#8E075F" />
                      </div>
                    )}
                    <h4
                      className="laya-body mb-3"
                      style={{ 
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: 700,
                        paddingRight: note.pinned ? '32px' : '0',
                      }}
                    >
                      {note.title}
                    </h4>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '13px',
                        color: '#3D2E28',
                        opacity: 0.7,
                        lineHeight: '1.5',
                      }}
                    >
                      {note.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Empty state hint */}
              <div className="mt-8 text-center">
                <p
                  className="laya-body"
                  style={{ 
                    fontSize: '14px',
                    color: '#3D2E28',
                    opacity: 0.5,
                  }}
                >
                  Tap + to create a new shared list
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        onClick={handleFABClick}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '32px',
          width: '64px',
          height: '64px',
          borderRadius: '32px',
          background: '#8E075F',
          boxShadow: '0 8px 24px rgba(142, 7, 95, 0.4)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={32} color="white" strokeWidth={2.5} />
      </motion.button>

      {/* Date Details Modal (when clicking on a calendar date) */}
      <AnimatePresence>
        {showDateDetails && selectedDate && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '70vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  January {selectedDate}
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Events for this date */}
              {getEventsForSelectedDate().length > 0 ? (
                <div className="space-y-3 mb-6">
                  {getEventsForSelectedDate().map((event, idx) => (
                    <div
                      key={idx}
                      className="laya-card p-4 flex items-center gap-4"
                    >
                      {event.icon && (
                        <div style={{ fontSize: '24px' }}>{event.icon}</div>
                      )}
                      {!event.icon && (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '20px',
                            background: 
                              event.type === 'user' ? '#8E075F' :
                              event.type === 'partner' ? '#4ECDC4' :
                              '#F7B731',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CalendarIcon size={20} color="white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '16px',
                            color: '#3D2E28',
                            fontWeight: 700,
                            marginBottom: '2px',
                          }}
                        >
                          {event.title}
                        </p>
                        {event.time && (
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '13px',
                              color: '#3D2E28',
                              opacity: 0.6,
                            }}
                          >
                            {event.time}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6">
                  <p
                    className="laya-body"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      opacity: 0.5,
                    }}
                  >
                    No events on this day
                  </p>
                </div>
              )}

              {/* Add button */}
              <button
                onClick={() => {
                  setShowDateDetails(false);
                  setShowTypeSelector(true);
                }}
                className="w-full py-4 laya-button-primary"
                style={{
                  fontSize: '17px',
                  fontFamily: 'var(--laya-font-body)',
                  fontWeight: 600,
                }}
              >
                Add to this date
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Google Calendar Style Type Selector (when clicking + on calendar) */}
      <AnimatePresence>
        {showTypeSelector && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '24px',
                paddingBottom: '120px',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '24px',
                    color: '#3D2E28',
                  }}
                >
                  Create
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Type Options */}
              <div className="space-y-2">
                <button
                  onClick={() => handleTypeSelect('event')}
                  className="w-full p-4 flex items-center gap-4"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F2E8DA'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '24px',
                      background: '#8E075F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CalendarIcon size={24} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '17px',
                        color: '#3D2E28',
                        fontWeight: 700,
                        marginBottom: '2px',
                      }}
                    >
                      Event
                    </p>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '13px',
                        color: '#3D2E28',
                        opacity: 0.6,
                      }}
                    >
                      Add an occasion or milestone
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('task')}
                  className="w-full p-4 flex items-center gap-4"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F2E8DA'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '24px',
                      background: '#4ECDC4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckSquare size={24} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '17px',
                        color: '#3D2E28',
                        fontWeight: 700,
                        marginBottom: '2px',
                      }}
                    >
                      Task
                    </p>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '13px',
                        color: '#3D2E28',
                        opacity: 0.6,
                      }}
                    >
                      Add a to-do item
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('availability')}
                  className="w-full p-4 flex items-center gap-4"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F2E8DA'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '24px',
                      background: '#F7B731',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={24} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '17px',
                        color: '#3D2E28',
                        fontWeight: 700,
                        marginBottom: '2px',
                      }}
                    >
                      Availability
                    </p>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '13px',
                        color: '#3D2E28',
                        opacity: 0.6,
                      }}
                    >
                      Share your free time
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Plan a Date Modal */}
      <AnimatePresence>
        {showModal && modalType === 'date' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '85vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  Plan a Date
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Date & Time */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Activity */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Activity
                  </label>
                  <input
                    type="text"
                    placeholder="Dinner at..."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Vibe Tags */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Vibe
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Chill', 'Fancy', 'Adventure', 'Cozy'].map(vibe => (
                      <button
                        key={vibe}
                        className="p-4"
                        style={{
                          background: '#F2E8DA',
                          borderRadius: '16px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '15px',
                          fontFamily: 'var(--laya-font-body)',
                          color: '#3D2E28',
                          fontWeight: 600,
                        }}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    alert(`Date invite sent to ${partnerName}!`);
                    closeModal();
                  }}
                  className="w-full py-4 laya-button-primary mt-4"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                  }}
                >
                  Send Invite to {partnerName}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Event Modal */}
      <AnimatePresence>
        {showModal && modalType === 'event' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '85vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  Add Event
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Event title..."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Date & Time */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Event Type
                  </label>
                  <select
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <option value="us">Us (Shared)</option>
                    <option value="user">My Event</option>
                    <option value="partner">{partnerName}'s Event</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>

                {/* Event Details */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Event Details
                  </label>
                  <textarea
                    placeholder="Add details about the event..."
                    rows={3}
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Event Location */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Event location..."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    alert(`Event added!`);
                    closeModal();
                  }}
                  className="w-full py-4 laya-button-primary mt-4"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                  }}
                >
                  Add Event
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showModal && modalType === 'task' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '85vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  Add Task
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Task title..."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Category
                  </label>
                  <select
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <option value="Finance">Finance</option>
                    <option value="Home">Home</option>
                    <option value="Social">Social</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>

                {/* Assigned To */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Assigned To
                  </label>
                  <select
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <option value="user">You</option>
                    <option value="partner">{partnerName}</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                {/* Task Details */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Task Details
                  </label>
                  <textarea
                    placeholder="Add details about the task..."
                    rows={3}
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    alert(`Task added!`);
                    closeModal();
                  }}
                  className="w-full py-4 laya-button-primary mt-4"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                  }}
                >
                  Add Task
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Availability Modal */}
      <AnimatePresence>
        {showModal && modalType === 'availability' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '85vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  Share Availability
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Date */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Time Range */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    From
                  </label>
                  <input
                    type="time"
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    To
                  </label>
                  <input
                    type="time"
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Details */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Details
                  </label>
                  <input
                    type="text"
                    placeholder="Busy, Traveling, etc."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    alert(`Availability shared with ${partnerName}!`);
                    closeModal();
                  }}
                  className="w-full py-4 laya-button-primary mt-4"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                  }}
                >
                  Share with {partnerName}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showModal && modalType === 'note' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 200,
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#FFFCF8',
                borderRadius: '24px 24px 0 0',
                padding: '32px 24px',
                paddingBottom: '120px',
                maxHeight: '85vh',
                overflowY: 'auto',
                zIndex: 201,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                  }}
                >
                  Add Note
                </h3>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={20} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Note title..."
                    className="w-full p-4"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Content */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Content
                  </label>
                  <textarea
                    placeholder="Add items..."
                    className="w-full p-4"
                    rows={5}
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Color Picker */}
                <div>
                  <label
                    className="laya-body block mb-3"
                    style={{ 
                      fontSize: '15px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Color
                  </label>
                  <div className="flex gap-3">
                    {[
                      { name: 'Sunbeam', color: 'rgba(247, 183, 49, 0.1)', border: '#F7B731' },
                      { name: 'Oasis', color: 'rgba(78, 205, 196, 0.1)', border: '#4ECDC4' },
                      { name: 'Terracotta', color: 'rgba(142, 7, 95, 0.1)', border: '#8E075F' },
                      { name: 'Sandstone', color: 'rgba(242, 232, 218, 0.8)', border: '#C9B79C' },
                    ].map((option) => (
                      <button
                        key={option.name}
                        onClick={() => setSelectedNoteColor(option.color)}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          background: option.color,
                          border: selectedNoteColor === option.color 
                            ? `3px solid ${option.border}` 
                            : '2px solid rgba(61, 46, 40, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: selectedNoteColor === option.color 
                            ? `0 4px 12px ${option.border}40` 
                            : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pin Option */}
                <div>
                  <button
                    onClick={() => setIsNotePinned(!isNotePinned)}
                    className="flex items-center gap-3 p-4 w-full"
                    style={{
                      background: isNotePinned ? 'rgba(142, 7, 95, 0.05)' : '#F2E8DA',
                      borderRadius: '16px',
                      border: isNotePinned ? '2px solid #8E075F' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: isNotePinned ? '#8E075F' : 'rgba(61, 46, 40, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Pin 
                        size={20} 
                        color={isNotePinned ? 'white' : '#3D2E28'} 
                        fill={isNotePinned ? 'white' : 'none'}
                      />
                    </div>
                    <div className="text-left">
                      <p
                        className="laya-body"
                        style={{
                          fontSize: '16px',
                          color: '#3D2E28',
                          fontWeight: 600,
                        }}
                      >
                        Pin this note
                      </p>
                      <p
                        className="laya-body"
                        style={{
                          fontSize: '13px',
                          color: '#8B7355',
                          marginTop: '2px',
                        }}
                      >
                        Pinned notes appear at the top
                      </p>
                    </div>
                  </button>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    alert(`Note added!`);
                    closeModal();
                  }}
                  className="w-full py-4 laya-button-primary mt-4"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                  }}
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
