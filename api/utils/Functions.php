<?php

namespace utils;

class Functions
{
    public static function verifyRequestValues($values): void
    {
        foreach ($values as $key => $value) {
            if (!$value) {
                response()->json([
                    "message" => "Missing $key",
                    "status" => 400
                ], 400);
                return;
            }
        }
    }
}
