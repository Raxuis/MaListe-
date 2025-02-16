<?php

namespace App\Models;

class ShoppingItem extends Model
{
    private $id;
    private $name;
    private $createdAt;
    private $shoppingListId;

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

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    public function getShoppingListId()
    {
        return $this->shoppingListId;
    }

    public function setShoppingListId($shoppingListId)
    {
        $this->shoppingListId = $shoppingListId;
    }

    public function initShoppingItem(array $shoppingItem): void
    {
        if (isset($shoppingItem["id"])) {
            $this->setId($shoppingItem["id"]);
        }
        if (isset($shoppingItem["shopping_list_id"])) {
            $this->setShoppingListId($shoppingItem["shopping_list_id"]);
        }
        $name = $shoppingItem["name"];
        $this->setName($name);
    }

    public function add($shoppingItem)
    {
        db()
            ->insert('shopping_item')
            ->params([
                "name" => $shoppingItem["name"],
                "is_completed" => 0
            ])
            ->execute();

        if (isset($shoppingItem["listId"])) {
            $shoppingItemId = db()->lastInsertId();

            if (!$shoppingItemId) {
                throw new \Exception("Failed to retrieve last insert ID.");
            }

            db()
                ->insert('shopping_list_shopping_item')
                ->params([
                    "shopping_list_id" => $shoppingItem["listId"],
                    "shopping_item_id" => $shoppingItemId
                ])
                ->execute();
        }
    }

    public function getById($id)
    {
        return db()
            ->query('
            SELECT shopping_item.id, shopping_item.name, shopping_item.created_at,
                   shopping_item.is_completed, shopping_list_shopping_item.shopping_list_id AS listId
            FROM shopping_item
            INNER JOIN shopping_list_shopping_item ON shopping_item.id = shopping_list_shopping_item.shopping_item_id
            INNER JOIN shopping_list ON shopping_list_shopping_item.shopping_list_id = shopping_list.id
            WHERE shopping_item.id = ?
        ')
            ->bind($id)
            ->first();
    }

    public function getAll()
    {
        return db()
            ->query('
            SELECT si.*, sl.name AS shopping_list_name
            FROM shopping_item si
            JOIN shopping_list_shopping_item slsi ON si.id = slsi.shopping_item_id
            JOIN shopping_list sl ON slsi.shopping_list_id = sl.id
        ')
            ->fetchAll();
    }

    public function update(array $attributes = [], array $options = [])
    {
        if (!isset($attributes["itemId"]) || !isset($attributes["name"]) || !isset($attributes["listId"])) {
            throw new \Exception("Les champs itemId, name et listId sont requis.");
        }

        db()
            ->query('UPDATE shopping_item SET name = ? WHERE id = ?')
            ->bind($attributes["name"], $attributes["itemId"])
            ->execute();

        db()
            ->query('DELETE FROM shopping_list_shopping_item WHERE shopping_item_id = ?')
            ->bind($attributes["itemId"])
            ->execute();

        db()
            ->query('INSERT INTO shopping_list_shopping_item (shopping_list_id, shopping_item_id) VALUES (?, ?)')
            ->bind($attributes["listId"], $attributes["itemId"])
            ->execute();

        return true;
    }


    public function deleteById($id)
    {
        return db()
            ->delete('shopping_item')
            ->where('id = ?')
            ->bind($id)
            ->execute();
    }

    public function toggleComplete($id, $isCompleted)
    {
        return db()
            ->query('UPDATE shopping_item SET is_completed = ? WHERE id = ?')
            ->bind((int)$isCompleted, $id)
            ->execute();
    }
}
