import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  time: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [appointments, setAppointments] = React.useState<Record<string, Appointment[]>>({
    '2024-03-27': [
      { id: '1', title: 'Doctor Appointment', time: '10:00 AM' },
      { id: '2', title: 'Team Meeting', time: '2:00 PM' },
    ],
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(prev => prev?.getTime() === newDate.getTime() ? null : newDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDate(currentDay);
      const hasAppointments = appointments[dateKey]?.length > 0;
      
      const isSelected = selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();

      const isToday = new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div key={day} className="relative">
          <button
            onClick={() => handleDateClick(day)}
            className={`h-12 w-full rounded-lg transition-all duration-200 hover:bg-secondary relative ${
              isSelected
                ? 'bg-primary text-primary-foreground'
                : isToday
                ? 'bg-accent text-accent-foreground'
                : ''
            }`}
          >
            <span>{day}</span>
            {hasAppointments && (
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
          {isSelected && appointments[dateKey] && (
            <div className="absolute z-10 left-0 right-0 mt-2 bg-card rounded-lg shadow-lg p-3 animate-fade-in">
              <h4 className="text-sm font-medium mb-2">Appointments</h4>
              <div className="space-y-2">
                {appointments[dateKey].map((apt) => (
                  <div key={apt.id} className="text-sm p-2 bg-accent rounded">
                    <p className="font-medium">{apt.title}</p>
                    <p className="text-muted-foreground">{apt.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <Card className="p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </Card>
  );
};

export default Calendar;