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
        $name = $shoppingList["name"];
        $description = $shoppingList["description"];
        $items = $shoppingList["items"];
        $this->setName($name);
        $this->setDescription($description);
        $this->setItems($items);
    }

    public function getAll()
    {
        return db()->query('SELECT * FROM shopping_list')->all();;
    }

    public function getById($id)
    {
        return db()->query('SELECT * FROM shopping_list WHERE id = ?')->bind($id);
    }

    public function getItemsById($id)
    {
        return db()
            ->query('SELECT * FROM shopping_item INNER JOIN shopping_list_shopping_item WHERE shopping_list_shopping_item.shopping_list_id = ?')
            ->bind($id)
            ->fetchAll();
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

    public function updateById($shoppingList)
    {
        return db()
            ->update('shopping_list')
            ->params([
                "name" => $shoppingList["name"],
                "description" => $shoppingList["description"],
                "items" => $shoppingList["items"]
            ])
            ->where('id', $shoppingList["id"])
            ->execute();
    }

    public function deleteById($id)
    {
        return db()
            ->delete('shopping_list')
            ->where('id', $id)
            ->execute();
    }
}
