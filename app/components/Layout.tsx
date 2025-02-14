import React, {type ReactNode} from 'react';
import Header from "~/components/Header";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-col max-w-7xl mx-auto px-4 gap-8">
            <Header/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
