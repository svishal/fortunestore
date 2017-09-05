<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait Rest {

    private static $authorized_user = null;

    /**
     * Determines if request is an api call.
     *
     * If the request URI contains '/api/v'.
     *
     * @param Request $request
     * @return bool
     */
    protected function isApiCall(Request $request) {
        return strpos($request->getUri(), '/api/v') !== false;
    }

    public static function getAuthorizedUser() {
        if (!is_null(self::$authorized_user)) {
            return self::$authorized_user;
        }
        return false;
    }

    public static function setAuthorizedUser($user) {
        return self::$authorized_user = $user;
    }

}
