import React, {type ReactNode} from 'react';
import Header from "~/components/Header";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <>
            <Header/>
            <main className="">
                {children}
            </main>
        </>
    );
};

export default Layout;
