<?php

namespace App\Controllers;

use App\Models\ShoppingItem;
use utils\Functions;

class ShoppingItemsController extends Controller
{
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

    public function add($datas)
    {

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
        $item = $shoppingItemManager->update($datas);
    }
}
