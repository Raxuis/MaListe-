import React, {type ReactNode} from "react";
import {Card, CardHeader, CardTitle} from "~/components/ui/card";

type EditCardProps = {
    children: ReactNode;
    title: string;
}

const EditCard = ({children, title}: EditCardProps) => {
    return (
        <Card className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            {children}
        </Card>
    );
};

export default EditCard;
