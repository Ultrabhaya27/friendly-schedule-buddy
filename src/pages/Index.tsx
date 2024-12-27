import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Calendar from "@/components/Calendar";
import ScheduleInput from "@/components/ScheduleInput";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <ScheduleInput />
            <Calendar />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;