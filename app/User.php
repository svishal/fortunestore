<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use \App\Traits\Base;
    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

    public static $_rules = [
        'password' => 'required:min:6',
        'email' => 'unique:users|regex:/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/'
    ];

    protected $temp_data = [];

    public function __construct(array $attributes = array()) {
        
                parent::__construct($attributes);
                if (count($attributes)) {
                    $this->setDataInternally($attributes);
                }
            }
        
            public function getIdAttribute($value) {
                return (string) $value;
            }
        
            /**
             * @codeCoverageIgnore
             */
            public function setData($data) {
                foreach ($data as $key => $value) {
                    $this->{$key} = $value;
                }
                
                $this->setDataInternally($data);
            }
        
            /**
             * @codeCoverageIgnore
             */
            public function setDataInternally($attributes = []) {

                if (isset($attributes['password'])) {
                    $this->password = \bcrypt($attributes['password']);
                }
                if (isset($attributes['email'])) {
                    $this->email = strtolower(trim($attributes['email']));
                }
                return true;
            }

            public function save(array $options = array()) {
                if (!$this->validateObject($options)) {
                    return false;
                }
                return parent::save($options);
            }
        
            public function validateObject($option = array()) {
                $result = $this->traitValidateObject($option);
                return $result;
            }
        
            
}
