<?php

namespace App\Components;

class Helper {

    public static function url($url, $params = []) {
        return url($url, params, env('APP_SSL'));
    }
    public static function isValidUUID($uuid) {
       return preg_match('/^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/i', $uuid);
   }
}
