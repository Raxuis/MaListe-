<?php

namespace App\Models;

class ShoppingList extends Model
{
    private $id;
    private $name;
    private $description;
    private $items;
    private $createdAt;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getItems()
    {
        return $this->items;
    }

    public function setItems($items)
    {
        $this->items = $items;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    public function initShoppingList(array $shoppingList): void
    {
        if (isset($shoppingList["id"])) {
            $this->setId($shoppingList["id"]);
        }
        if (isset($shoppingList["description"])) {
            $this->setDescription($shoppingList["description"]);
        }
        $name = $shoppingList["name"];
        $items = $shoppingList["items"];
        $this->setName($name);
        $this->setItems($items);
    }

    public function getAll()
    {
        return db()->query('SELECT * FROM shopping_list')->all();
    }

    public function getById($id)
    {
        $rows = db()->query('
        SELECT shopping_list.id AS shopping_list_id,
               shopping_list.name AS shopping_list_name,
               shopping_list.description,
               shopping_list.created_at AS shopping_list_created_at,
               shopping_item.id AS shopping_item_id,
               shopping_item.name AS shopping_item_name
        FROM shopping_list
        LEFT JOIN shopping_list_shopping_item
            ON shopping_list_shopping_item.shopping_list_id = shopping_list.id
        LEFT JOIN shopping_item
            ON shopping_list_shopping_item.shopping_item_id = shopping_item.id
        WHERE shopping_list.id = ?
    ')->bind($id)->get();

        if (empty($rows)) {
            return null;
        }

        $shoppingList = [
            "id" => $rows[0]["shopping_list_id"],
            "name" => $rows[0]["shopping_list_name"],
            "description" => $rows[0]["description"] ?? "",
            "created_at" => $rows[0]["shopping_list_created_at"],
            "items" => []
        ];

        foreach ($rows as $row) {
            if ($row["shopping_item_id"] !== null) {
                $shoppingList["items"][] = [
                    "id" => $row["shopping_item_id"],
                    "name" => $row["shopping_item_name"]
                ];
            }
        }

        return $shoppingList;
    }


    public function getShoppingListItemsById($id)
    {
        $items = db()
            ->query('
        SELECT shopping_item.id, shopping_item.name, shopping_item.created_at, shopping_list.name as list_name
        FROM shopping_item
        INNER JOIN shopping_list_shopping_item
            ON shopping_list_shopping_item.shopping_item_id = shopping_item.id
        INNER JOIN shopping_list
            ON shopping_list_shopping_item.shopping_list_id = shopping_list.id
        WHERE shopping_list_shopping_item.shopping_list_id = ?
    ')
            ->bind($id)
            ->fetchAll();

        if (empty($items)) {
            return [
                'list_name' => '',
                'items' => []
            ];
        }

        $list_name = $items[0]['list_name'];

        return [
            'list_name' => $list_name,
            'items' => $items
        ];
    }

    public function add($shoppingList)
    {
        db()
            ->insert('shopping_list')
            ->params([
                "name" => $shoppingList["name"],
                "description" => $shoppingList["description"],
            ])
            ->execute();

        if (isset($shoppingList["items"])) {
            $shoppingListId = db()->lastInsertId();
            foreach ($shoppingList["items"] as $item) {
                db()
                    ->insert('shopping_item')
                    ->params([
                        "name" => $item["name"]
                    ])
                    ->execute();
                $itemId = db()->lastInsertId();
                db()
                    ->insert('shopping_list_shopping_item')
                    ->params([
                        "shopping_list_id" => $shoppingListId,
                        "shopping_item_id" => $itemId
                    ])
                    ->execute();
            }
        }
        return true;
    }

    public function update(array $attributes = [], array $options = [])
    {
        if (!isset($attributes["id"])) {
            throw new \Exception("ID requis pour mettre à jour la liste d'achats.");
        }

        db()
            ->query('UPDATE shopping_list SET name = ?, description = ? WHERE id = ?')
            ->bind($attributes["name"], $attributes["description"], $attributes["id"])
            ->execute();

        db()
            ->query('DELETE FROM shopping_list_shopping_item WHERE shopping_list_id = ?')
            ->bind($attributes["id"])
            ->execute();

        if (!empty($attributes["items"]) && is_array($attributes["items"])) {
            foreach ($attributes["items"] as $item) {
                $existingItem = db()
                    ->query('SELECT id FROM shopping_item WHERE name = ?')
                    ->bind($item["name"])
                    ->get();

                if (!is_array($existingItem) || !isset($existingItem["id"])) {
                    db()
                        ->query('INSERT INTO shopping_item (name) VALUES (?)')
                        ->bind($item["name"])
                        ->execute();
                    $itemId = db()->lastInsertId();
                } else {
                    $itemId = $existingItem["id"];
                }

                db()
                    ->query('INSERT INTO shopping_list_shopping_item (shopping_list_id, shopping_item_id) VALUES (?, ?)')
                    ->bind($attributes["id"], $itemId)
                    ->execute();
            }
        }

        return true;
    }


    public function deleteById($id)
    {
        return db()
            ->delete('shopping_list')
            ->where('id', $id)
            ->execute();
    }
}
