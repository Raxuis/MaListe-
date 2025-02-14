import React from 'react';
import TableListForm from "~/components/form/TableListForm";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

const Add = () => {
    return (
        <Card className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add a Shopping List</CardTitle>
                <CardDescription>Add a new shopping list to the database.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableListForm/>
            </CardContent>
        </Card>
    );
};

export default Add;
