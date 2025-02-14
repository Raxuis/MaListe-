import {type RouteConfig, index, route, prefix} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix(
        "/shopping-lists",
        [
            route("", "routes/shopping-lists/elements.tsx"),
            route("add", "routes/shopping-lists/add.tsx"),
            route(":id", "routes/shopping-lists/element.tsx"),
            route(":id/edit", "routes/shopping-lists/edit.tsx"),
            ...prefix(
                ":id/items",
                [
                    route("", "routes/shopping-list-items/elements.tsx"),
                    route("add", "routes/shopping-list-items/add.tsx"),
                    route(":id", "routes/shopping-list-items/element.tsx"),
                    route(":id/edit", "routes/shopping-list-items/edit.tsx")
                ]
            )
        ]
    )
] satisfies RouteConfig;
