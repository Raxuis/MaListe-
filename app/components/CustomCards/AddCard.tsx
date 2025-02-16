import React, {type ReactNode} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

type AddCardProps = {
    title: string;
    description: string;
    children: ReactNode;
}

const AddCard = ({title, description, children}: AddCardProps) => {
    return (
        <Card className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default AddCard;
