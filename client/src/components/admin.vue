<template>
  <div>
    <div class="mv_bg_head">
      <el-date-picker
          v-model="time"
          type="daterange"
          @change="timeChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-button  @click="exportExcel" style="margin-left: 20px;" size="medium" type="success">导出</el-button>
    </div>
    <el-table
      :data="tableData"
      id="rebateSetTable"
      height="500"
      border
      style="width: 80%; margin: 0 auto;">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="提交时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.time)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        time: '',
        tableData: []
      }
    },
    mounted () {
      this.getData();
    },
    methods: {
      getData () {
        let params = {
          startTime: null,
          endTime: null
        };
        if (this.time) {
          params.startTime = this.time[0];
          params.endTime = this.time[1];
        }
        this.axios.get('http://118.25.36.60:8081/userInfo', {params}).then(res => {
          if (res) {
            this.tableData = res.data.data;
          }
        })
      },
      exportExcel () {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户数据.xlsx');
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      },
      formatDate (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') {
        if (!iDate) { return ''; }
        let dDate = new Date(iDate);
        let year = dDate.getFullYear();// 年
        let month = dDate.getMonth() + 1;// 月
        if (month < 10) { month = '0' + month; }
        let date = dDate.getDate();// 日
        if (date < 10) { date = '0' + date; }
        let hour = dDate.getHours();// 时
        if (hour < 10) { hour = '0' + hour; }
        let minute = dDate.getMinutes();// 分
        if (minute < 10) { minute = '0' + minute; }
        let second = dDate.getSeconds();// 秒
        if (second < 10) { second = '0' + second; }
        let millisecond = dDate.getMilliseconds();// 毫秒
        if (sFormat.indexOf('yyyy') >= 0) { sFormat = sFormat.replace('yyyy', year + ''); }
        if (sFormat.indexOf('MM') >= 0) { sFormat = sFormat.replace('MM', month + ''); }
        if (sFormat.indexOf('dd') >= 0) { sFormat = sFormat.replace('dd', date + ''); }
        if (sFormat.indexOf('HH') >= 0) { sFormat = sFormat.replace('HH', hour + ''); }
        if (sFormat.indexOf('mm') >= 0) { sFormat = sFormat.replace('mm', minute + ''); }
        if (sFormat.indexOf('ss') >= 0) { sFormat = sFormat.replace('ss', second + ''); }
        if (sFormat.indexOf('SSS') >= 0) { sFormat = sFormat.replace('SSS', millisecond + ''); }
        return sFormat;
      },
      timeChange () {
        this.getData();
      }
    }
  }
</script>
<style scoped="scoped" lang="scss">
  .mv_bg_head {
    width: 100%;
    text-align: center;
    margin: 30px auto;
  }
</style>
