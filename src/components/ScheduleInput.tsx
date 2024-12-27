import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ScheduleInput = () => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    toast({
      title: "Processing your request",
      description: "We're analyzing your scheduling request...",
    });

    try {
      // Here we simulate processing the scheduling request
      // In a real app, this would call your AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, we're just simulating saving the appointment
      // In a real app, this would be handled by your backend
      const appointment = {
        id: Date.now().toString(),
        title: input,
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString().split('T')[0],
      };

      // In a real app, you would save this to your backend
      console.log('New appointment:', appointment);
      
      toast({
        title: "Schedule Updated",
        description: "Your appointment has been scheduled successfully!",
      });

      // Clear input and collapse
      setInput('');
      setIsExpanded(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your scheduling request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`p-4 transition-all duration-300 ${
      isExpanded ? 'h-40' : 'h-16'
    }`}>
      <form onSubmit={handleSubmit} className="h-full">
        <div className="flex items-center h-full gap-2">
          <Input
            placeholder="Type your scheduling request..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-1 text-lg"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ScheduleInput;