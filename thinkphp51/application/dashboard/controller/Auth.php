<?php

namespace app\dashboard\controller;

use think\App;
use think\captcha\Captcha;
use think\Controller;
use think\Db;

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
    public function login() {
//        return json([
//            'code' => 100,
//            'msg' => '账号或密码错误'
//        ]);
//        throw new \think\exception\HttpException(401);
        $res = Db::name('employee')->find();
        return json([
            'code' => 0,
            'msg' => '登录成功',
            'data' => [
                'username' => 'test',
                'uuid' => $res['uuid'],
                'name' => '测试用户',
                'token' => 'testToken'
            ]
        ]);
    }
    public function test() {
        $data = [
            'account' => 'test'
        ];
        $userModel = new User();
        $userModel -> save($data);

    }
}
