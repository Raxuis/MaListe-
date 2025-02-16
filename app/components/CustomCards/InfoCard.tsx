import React, {useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Calendar, ListCheck} from "lucide-react";
import {formatDateTime} from "~/utils";
import {Checkbox} from "~/components/ui/checkbox";
import {toast} from "sonner";
import {cn} from "~/utils/cn";

type InfosCardProps = {
    infos: {
        name: string,
        description: string,
        items?: {
            id: number,
            name: string,
            is_completed: boolean
        }[],
        is_completed?: boolean,
        createdAt: string,
    }
}

const statusClasses = {
    completed: "bg-green-100 text-green-700 border-green-300",
    notCompleted: "bg-red-100 text-red-700 border-red-300",
};

const InfosCard = ({infos}: InfosCardProps) => {
    const {name, description, createdAt, is_completed} = infos;
    const [items, setItems] = useState(infos.items || []);

    const handleCheckboxChange = async (itemId: number, checked: boolean) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${itemId}/toggle`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({is_completed: checked})
            });

            if (!response.ok) throw new Error('Failed to update item status');

            setItems(currentItems =>
                currentItems.map(item =>
                    item.id === itemId ? {...item, is_completed: checked} : item
                )
            );
            toast.success("Item status updated");
        } catch (error) {
            toast.error("Failed to update item status");
        }
    };

    return (
        <Card className="p-4 border border-gray-200 shadow-md rounded-xl bg-white">
            <CardHeader className="flex flex-col gap-2">
                <CardTitle className="text-lg font-semibold text-gray-800">{name}</CardTitle>
                <p className="text-sm text-gray-600">{description}</p>
            </CardHeader>
            <CardContent className="mt-2">
                {(items && items.length > 0) && (
                    <div>
                        <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                            <ListCheck className="size-5 text-blue-500"/>
                            <span>Items List</span>
                        </div>
                        <ul className="space-y-2">
                            {items.map(item => (
                                <li key={item.id}
                                    className="flex items-center gap-3 p-2 rounded-lg transition hover:bg-gray-100">
                                    <Checkbox
                                        id={`item-${item.id}`}
                                        checked={item.is_completed}
                                        onCheckedChange={checked => handleCheckboxChange(item.id, checked as boolean)}
                                        className="size-5 cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`item-${item.id}`}
                                        className={`text-sm transition ${item.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                                    >
                                        {item.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500 mt-3 w-full">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-gray-400"/>
                    <span>{formatDateTime(createdAt).dateTime}</span>
                </div>
                {is_completed !== undefined && (
                    <div>
                            <span className={cn(
                                "px-3 py-1 text-xs font-medium border rounded-full text-center w-1/3",
                                is_completed ? statusClasses.completed : statusClasses.notCompleted
                            )}>
                            {is_completed ? "Completed" : "Not Completed"}
                        </span>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default InfosCard;
