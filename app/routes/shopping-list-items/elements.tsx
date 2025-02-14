import React from 'react';
import {DataTable} from "~/components/table/DataTable";
import { shoppingListsItemsColumns } from '~/components/table/columns/shoppingListsItemsColumns';

const Elements = () => {
    return (
        <div>
            Elements
            <DataTable
                columns={shoppingListsItemsColumns}
                data={[]}
            />
        </div>
    );
};

export default Elements;
