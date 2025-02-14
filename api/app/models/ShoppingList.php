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
        shoppingLists = db()->query('SELECT * FROM shopping_list')->all();
        return shoppingLists;
    }

    public function getById($id)
    {
        shoppingList = db()->query('SELECT * FROM shopping_list WHERE id = ?')->bind($id)->first();
        return shoppingList;
    }

    public function add($shoppingList)
    {
        return db()
            ->insert('shopping_lists')
            ->params([
                "name" => $shoppingList["name"],
                "description" => $shoppingList["description"],
                "items" => $shoppingList["items"]
            ])
            ->execute();
    }

    public function updateById($shoppingList)
    {
        return db()
            ->update('shopping_lists')
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
            ->delete('shopping_lists')
            ->where('id', $id)
            ->execute();
    }
}
