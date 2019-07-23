<?php

namespace app\dashboard\controller;

use think\App;
use think\facade\Validate;

class Api extends Base
{
    const STATUS_AVAILABLE = 1; // 可用
    const STATUS_DISABLED = 0; // 不可用
    const DEFAULT_ORDER_COL = 'id';
    const DEFAULT_ORDER_RUL = 'desc';

    private $apiModel;

    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->apiModel = new \app\dashboard\model\Api();
    }

    /**
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function index()
    {
        $db = $this->apiModel;
        $db ->where('status', self::STATUS_AVAILABLE);
        $res = $db->select();
        return json([
            'code' => 0,
            'data' => $res
        ]);
    }

    /**
     * @return \think\response\Json
     */
    public function indexWithCondition()
    {
        $db = $this->apiModel;
        $condition['name'] = input('name');
        $condition['path'] = input('path');
        $condition['status'] = input('status');

        if ($condition['name']) $db->where('name', $condition['name']);
        if ($condition['path']) $db->where('path', $condition['path']);
        if ($condition['status']) $db->where('path', $condition['status']);

        $sortRule['sort_col'] = input('sort_col');
        $sortRule['sort_rul'] = input('sort_rul');
        if ($sortRule['sort_col']) {
            $db->order($sortRule['sort_col'], $sortRule['sort_rul']);
        } else {
            $db->order(self::DEFAULT_ORDER_COL, self::DEFAULT_ORDER_RUL);
        }

        $res = $db->select();

        return json([
            'code' => 0,
            'data' => $res
        ]);
    }

    /**
     * @return \think\response\Json
     * @throws \think\exception\DbException
     */
    public function pagination()
    {

        $db = $this->apiModel->order(self::DEFAULT_ORDER_COL, self::DEFAULT_ORDER_RUL);
        $res = $db ->paginate();
        return json([
            'code' => 0,
            'data' => $res
        ]);
    }

    public function paginationWithCondition()
    {
        $db = $this->apiModel;

        $condition['name'] = input('name');
        $condition['path'] = input('path');
        $condition['status'] = input('status');

        if ($condition['name']) $db->where('name', $condition['name']);
        if ($condition['path']) $db->where('path', $condition['path']);
        if ($condition['status']) $db->where('path', $condition['status']);

        $sortRule['sort_col'] = input('sort_col');
        $sortRule['sort_rul'] = input('sort_rul');
        if ($sortRule['sort_col']) {
            $db->order($sortRule['sort_col'], $sortRule['sort_rul']);
        } else {
            $db->order(self::DEFAULT_ORDER_COL, self::DEFAULT_ORDER_RUL);
        }

        $res =$db->paginate();

        return json([
            'code' => 0,
            'data' => $res
        ]);
    }

    public function add()
    {
        $validate = Validate::make([
            'name' => 'require|max:25',
            'path' => 'require|max:100'
        ], [
            'name.require' => '名称必须',
            'name.max' => '名称最多不能超过25个字符',
            'path.require' => '路径必须',
            'path.max' => '路径最多不能超过100个字符',
        ]);

        $data = [
            'name' => input('name'),
            'path' => input('path')
        ];
        if (!$validate->check($data)) {
            return json([
                'code' => 200,
                'msg' => $validate->getError()
            ]);
        }

        $res = $this->apiModel->save($data);
        $insertId = $this->apiModel->id;

        if($res) {
            return json([
                'code' => 0,
                'msg' => '添加成功',
                'data' => [
                    'id' => $insertId
                ]
            ]);
        } else {
            return json([
                'code' => 200,
                'msg' => '新增数据失败'
            ]);
        }
    }

    public function editById()
    {
        $id = input('id');

        $validate = Validate::make([
            'name' => 'require|max:25',
            'path' => 'require|max:100'
        ], [
            'name.require' => '名称必须',
            'name.max' => '名称最多不能超过25个字符',
            'path.require' => '路径必须',
            'path.max' => '路径最多不能超过100个字符',
        ]);

        $data = [
            'name' => input('name'),
            'path' => input('path')
        ];
        if (!$validate->check($data)) {
            return json([
                'code' => 200,
                'msg' => $validate->getError()
            ]);
        }

        $res = $this->apiModel->save($data, ['id' => $id]);

        if($res) {
            return json([
                'code' => 0,
                'msg' => '编辑成功',
                'data' => [
                    'id' => $id
                ]
            ]);
        } else {
            return json([
                'code' => 200,
                'msg' => '编辑数据失败'
            ]);
        }
    }

    /**
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function del()
    {
        $id = input('id');
        $res = $this->apiModel->where('id', $id)->delete();

        if($res) {
            return json([
                'code' => 0,
                'msg' => '删除成功',
            ]);
        } else {
            return json([
                'code' => 200,
                'msg' => '删除失败'
            ]);
        }
    }
}
