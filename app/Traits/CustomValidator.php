<?php

namespace App\Traits;

use Validator;

trait CustomValidator {

    private $errors = [];

    public static function getValidationRules() {
        if (isset(static::$_rules) && count(static::$_rules)) {
            return static::$_rules;
        }
        return [];
    }

    public static function validate($data) {
        $rules = self::getValidationRules();
        if (count($rules)) {
            $validator = Validator::make($data, $rules);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                foreach ($errors as $field_name => $message) {
                    $error_messages[$field_name] = $message[0];
                }
                return $error_messages;
            }
        }
        return true;
    }
    public function validateObject($options = []) {
        $rules = self::getValidationRules();
        if (count($rules)) {
            foreach ($rules as $key => $value) {
                if ($this->id && is_array($value) === false && strpos($value, 'unique:') !== false) {
                    $tableName = $this->getTable();
                    $newRule = "unique:{$tableName},{$key},{$this->id}";
                    $newValue = str_replace("unique:{$tableName}", $newRule, $value);
                    $rules[$key] = $newValue;
                } 
            }
            
            $object_data = $this->attributes;
            $validator = Validator::make($object_data, $rules);
            if ($validator->fails()) {
                $errors = $validator->errors()->toArray();
                foreach ($errors as $field_name => $message) {
                    $error_messages[$field_name] = $message[0];
                }
                $this->errors = $error_messages;
                return false;
            }
        }
        return true;
    }
 
    public function getErrors() {
        return $this->errors;
    }
 
    public function setError($key, $message) {
        $this->errors[$key] = $message;
    }

    
}