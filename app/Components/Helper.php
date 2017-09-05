<?php

namespace App\Components;

class Helper {

    public static function url($url, $params = []) {
        return url($url, params, env('APP_SSL'));
    }

}
