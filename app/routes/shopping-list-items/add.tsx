import React from 'react';
import TableItemForm from "~/components/form/TableItemForm";

const Add = () => {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-center text-3xl">Add</p>
            <TableItemForm/>
        </div>
    );
};

export default Add;
