<?php

namespace app\dashboard\model;

use think\facade\Config;
use think\Model;

class Employee extends Model
{

    protected $insert = ['uuid', 'status' => 1];
    protected $readonly = ['id', 'uuid'];

    protected function setUuidAttr()
    {
        $res = $this->query('SELECT UUID() as uuid');
        $uuid = substr($res[0]['uuid'], 24, 12)
            .substr($res[0]['uuid'], 19, 4)
            .substr($res[0]['uuid'], 14, 4)
            .substr($res[0]['uuid'], 9, 4)
            .substr($res[0]['uuid'], 0, 8);
        return ($uuid);
    }
}
