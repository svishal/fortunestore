<?php

namespace App\Components;

class Message {

    private static $error_messages_mapping = [
        01 => 'Authorization error. Phone number and password combination does not match',
        02 => 'User does not exist',
        03 => 'Status is inactive, Please contact to admin'

    ];

    private static $success_messages_mapping = [
     01 => 'User logged in Successfully',
     02 => 'Data returned Successfully',
     03 => 'Saved data Successfully'
    ];

    public static function getMessageFromCode($error_code){
        return self::$error_messages_mapping[$error_code];
    }

    public static function getSuccessMessage($code){
    return self::$success_messages_mapping[$code];	
    }
}