import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import InfosCard from "~/components/CustomCards/InfoCard";
import { useShoppingList } from '~/hooks/useShoppingList';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentList, fetchShoppingList } = useShoppingList();

  useEffect(() => {
    void fetchShoppingList(parseInt(id as string));
  }, [id, fetchShoppingList]);

  if (!currentList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
      <InfosCard infos={{
        ...currentList,
        createdAt: currentList.created_at
      }} />
      <Button variant="outline" className="cursor-pointer" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default Show;
