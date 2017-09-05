<?php

namespace App\Components;

use App\User;
use Auth;

Class ApiAuthToken {

    public static function generate() {
        
        return bin2hex(openssl_random_pseudo_bytes(16));
    }

}
