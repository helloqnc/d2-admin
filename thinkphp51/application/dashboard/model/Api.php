<?php

namespace app\dashboard\model;

use think\Model;

class Api extends Model
{

    protected $insert = ['status' => 1];
    protected $readonly = ['id'];

}
