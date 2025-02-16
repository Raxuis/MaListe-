<?php

namespace App\Controllers;

use App\Models\ShoppingItem;
use utils\Functions;

class ShoppingItemsController extends Controller
{
    public function index(): void
    {
        $shoppingItemManager = new ShoppingItem();
        $items = $shoppingItemManager->getAll();
        if (!$items) {
            response()->json([
                "message" => "No items found",
                "status" => 404
            ], 404);
            return;
        }
        response()->json([
            "message" => "List of items",
            "items" => $items
        ], 200);
    }

    public function show($id)
    {
        $shoppingItemManager = new ShoppingItem();
        $item = $shoppingItemManager->getById($id);
        if (!$item) {
            response()->json([
                "message" => "Item not found",
                "status" => 404
            ], 404);
            return;
        }
        response()->json([
            "message" => "Item found",
            "item" => $item
        ], 200);
    }

    public function create()
    {
        $datas = request()->get([
            "name",
            "listId"
        ]);
        Functions::verifyRequestValues($datas);

        $shoppingItemManager = new ShoppingItem();
        $shoppingItemManager->add($datas);
    }

    public function update()
    {
        $datas = request()->get([
            "itemId",
            "name",
            "listId"
        ]);
        Functions::verifyRequestValues($datas);

        $shoppingItemManager = new ShoppingItem();
        $shoppingItemManager->update($datas);
    }

    public function delete($id)
    {
        $shoppingItemManager = new ShoppingItem();
        $shoppingItemManager->deleteById($id);
    }
}
