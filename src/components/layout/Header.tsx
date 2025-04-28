import SearchBar from "./SearchBar";
import {Button} from "../ui/Button.tsx";
import {Bell, Settings} from "lucide-react";
import {useStore} from "../../store/useStore.ts";

interface HeaderProps {
    onSearch: (vehicleNumber: string) => void;
}

const Header: React.FC<HeaderProps> = ({onSearch}) => {
    const theme = useStore((state) => state.theme);
    const buttonVariant = theme === 'dark' ? 'ghostDark' : 'ghost';
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">DHA Vehicle Tracker</h1>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <SearchBar onSearch={onSearch}/>
                    <Button variant={buttonVariant} size="icon">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant={buttonVariant} size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
