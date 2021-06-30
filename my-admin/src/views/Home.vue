<template>
  <div class="wrap">
    <div class="tab_content">
      <div class="radio">
        <el-radio-group @change="changeRadio" v-model="radio1" size="small">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="已删除"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row>
        <el-button type="primary" size="small" @click="dialogFormVisible=true">添加地址</el-button>
      </el-row>
    </div>
    <div class="tabbel">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="company_name"
            label="名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="time"
            label="营业时间段"
            width="180">
        </el-table-column>
        <el-table-column
            prop="longitude"
            label="地理经度"
            width="180">
        </el-table-column>
        <el-table-column
            prop="latitude"
            label="地理纬度"
            width="180">
        </el-table-column>
        <el-table-column
            prop="company_detailed"
            label="详细地址"
            width="300">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="增加地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.company_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.company_detailed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业时间段" :label-width="formLabelWidth">
          <span class="time_item">
            <el-time-select
                placeholder="开始时间"
                v-model="form.start_time"
                :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'}">
            </el-time-select>
          </span>
          <span class="time_item">
            <el-time-select
                placeholder="结束时间"
                v-model="form.close_time"
                :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: form.start_time
            }">
            </el-time-select>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      radio1: '全部',
      tableData: [],
      dialogFormVisible:false,
      formLabelWidth: '120px',
      form: {
        company_name: '',
        company_detailed:'',
        start_time: '',
        close_time: ''
      },
    }
  },
  methods:{
    submit(){
      console.log(this.form)
    },
    changeRadio(){
      console.log(this.radio1);
    },
    async get_address(){
      const list = await this.$http({url:"/address",method:"POST",body:{name:123}})
      if(list.data.code == 200){
        this.tableData = list.data.address
        console.log(this.tableData)
      }
    }
  },
  created() {
    this.get_address()
  }
}
</script>

<style lang="less">
.tab_content{
  width: 100%;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
.radio{}
}
.tabbel{
  padding: 10px 0;
}
.time_item{
  margin-right: 10px;
}
</style>
