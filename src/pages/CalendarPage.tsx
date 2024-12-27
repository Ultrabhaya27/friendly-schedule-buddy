import Calendar from "@/components/Calendar";
import ScheduleInput from "@/components/ScheduleInput";

const CalendarPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <ScheduleInput />
      <Calendar />
    </div>
  );
};

export default CalendarPage;