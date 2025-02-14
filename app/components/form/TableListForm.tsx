import React, {type FormEvent, useState, useEffect} from 'react';
import {useNavigate} from "react-router";
import {PlusCircle, Trash} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";

type Item = {
    name: string;
};

type TableList = {
    id?: number;
    name: string;
    description: string;
    items: Item[];
};

type Props = {
    id?: number;
    name?: string;
    description?: string;
    items?: Item[];
};

const TableListForm = ({id, name, description, items}: Props) => {
    const navigate = useNavigate();
    const [tableList, setTableList] = useState<TableList>({
        id: id || undefined,
        name: name || "",
        description: description || "",
        items: items || [],
    });

    const [newItem, setNewItem] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setTableList({
            id: id || undefined,
            name: name || "",
            description: description || "",
            items: items || [],
        });
    }, [id, name, description, items]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!tableList.name) {
            setError("Veuillez remplir le nom de la liste");
            return;
        }
        setError("");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`, {
            method: tableList.id ? "PUT" : "POST",
            body: JSON.stringify(tableList),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                navigate("/shopping-lists");
            })
            .catch(() => {
                setError("Une erreur est survenue");
            });
    };

    const handleAddItem = () => {
        if (!newItem.trim()) return;

        setTableList((prevList) => ({
            ...prevList,
            items: [...prevList.items, {name: newItem.trim()}],
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
            <Input type="hidden" name="id" value={tableList.id}/>
            <Input
                name="name"
                id="name"
                type="text"
                placeholder="Nom de la liste"
                value={tableList.name}
                onChange={(e) => setTableList((prevList) => ({...prevList, name: e.target.value}))}
            />

            <Textarea
                name="description"
                id="description"
                placeholder="Description de la liste"
                value={tableList.description}
                onChange={(e) => setTableList((prevList) => ({...prevList, description: e.target.value}))}
            />

            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    className="flex-grow"
                    placeholder="Ajouter un élément"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button type="button" onClick={handleAddItem} variant="outline" className="cursor-pointer">
                    <PlusCircle className="w-5 h-5"/>
                </Button>
            </div>

            <ul className="space-y-2">
                {tableList.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        {item.name}
                        <Button
                            variant="outline"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
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
                    {tableList.id ? "Modifier" : "Créer"}
                </Button>
            </div>
        </form>
    );
};

export default TableListForm;
