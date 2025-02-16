import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix(
    "/shopping-lists",
    [
      route("", "routes/shopping-lists/list.tsx"),
      route("add", "routes/shopping-lists/add.tsx"),
      route(":id", "routes/shopping-lists/show.tsx"),
      route(":id/edit", "routes/shopping-lists/edit.tsx"),
      ...prefix(
        "items",
        [
          route("add", "routes/shopping-list-items/add.tsx"),
        ]
      ),
      ...prefix(
        ":id/items",
        [
          route("", "routes/shopping-list-items/list.tsx"),
          route(":itemId", "routes/shopping-list-items/show.tsx"),
          route(":itemId/edit", "routes/shopping-list-items/edit.tsx"),
        ]
      ),
    ]
  ),
  route("/shopping-items", "routes/shopping-items/list.tsx")
] satisfies RouteConfig;
