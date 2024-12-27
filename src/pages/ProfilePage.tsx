import { Card } from "@/components/ui/card";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <p className="text-lg">John Doe</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-lg">john@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium">Time Zone</label>
            <p className="text-lg">Eastern Time (ET)</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;