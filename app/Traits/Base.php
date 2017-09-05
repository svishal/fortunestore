<?php

namespace App\Traits;


trait Base {

    /**
     * @codeCoverageIgnore
     */
    public static function findByCondition($conditions = [], $withs = [], $query_options = []) {
        $conditions_array = [];
        if (count($conditions)) {
            foreach ($conditions as $key => $val) {
                if ($key === 'search') {
                    $search_key = key($val);
                    $conditions_search_array[$search_key] = $val[$search_key];
                } elseif ($key === 'not') {
                    $search_key = key($val);
                    $condition_not[$search_key] = $val[$search_key];
                } else {
                    $conditions_array[$key] = $val;
                }
            }
        }
        /**
         * @codeCoverageIgnoreStart
         */
        $query = self::where($conditions_array);
        if (isset($conditions_search_array)) {

            foreach ($conditions_search_array as $search_key => $search_value) {
                $query->where($search_key, 'ilike', '%' . $search_value . '%');
            }
        }

        /**
         *  @codeCoverageIgnoreEnd
         */
        if (isset($condition_not)) {

            foreach ($condition_not as $search_key => $search_value) {
                $query->where($search_key, '!=', $search_value);
            }
        }

        if (isset($withs) && !empty($withs)) {
            foreach ($withs as $with) {
                $query = $query->with($with);
            }
        }

        /**
         *  @codeCoverageIgnoreStart
         */
        if (isset($query_options['order_by'])) {
            $query->orderBy($query_options['order_by'][0], $query_options['order_by'][1]);
        }
        if (isset($query_options['page_size'])) {
            $result = $query->paginate($query_options['page_size']);
        } else {
            $result = $query->get();
        }

        /**
         *  @codeCoverageIgnoreEnd
         */
        return $result;
    }
}