import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {HomeIcon, Menu, ScrollTextIcon, ShoppingBasket} from "lucide-react";
import {Link} from "react-router";

const HeaderDropdownMenu = () => {
    return (
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
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/shopping-items">
                            <ShoppingBasket/>
                            Shopping Items
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default HeaderDropdownMenu;
