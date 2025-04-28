import {Search} from "lucide-react";
import {useState} from "react";
import {Button} from "../ui/Button.tsx";
import {Input} from "../ui/Input.tsx";
import {useStore} from "../../store/useStore.ts";

interface SearchBarProps {
    onSearch: (vehicleNumber: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const theme = useStore((state) => state.theme);
    const [searchQuery, setSearchQuery] = useState("");
    const buttonVariant = theme === 'dark' ? 'ghostDark' : 'ghost';

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="flex justify-center items-center gap-x-0">
            <div className="w-[200px]">
                <Input
                    type="search"
                    placeholder="Search vehicles..."
                    className="h-8 w-[150px] lg:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button variant={buttonVariant} size="icon" className="px-5" onClick={handleSearch}>
                <Search className="w-4 h-4"/>
            </Button>
        </div>
    );
};

export default SearchBar;
