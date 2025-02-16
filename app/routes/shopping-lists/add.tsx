import React from 'react';
import TableListForm from "~/components/form/TableListForm";
import AddCard from "~/components/CustomCards/AddCard";

const Add = () => {
    return (
        <AddCard title="Add a Shopping List" description="Add a new shopping list to the database.">
            <TableListForm/>
        </AddCard>
    );
};

export default Add;
