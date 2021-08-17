<template>
  <div class="home">
    <div class="left">
      <el-tree accordion :data="Category" :props="defaultProps" @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div class="wrap">
          <span>{{ node.label }}</span>
          <span class="id">[ID:{{ data.id }}]</span>
        </div>
        <span v-if="item.id == data.id && item.type == data.type">
          <el-button
              type="text"
              size="mini"
              @click.stop="update(data)">
            编辑
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click.stop="remove(data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
    <div class="right">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="产品标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/request";

export default {
  data(){
    return{
      form:new Object(),
      update_info:new Object(),
      item:new Object({
        type:null,
        id:null
      }),
      product:[],
      Category: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.get_Category()
  },
  methods: {
    async get_Category(){
      const {Category} = await request({url:"/Category",method:"post",data:{general:true}})
      this.Category = Category
    },
    async get_product(id){
      const {product} = await request({url:"/product",method:"post",data:{category_id:id}})
      this.product = product
    },
    async update(data){
      this.setId(data.id,data.type)
      this.update_info = data
      this.$prompt('请输入类目名称', '类目修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:this.update_info.title,
      }).then(({ value }) => {
        delete this.update_info.children
        this.update_info.title = value
        request({url:"/update_category",method:"post",data:this.update_info}).then((h) => {
          this.get_Category()
          this.$notify({
            title: '类目修改提醒',
            message: (`已成功将类目修改为[${value}]`)
          })
        })
      })
    },
    async remove(data){
      this.setId(data.id,data.type)
      const yes = await this.showConfirm()
      if(yes){
        await request({url:"/delete_category",method:"delete",data:this.item})
        this.get_Category()
        this.$notify({
          title: '类目删除提醒',
          message: (`已超过将[${data.title}]从列表移除`)
        });
      }
    },
    handleNodeClick(data) {
      if(data.type == 3){
        if(data.id !== this.item.id){
          this.get_product(data.id)
        }
      }
      this.setId(data.id,data.type)
    },
    showConfirm(){
      return new Promise((resolve, reject) => {
        this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消删除',
          type: 'warning'
        }).then(() => resolve(true)).catch(() => {
          resolve(false)
        })
      })
    },
    setId(id,type){
      this.item.id = id
      this.item.type = type
    }
  }
}
</script>

<style scoped lang="less">
.el-button{
  padding-right: 10px;
}
.el-tree{
  border: 1px solid #ebeef5!important;
  border-radius: 10px;
  padding: 10px 10px 20px 10px;
}
.home{
  display: flex;
  height: 100%;
  padding: 20px 10px;
  background: #fff;
  .left{
  }
  .right{
    flex: 2!important;
  }
  .left,.right{
    flex: 1.5;
    padding: 10px 10px;
    height: 100%;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .wrap{
    .id{
      padding-left: 5px;
      font-size: 12px;
    }
  }
}
</style>