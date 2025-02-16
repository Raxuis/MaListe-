import React from 'react';
import TableItemForm from '~/components/form/TableItemForm';
import AddCard from "~/components/CustomCards/AddCard";

const Add = () => {
    return (
        <AddCard title="Add a Shopping Item" description="Add a new shopping item to the database.">
            <TableItemForm/>
        </AddCard>
    );
};

export default Add;
