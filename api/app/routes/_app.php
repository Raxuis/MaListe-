<?php

$host = _env('DB_HOST');
$port = _env('DB_PORT');
$hostWithPort = $host . ":" . $port;

db()->connect(
    $hostWithPort,
    _env('DB_DATABASE'),
    _env('DB_USERNAME'),
    _env('DB_PASSWORD')
);

app()->get('/', "Controller@index");

app()->group("/shopping-lists", function () {
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
