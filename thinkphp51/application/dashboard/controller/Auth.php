<?php

namespace app\dashboard\controller;

use think\App;
use think\captcha\Captcha;
use think\Controller;

class Auth extends Controller
{
    public function __construct(App $app = null)
    {
        parent::__construct($app);
    }

    public function captcha()
    {
        $config = [
            'fontSize' => 12,
            'length' => 4,
            'useNoise' => false,
            'useCurve' => true,
            'imageH' => 38,
            'imageW' => 90
        ];
        $captcha = new Captcha($config);
        return $captcha->entry();
    }
}
