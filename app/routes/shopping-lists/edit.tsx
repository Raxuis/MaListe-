import React, { useEffect } from 'react';
import TableListForm from "~/components/form/TableListForm";
import { useParams } from "react-router";
import EditCard from "~/components/CustomCards/EditCard";
import { useShoppingList } from '~/hooks/useShoppingList';

const Edit = () => {
  const { id } = useParams();
  const { currentList, fetchShoppingList } = useShoppingList();

  useEffect(() => {
    void fetchShoppingList(parseInt(id as string));
  }, [id, fetchShoppingList]);

  if (!currentList) {
    return <div>Loading...</div>;
  }

  return (
    <EditCard title={`Edit List : ${currentList.name}`}>
      <TableListForm
        id={currentList.id}
        description={currentList.description}
        items={currentList.items}
        name={currentList.name}
      />
    </EditCard>
  );
};

export default Edit;
