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
        $description = $shoppingItem["description"];
        $this->setName($name);
        $this->setDescription($description);
    }

    public function add($shoppingItem)
    {
        return db()
            ->insert('shopping_items')
            ->params([
                "name" => $shoppingItem["name"],
                "description" => $shoppingItem["description"],
                "shopping_list_id" => $shoppingItem["shopping_list_id"]
            ])
            ->execute();
    }

    public function getById($id)
    {
        return db()
            ->query('SELECT * FROM shopping_items WHERE id = ?')
            ->bind($id)
            ->first();
    }

//    public function getByShoppingListId($id)
//    {
//        return db()
//            ->query('SELECT * FROM shopping_item INNER JOIN shopping_list_shopping_item WHERE shopping_list_shopping_item.shopping_list_id = ?')
//            ->bind($id)
//            ->fetchAll();
//    }

    public function getAll()
    {
        return db()
            ->query('SELECT * FROM shopping_items')
            ->fetchAll();
    }

    public function updateById(array $shoppingItem)
    {
        return db()
            ->update('shopping_items')
            ->params([
                "name" => $shoppingItem["name"],
                "description" => $shoppingItem["description"],
                "shopping_list_id" => $shoppingItem["shopping_list_id"]
            ])
            ->where('id = ?')
            ->bind($shoppingItem["id"])
            ->execute();
    }

    public function deleteById($id)
    {
        return db()
            ->delete('shopping_items')
            ->where('id = ?')
            ->bind($id)
            ->execute();
    }
}
