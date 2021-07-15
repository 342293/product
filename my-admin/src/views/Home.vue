<template>
  <div class="home">
    <el-button type="button" @click="dialogFormVisible = true">添加产品</el-button>

    <el-dialog title="添加产品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="产品描述" label-width="120px">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" label-width="120px">
          <div class="select_content">
            <div class="select_item" v-for="(item,index) in form.product_pic" :key="index">
              <img :src="item.url" alt="" />
            </div>
            <div class="upload_box" @click="dialogVisible = true">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消发布</el-button>
        <el-button type="primary" @click="Determine_dialog">发布产品</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="产品相册"
        :visible.sync="dialogVisible"
        width="70%">
        <div class="pic_content">
          <div class="pic_item" @click="SetIndex(index)" v-for="(item,index) in upload_list" :key="index">
            <img :src="item.url" alt="" />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
       </span>
    </el-dialog>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="产品描述"
          width="auto">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column
          prop="create_time"
          label="发布时间"
          width="120">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="deleteSelection">删除选中</el-button>
    </div>


  </div>
</template>

<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.select_content{
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .select_item{
    width: 100px;
    height: 100px;
    border-radius: 6px;
    border: 1px solid #eee;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .upload_box{
    width: 100px;
    height: 100px;
    cursor: pointer;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    background: #fbfdff;
    &:hover{
      border: 1px dashed #409eff;
    }
  }
}
.el-dialog__title{
  font-size: 15px!important;
}

.pic_content{
  display: grid;
  height: auto;
  grid-gap: 10px;
  overflow: auto;
  grid-template-columns: repeat(10,1fr);
  .pic_item{
    width: 100%;
    height: 100px;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 5px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
.upload_content{
  width: 100%;
  height: 500px;
}
</style>

<script>
export default {
  data(){
    return {
      tableData: [],
      multipleSelection:[],
      dialogVisible: false,
      dialogFormVisible: false,
      upload_list:[],
      upload_Index:[],
      form: {
        product_pic:[],
      },
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async deleteSelection(){
      let id = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        id.push(this.multipleSelection[i].id)
      }
      if(id.length <= 0){
        this.$message('请选中删除列')
        return ;
      }else{
        const result = await this.$http({url:"/delete_product",method:"delete",data:{id}})
        if(result.code == 200){
          this.$message(result.message)
          for (let i = 0; i < id.length; i++) {
            const index = this.tableData.findIndex(n => n.id == id[i])
            this.tableData.splice(index,1)
          }
        }
      }
    },


    async get_product(){
      const result = await this.$http({url:"/product"})
      if(result.code == 200){
        this.tableData = result.product
      }
    },
    async Determine_dialog(){
      const result = await this.$http({url:"/upload_product",method:"POST",data:this.form})
      this.$message(result.message);
      if(result.code == 200){
        this.upload_Index = []
        this.form = {}
        this.dialogFormVisible = false
      }
    },
    async get_album(){
      const album = await this.$http({ url:"/album" })
      this.upload_list = album.album_list
    },
    SetIndex(index){
      if(this.upload_Index[index] == index){
        this.upload_Index.splice(index,1)
        const id = this.upload_list[index].id
        const inx = this.form.product_pic.findIndex(i => i.id == id)
      }else{
        this.upload_Index[index] = index
        this.form.product_pic.push(this.upload_list[index])
      }
    }
  },
  created() {
    this.get_album()
    this.get_product()
  }
}
</script>