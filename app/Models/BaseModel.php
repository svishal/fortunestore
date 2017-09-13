<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class BaseModel extends Model {

    use \App\Traits\CustomValidator {
        validateObject as protected traitValidateObject;
    }

    public $incrementing = false;
    protected $temp_data = null;
    public function __construct(array $attributes = array()) {

        parent::__construct($attributes);
        if (count($attributes)) {
            $this->setDataInternally($attributes);
        }
    }

    public function getTemp($key){
        return $this->temp_data[$key];
    }

    public function setTemp($key,$value){
        return $this->temp_data[$key] = $value;
    }

    public function validateObject($option = array()) {
        $result = $this->traitValidateObject($option);
        return $result;
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
    protected function setDataInternally(array $attributes = []) {
        // a parent placeholder so that no call get crash if not defined in model
        return true;
    }

    public function save(array $options = array()) {
        if (!$this->validateObject($options)) {
            return false;
        }
        return parent::save($options);
    }

    public function delete() {
        try {
            $self = $this;
            
            /**
             *@codeCoverageIgnoreStart
             */
            return DB::transaction(function() use ($self) {
                        if ($self->beforeDelete()) {
                            $deleted = parent::delete();
                            if ($deleted) {
                                $self->afterDelete();
                                DB::commit();
                                return true;
                            } else {
                                echo $this->id;
                            }
                        }
                        DB::rollback();
                        return false;
                    });
          /**
           * @codeCoverageIgnoreEnd
           */
        } catch (\Exception $e) {
            DB::rollback();
            return false;
        }
    }

    public function beforeDelete() {
        return true;
    }

    public function AfterDelete() {
        return true;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getName() {
        if (isset($this->name)) {
            return ucwords($this->name);
        }
    }

}