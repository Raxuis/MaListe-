import {Card} from "~/components/ui/card";
import {Link} from "react-router";
import {HomeIcon, Menu, ScrollTextIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

const Header = () => {
    return (
        <Card
            className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5 mx-auto">
            <Link to="/" className="group">
                <img className="text-primary cursor-pointer size-10 group-hover:scale-110 duration-300" src="/icon.png"
                     alt="icon"/>
            </Link>
            <div className="flex mr-2 items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                        <Menu/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link to="/" className="flex items-center gap-2">
                                <HomeIcon/>
                                Home
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link to="/shopping-lists">
                                <ScrollTextIcon/>
                                Shopping Lists
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
};

export default Header;