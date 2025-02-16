<?php

$host = _env('DB_HOST');
$port = _env('DB_PORT');
$hostWithPort = $host . ":" . $port;

db()->connect(
    $hostWithPort,
    _env('DB_DATABASE'),
    _env('DB_USERNAME'),
    _env('DB_PASSWORD'),
    _env('DB_CONNECTION')
);

app()->get('/', "Controller@index");

app()->group("/shopping-lists", function () {
    app()->get("/", "ShoppingListsController@index");

    app()->get("/items", "ShoppingItemsController@index");
    app()->get("/items/{id}", "ShoppingItemsController@show");
    app()->post("/items", "ShoppingItemsController@create");
    app()->put("/items", "ShoppingItemsController@update");
    app()->delete("/items/{id}", "ShoppingItemsController@delete");

    app()->get("/{id}", "ShoppingListsController@show");
    app()->get("/{id}/items", "ShoppingListsController@showItems");
    app()->post("/", "ShoppingListsController@create");
    app()->put("/", "ShoppingListsController@update");
    app()->delete("/{id}", "ShoppingListsController@delete");
});

