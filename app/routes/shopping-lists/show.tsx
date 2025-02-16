import {useEffect} from 'react';
import {useParams, useNavigate} from "react-router";
import {Button} from "~/components/ui/button";
import InfosCard from "~/components/CustomCards/InfoCard";
import {useShoppingList} from '~/hooks/useShoppingList';

const Show = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentList, fetchShoppingList, setCurrentList} = useShoppingList();

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) return;
            try {
                const itemData = await fetchShoppingList(parseInt(id));
                setCurrentList(itemData);
            } catch (error) {
                console.error("Failed to fetch item", error);
            }
        };

        fetchItem();

        return () => {
            // To avoid issues when navigating to another shopping-list
            setCurrentList(null);
        };
    }, [id, fetchShoppingList]);

    if (!currentList) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
            <InfosCard infos={{
                ...currentList,
                createdAt: currentList.created_at
            }}/>
            <Button effect="gooeyRight" variant="outline" className="cursor-pointer" onClick={() => navigate(-1)}>
                Back
            </Button>
        </div>
    );
};

export default Show;
