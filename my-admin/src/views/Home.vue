<template>
  <div class="home">
    <el-button type="button" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-button type="button" @click="dialogTableVisible = true">打开图库Dialog</el-button>

    <el-dialog title="添加产品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <div class="upload_box" @click="Open_upload"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Close_dialog">取 消</el-button>
        <el-button type="primary" @click="Determine_dialog">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <div class="pic_content">
        <div class="pic_item"
             :style="{color:(upload_Index[index] == index) ? 'red' : ''}"
             v-for="(item,index) in upload_list" :key="index" @click="SetIndex(index)">123456</div>
      </div>
    </el-dialog>

  </div>
</template>

<style lang="less">
.upload_box{
  width: 100px;
  height: 100px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  background: #fbfdff;
}
.el-dialog__wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-dialog{
  width: 100% !important;
  height: 100% !important;
  max-width: 70% !important;
  max-height: 70% !important;
  margin: 0!important;
}
.pic_content{
  display: grid;
  height: 100px;
  grid-gap: 10px;
  grid-template-columns: repeat(10,1fr);
  .pic_item{
    width: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    background: red;
  }
}
</style>

<script>
export default {
  data(){
    return {
      showProps:false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        ready_upload:[],
      },
      upload_list:{},
      upload_Index:[],
      formLabelWidth: '120px'
    }
  },
  methods:{
    Close_dialog(){
      this.dialogFormVisible = false
    },
    Determine_dialog(){
      console.log(this.form)
    },
    Open_upload(){
      console.log(123)
    },
    SetIndex(index){
      if(this.upload_Index[index] == index){
        this.upload_Index.splice(index,1)
        const id = this.upload_list[index].id
        const inx = this.form.ready_upload.findIndex(i => i.id == id)
        console.log(inx)
      }else{
        this.upload_Index[index] = index
        this.form.ready_upload.push(this.upload_list[index])
      }
    },
    async get_album(){
      const album = await this.$http({ url:"/album" })
      this.upload_list = album.album_list
    }
  },
  created() {
    this.get_album()
  }
}
</script>