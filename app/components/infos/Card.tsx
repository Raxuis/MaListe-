import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Calendar} from "lucide-react";
import {formatDateTime} from "~/utils";

type InfosCardProps = {
    infos: {
        name: string,
        description: string,
        items?: {
            id: number,
            name: string,
        }[],
        createdAt: string,
    }
}

const InfosCard = ({infos}: InfosCardProps) => {
    const {name, description, items, createdAt} = infos;
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    <p className="text-sm text-slate-500">{description}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    (items && items.length > 0) && (
                        <>
                            <p>Items :</p>
                            <ul>
                                {items.map((item) => (
                                    <li key={item.id}>- {item.name}</li>
                                ))}
                            </ul>
                        </>
                    )
                }
            </CardContent>
            <CardFooter>
                <p className="flex gap-2 text-sm text-slate-500 items-center">
                    <Calendar className="size-5"/>
                    <span>
                            {formatDateTime(createdAt).dateTime}
                        </span>
                </p>
            </CardFooter>
        </Card>
    );
};

export default InfosCard;
