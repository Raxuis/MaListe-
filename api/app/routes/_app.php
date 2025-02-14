<?php
//db()->connect([
//    'host' => '127.0.0.1',
//    'username' => 'root',
//    'password' => 'root',
//    'dbname' => 'react-php-coda',
//    'port' => 8889
//]);

app()->get('/', "Controller@index");

app()->group("/shopping-list", function () {
    app()->get("/", "ShoppingListsController@index");
    app()->get("/{id}", "ShoppingListsController@show");
    app()->post("/", "ShoppingListsController@create");
    app()->put("/", "ShoppingListsController@update");
    app()->delete("/", "ShoppingListsController@delete");
    app()->get("/items/{id}", "ShoppingListsController@items");
    app()->post("/items", "ShoppingListsController@addItem");
    app()->put("/items", "ShoppingListsController@updateItem");
    app()->delete("/items", "ShoppingListsController@deleteItem");
});
