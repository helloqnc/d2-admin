<?php
namespace app\dashboard\controller;

use think\App;
use think\Controller;

class Base extends Controller
{
    public function __construct(App $app = null)
    {
        parent::__construct($app);
    }
}
