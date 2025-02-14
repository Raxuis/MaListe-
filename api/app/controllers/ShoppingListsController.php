<?php

namespace App\Controllers;

use App\Models\ShoppingList;
use utils\Functions;

class ShoppingListsController extends Controller
{
    public function index(): void
    {
        $shoppingListManager = new ShoppingList();
        $shoppingLists = $shoppingListManager->getAll();
        if (!$shoppingLists) {
            response()->json([
                "message" => "No shopping lists found",
                "status" => 200
            ], 200);
            return;
        }
        response()->json([
            "message" => "List of shopping lists",
            "shopping_lists" => $shoppingLists
        ], 200);
    }

    public function create(): void
    {
        $shoppingList = request()->get([
            "name",
            "description",
            "items"
        ]);

        $shoppingListRequiredFields = [
            "name"
        ];

        var_dump($shoppingList);
        Functions::verifyRequestValues($shoppingListRequiredFields);

        $shoppingListManager = new ShoppingList();
        $shoppingListManager->initShoppingList($shoppingList);

        $createdShoppingList = $shoppingListManager->add($shoppingList);
        if (!$createdShoppingList) {
            response()->json([
                "message" => "Error while creating shopping list",
                "status" => 500
            ], 500);
            return;
        }
        response()->json([
            "message" => "Shopping list created",
            "shopping_list" => $createdShoppingList
        ], 201);
    }

    public function show($id): void
    {
        $shoppingListManager = new ShoppingList();
        $shoppingList = $shoppingListManager->getById($id);
        if (!$shoppingList) {
            response()->json([
                "message" => "Shopping list not found",
                "status" => 200
            ], 200);
            return;
        }
        response()->json([
            "message" => "Shopping list",
            "shopping_list" => $shoppingList
        ], 200);
    }

    public function showItems($id)
    {
        $shoppingListManager = new ShoppingList();
        $shoppingList = $shoppingListManager->getItemsById($id);
        if (!$shoppingList) {
            response()->json([
                "message" => "Shopping list not found",
                "status" => 200
            ], 200);
            return;
        }
        response()->json($shoppingList, 200);
    }

    public function update(): void
    {
        $shoppingList = request()->get([
            "id",
            "name",
            "description",
            "items"
        ]);

        $requestedFields = [
            "id",
            "name"
        ];

        Functions::verifyRequestValues($requestedFields);

        $shoppingListManager = new ShoppingList();
        $shoppingListManager->initShoppingList($shoppingList);

        $updatedShoppingList = $shoppingListManager->update($shoppingList);
        if (!$updatedShoppingList) {
            response()->json([
                "message" => "Error while updating shopping list",
                "status" => 500
            ], 500);
            return;
        }
        response()->json([
            "message" => "Shopping list updated",
            "shopping_list" => $updatedShoppingList
        ], 200);
    }

    public function delete($id): void
    {
        $shoppingListManager = new ShoppingList();
        $deletedShoppingList = $shoppingListManager->deleteById($id);
        if (!$deletedShoppingList) {
            response()->json([
                "message" => "Error while deleting shopping list",
                "status" => 500
            ], 500);
            return;
        }
        response()->json([
            "message" => "Shopping list deleted",
            "shopping_list" => $deletedShoppingList
        ], 200);
    }
}
