import React from 'react';
import TableItemForm from '~/components/form/TableItemForm';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

const Add = () => {
    return (
        <Card className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add a Shopping Item</CardTitle>
                <CardDescription>Add a new shopping item to the database.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableItemForm/>
            </CardContent>
        </Card>
    );
};

export default Add;
