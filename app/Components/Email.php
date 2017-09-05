<?php

namespace App\Components;

class Email {

    public static function sendInvitation($options) {
        $options['logo_url'] = url('/images/logo.png');
        $options['support_email'] = \Illuminate\Support\Facades\Config::get('Constants.site_email');
        $data = self::prepareData($options, false);
         \App\Components\BackgroundTasks::trigger('email:send', ['data' => $data], ['to_back' => false]);
    }

   
    public static function prepareData($options = [], $encode = true) {
        $data = [
            'from' => isset($options['from']) ? $options['from'] : 'Trusted Parents <' . \Illuminate\Support\Facades\Config::get('Constants.site_email') . '>',
            'to' => $options['to'],
            'template_data' => $options['template_data'],
            'template_id' => self::getTemplateId(debug_backtrace()[1]['function'])
        ];
        if ($encode) {
            return "'" . json_encode($data) . "'";
        }
        return $data;
    }

}
