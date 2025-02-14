import React from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsColumns} from "~/components/table/columns/shoppingListsColumns";

const Elements = () => {
    return (
        <div>
            Elements
            <DataTable
                columns={shoppingListsColumns}
                data={[]}
            />
        </div>
    );
};

export default Elements;
