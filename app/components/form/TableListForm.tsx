import React, {type FormEvent, useState} from 'react';
import {useNavigate} from "react-router";
import {PlusCircle, Trash} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";

type TableList = {
    name: string;
    description: string;
    items: string[];
}

const TableListForm = () => {
    const navigate = useNavigate();
    const [tableList, setTableList] = useState<TableList>({
        name: "",
        description: "",
        items: []
    });
    const [newItem, setNewItem] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!tableList.name) {
            setError("Veuillez remplir le nom de la liste");
            return;
        }
        if (!tableList.description) {
            setError("Veuillez remplir la description de la liste");
            return;
        }
        setError("");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`, {
            method: 'POST',
            body: JSON.stringify(tableList),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                console.log("List created successfully!");
            })
            .catch(() => {
                setError("Une erreur est survenue");
            });
    };

    const handleAddItem = () => {
        if (newItem.trim() === "") return;
        setTableList((prevList) => ({
            ...prevList,
            items: [...prevList.items, newItem.trim()],
        }));
        setNewItem("");
    };

    const handleRemoveItem = (index: number) => {
        setTableList((prevList) => ({
            ...prevList,
            items: prevList.items.filter((_, i) => i !== index),
        }));
    };

    return (
        <form method="POST" action="#" onSubmit={handleSubmit} className="flex flex-col w-full mx-auto space-y-4">
            <Input
                name="name"
                id="name"
                type="text"
                placeholder="Nom de la liste"
                onChange={(e) => setTableList((prevList) => ({...prevList, name: e.target.value}))}
            />

            <Textarea
                name="description"
                id="description"
                placeholder="Description de la liste"
                onChange={(e) => setTableList((prevList) => ({...prevList, description: e.target.value}))}
            />

            <div className="flex items-center gap-2">
                <Input type="text" className="flex-grow" placeholder="Ajouter un élément" value={newItem}
                       onChange={(e) => setNewItem(e.target.value)}/>
                <Button type="button" onClick={handleAddItem} variant="outline" className="cursor-pointer">
                    <PlusCircle className="w-5 h-5"/>
                </Button>
            </div>

            <ul className="space-y-2">
                {tableList.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        {item}
                        <Button variant="outline" onClick={() => handleRemoveItem(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer">
                            <Trash className="w-5 h-5"/>
                        </Button>
                    </li>
                ))}
            </ul>

            {!!error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-end gap-4">
                <Button variant="destructive" onClick={() => navigate("/shopping-lists")}>
                    Annuler
                </Button>
                <Button type="submit" variant="outline">
                    Créer
                </Button>
            </div>
        </form>
    );
};

export default TableListForm;
