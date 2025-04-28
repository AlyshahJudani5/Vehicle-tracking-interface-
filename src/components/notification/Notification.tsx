import {useState} from "react";
import {Bell, X} from "lucide-react";
import {Button} from "../ui/Button.tsx";
import {ScrollArea} from "../ui/ScrollArea.tsx";
import {useStore} from "../../store/useStore";

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useStore((state) => state.theme);

    return (
        <>
            {/* Notification Panel */}
            <div
                className={`
                    absolute right-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-80 transform border rounded-t-md shadow-lg
                    transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}
                    ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
                `}
            >
                <div className="flex h-14 items-center justify-between border-b px-4">
                    <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}/>
                    </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-7rem)]">
                    <div className="p-4 space-y-4">
                        <NotificationItem
                            type="warning"
                            title="Low Battery Alert"
                            description="Vehicle XYZ-123 battery level below 20%"
                            time="2 mins ago"
                            theme={theme}
                        />
                        <NotificationItem
                            type="error"
                            title="Vehicle Offline"
                            description="Lost connection with ABC-789"
                            time="5 mins ago"
                            theme={theme}
                        />
                        <NotificationItem
                            type="info"
                            title="Route Update"
                            description="DEF-456 has completed its route"
                            time="10 mins ago"
                            theme={theme}
                        />
                    </div>
                </ScrollArea>
            </div>

            <Button
                variant="outline"
                size="icon"
                className={`fixed right-14 bottom-10 shadow-lg z-[999] ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                style={{ borderRadius: '1000px', width: "70px", height: "70px" }}
            >
                <Bell className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ width: "30%", height: "30%" }} />
            </Button>

        </>
    );
}

function NotificationItem({
                              type,
                              title,
                              description,
                              time,
                              theme,
                          }: {
    type: "warning" | "error" | "info";
    title: string;
    description: string;
    time: string;
    theme: string;
}) {
    const colors = {
        warning: theme === 'dark' ? "bg-yellow-900 text-yellow-200" : "bg-yellow-200 text-yellow-800",
        error: theme === 'dark' ? "bg-red-900 text-red-200" : "bg-red-200 text-red-800",
        info: theme === 'dark' ? "bg-blue-900 text-blue-200" : "bg-blue-200 text-blue-800",
    };

    return (
        <div className={`mb-4 rounded-lg border p-4 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
            <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${colors[type]}`}/>
                <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
                    <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{time}</p>
                </div>
            </div>
        </div>
    );
}