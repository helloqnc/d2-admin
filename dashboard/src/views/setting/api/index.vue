<template>
  <d2-container>
    <template slot="header">
      筛选
    </template>
    <d2-crud
            ref="d2Crud"
            :columns="columns"
            :data="data"
            :form-options="formOptions"
            add-title="新增"
            :add-template="formTemplate"
            @row-add="handleRowAdd"
            :rowHandle="rowHandle"
            edit-title="编辑"
            :edit-template="formTemplate"
            @row-edit="handleRowEdit"
            @row-remove="handleRowRemove"
            @dialog-cancel="handleDialogCancel"
            :loading="loading"
            :pagination="pagination"
            @pagination-current-change="paginationCurrentChange">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { ApiPagination, ApiAdd, ApiEditById, ApiDelById } from '@/api/setting.api'
export default {
  name: 'employeeGroup',
  data () {
    return {
      columns: [
        {
          title: '#',
          key: 'id'
        },
        {
          title: '接口',
          key: 'name'
        },
        {
          title: '地址',
          key: 'path'
        }
      ],
      data: [],
      rowHandle: {
        columnHeader: '操作',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
          show (index, row) {
            return true
          },
          disabled (index, row) {
            return false
          }
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            return true
          },
          disabled (index, row) {
            return false
          }
        }
      },
      options: {
        stripe: true
      },
      formTemplate: {
        name: {
          title: '接口',
          value: '',
          component: {
            span: 22
          }
        },
        path: {
          title: '路径',
          value: '',
          component: {
            span: 22
          }
        }
      },
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData: function () {
      this.loading = true
      ApiPagination({
        page: this.pagination.currentPage
      })
        .then(res => {
          this.loading = false
          this.data = res.data
          this.pagination.pageSize = parseInt(res.per_page)
          this.pagination.total = parseInt(res.total)
          this.pagination.currentPage = parseInt(res.current_page)
        })
        .catch(err => {
          this.loading = false
          console.log('err', err)
        })
    },
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      // 向服务器发送新增请求
      ApiAdd({
        ...row
      })
        .then(res => {
          console.log(res)
          this.formOptions.saveLoading = false
          done({
            ...res
          })
        })
        .catch(err => {
          this.formOptions.saveLoading = false
          console.log('err', err)
        })
    },
    handleDialogCancel (done) {
      done()
    },
    handleRowEdit (row, done) {
      this.formOptions.saveLoading = true
      // 向服务器发送新增请求
      ApiEditById({
        ...row.row
      })
        .then(res => {
          this.formOptions.saveLoading = false
          done({
            ...res
          })
        })
        .catch(err => {
          this.formOptions.saveLoading = false
          console.log('err', err)
        })
    },
    handleRowRemove (row, done) {
      this.formOptions.saveLoading = true
      // 向服务器发送新增请求
      ApiDelById({
        id: row.row.id
      })
        .then(res => {
          this.formOptions.saveLoading = false
          done({
            ...res
          })
        })
        .catch(err => {
          this.formOptions.saveLoading = false
          console.log('err', err)
        })
    }
  }
}
</script>
