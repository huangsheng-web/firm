<template>
  <div class="mv_main" style="padding-bottom: 40px;">
    <div class="mv_head">
      <img src="../assets/banner12.png" alt="">
    </div>
    <div class="mv_body">
      <div class="mv_b1">
        <div class="mv_b1_tab">
          <span :class="{'active': curTab === index}" v-for="(item, index) in tabList" :key="item.id" @click="tabTip(item, index)">
            {{item}}
          </span>
        </div>
        <div class="mv_b1_btn">
          <el-input v-model="message" :placeholder="'请输入您要查询' + curName + '的名称'"></el-input>
          <el-button style="float: right;" @click="putInfo"  type="primary">立即查询</el-button>
          <p style="color: red;">*本平台仅针对影视平台、项目查询，不支持其他任何信息查询</p>
        </div>
      </div>
      <div class="mv_b2">
        <div class="mv_b2_tab">
          <span>平台项目查询</span>
          <span>广电总局备案</span>
          <span>电影拍摄进度</span>
          <span>平台项目报告</span>
        </div>
        <div class="mv_b2_content">
          <div>
            <img src="../assets/yunpingtai.png" alt="">
            <h3>覆盖全面</h3>
            <p>涵盖院线网剧等多种类项目项目</p>
          </div>
          <div>
            <img src="../assets/quanweirenzheng.png" alt="">
            <h3>覆盖全面</h3>
            <p>拥有多项影视项目平台数据库，深度挖掘项目正规性</p>
          </div>
          <div>
            <img src="../assets/dashuju.png" alt="">
            <h3>覆盖全面</h3>
            <p>整合多平台投诉数据联动</p>
          </div>
          <div>
            <img src="../assets/fankui1.png" alt="">
            <h3>覆盖全面</h3>
            <p>及时反馈查询结果，保证时效性</p>
          </div>
        </div>
      </div>
      <div class="mv_b3">
        <h2>动态实时查询</h2>
        <div class="mv_b3_box">
          <div id="scrollItem">
            <p v-for="item in sList" :key="item.id">
              <span v-for="sItem in item" :key="sItem.id">{{changeStr(sItem.phone)}}  《{{sItem.name}}》</span>
            </p>
            <!--<p><span>156****6126  《末路变奏曲》</span><span>156****6326  《伍子胥传奇》</span></p>-->
            <!--<p><span>138****6832  《再见少年》</span><span>156****6226  《海上茉莉》</span></p>-->
            <!--<p><span>176****5933  《90雄斌》</span><span>175****5796  《小城故事》</span></p>-->
            <!--<p><span>175****5696  《爱情出击》</span><span>176****5933  《90雄斌》</span></p>-->
            <!--<p><span>156****6126  《末路变奏曲》</span><span>175****5696  《遇见环市路》</span></p>-->
            <!--<p><span>175****5696  《爱情出击》</span><span>175****5696  《小城故事》</span></p>-->
            <!--<p><span>175****5796  《小城故事》</span><span>175****5646  《遇见环市路》</span></p>-->
            <!--<p><span>138****6632  《爵迹2》</span><span>138****6032  《乱东京》</span></p>-->
            <!--<p><span>138****6132  《七月之后》</span><span>156****6226  《海上茉莉》</span></p>-->
            <!--<p><span>156****6126  《末路变奏曲》</span><span>156****6326  《伍子胥传奇》</span></p>-->
            <!--<p><span>138****6832  《再见少年》</span><span>156****6226  《海上茉莉》</span></p>-->
            <!--<p><span>176****5933  《90雄斌》</span><span>175****5796  《小城故事》</span></p>-->
            <!--<p><span>175****5696  《爱情出击》</span><span>176****5933  《90雄斌》</span></p>-->
            <!--<p><span>156****6126  《末路变奏曲》</span><span>175****5696  《遇见环市路》</span></p>-->
            <!--<p><span>175****5696  《爱情出击》</span><span>175****5696  《小城故事》</span></p>-->
          </div>
        </div>
      </div>
      <div class="mv_b4">
        <h3 style="color: #f42338;">选择正规项目，远离非法平台</h3>
        <p style="color: #999999;">中国影视项目项目查询服务中心，坚决打击项目欺诈违法平台</p>
        <p style="color: #ffffff;">版权所有@ 沪ICP备19012074 <a href="http://www.qianyuys.com/" target="_blank" style="color: #409EFF;">关于我们</a></p>
      </div>
    </div>
    <el-dialog
      title="正在查询对比，请稍后..."
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="600px">
      <el-progress :percentage="percent" :status="status"></el-progress>
    </el-dialog>
    <el-dialog
      title="系统查询完成，等待获取结果..."
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="600px">
      <el-dialog
        width="200px"
        title="提交成功"
        :visible.sync="innerVisible"
        append-to-body>
        <el-button style="margin-left: 50px;" type="primary" @click="finishIt">确定</el-button>
      </el-dialog>
      <p style="color: #a94442; text-align: center">请确保该号码真实有效，否则无法获取查询结果</p>
      <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="margin-top: 30px;">
        <el-form-item prop="phone">
          <el-input v-model="formInline.phone" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="formInline.name" placeholder="称呼"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {startMove} from '../assets/duogongneng'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (value) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        }
      } else {
        return callback(new Error('手机号码不能为空'))
      }
      callback();
    };
    return {
      tabList: ['平台查询','影片查询','出品方查询', '其他查询'],
      sList: [
//        {phone: '15039392239', name: '粉红色'},
//        {phone: '15039392239', name: '粉红色'},
//        {phone: '15039392239', name: '粉红色'},
//        {phone: '15039392239', name: '粉红色'},
//        {phone: '15039392239', name: '粉红色'}
      ],
      curTab: 0,
      curName: '平台',
      dialog1: false,
      dialog2: false,
      percent: 0,
      status: 'exception',
      timer: null,
      formInline: {
        phone: '',
        name: ''
      },
      rules: {
        name: [{required: true, message: '称呼不能为空', trigger: blur}],
        phone: [{validator: checkPhone, trigger: blur}]
      },
      innerVisible: false,
      message: ''
    }
  },
  mounted () {
    this.getInfoList();
    this.scrollList();
  },
  methods: {
    getInfoList () {
      this.sList = [];
      this.axios.get('http://118.25.36.60:8081/getInfoList')
        .then(res => {
          if (res) {
            for (let i = 0; i < res.data.data.length; i = i+ 2) {
              let arr = [];
              if (res.data.data[i]) {
                arr.push(res.data.data[i])
              }
              if (res.data.data[i + 1]) {
                arr.push(res.data.data[i + 1])
              }
              this.sList.push(arr)
            }
          }
        })
    },
    scrollList () {
      let obj = document.getElementById('scrollItem');
      if (obj.clientHeight > 210) {
        let h = 210 - obj.clientHeight;
        startMove(document.getElementById('scrollItem'), {'top': h}, () => {
          document.getElementById('scrollItem').style.top = 0;
          this.scrollList();
        })
      }
    },
    tabTip (item, index) {
      this.curTab = index;
      this.curName = item;
    },
    putInfo () {
      if (this.message === '') {
        return this.$message.warning('您没有输入需要查询的名称')
      }
      this.dialog1 = true;
      this.timer = setInterval(() => {
        if (this.percent >= 100) {
          this.status = 'success';
          clearInterval(this.timer);
          setTimeout(()=> {
            this.dialog1 = false;
            this.status = 'exception';
            this.percent = 0;
            this.dialog2 = true;
          }, 500)
        } else {
          this.percent += 10;
        }
      }, 100)
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.innerVisible = true;
          let time = new Date();
          this.formInline.time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + '-' + time.getMinutes() + '-' + time.getSeconds();
          this.axios.post('http://118.25.36.60:8081/userInfo', this.formInline)
            .then(res => {
              if (res) {
                console.log(res)
              }
            })
        } else {
          return false;
        }
      });
    },
    finishIt () {
      this.innerVisible = false;
      this.dialog2 = false;
      this.formInline.name = ''
      this.formInline.phone = ''
    },
    changeStr (str) {
      let s = str.slice(0, 3) + '****' + str.slice(7, 11)
      return s;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .mv_main {
    background: #000D2C;
  }
  .mv_head {
    width: 100%;
    height: auto;
  }
  .mv_head img {
    width: 100%;
    height: auto;
  }
  .mv_b1_btn {
    width: 940px;
    margin: 0 auto;
    margin-top: -2px;
  }
  .mv_b1_tab {
    width: 940px;
    margin: 0 auto;
    display: flex;
  }
  .mv_b1_tab {
    span {
      display: block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
    }
    .active {
      background: #ffffff;
      color: #000D2C;
      font-weight: bold;
    }
  }
  .mv_b1_btn > div {
    width: calc(100% - 110px);
  }
  .mv_b2 {
    .mv_b2_tab {
      width: 600px;
      margin: 0 auto;
      display: flex;
      margin-top: 40px;
      > span {
        display: block;
        width: 25%;
        color: #ffffff;
        text-align: center;
        &:after {
          content: '|';
          color: #ffffff;
          float: right;
        }
        &:last-child {
          &:after {
            content: '';
          }
        }
      }
    }
    .mv_b2_content {
      width: 1000px;
      height: auto;
      margin: 0 auto;
      margin-top: 40px;
      display: flex;
      >div {
        width: 25%;
        text-align: center;
        color: #ffffff;
        >h3 {
          font-weight: normal;
          margin: 20px 0 10px 0;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  .mv_b3{
    width: 1000px;
    height: auto;
    padding: 20px 40px;
    background: #ffffff;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
    h2 {
      color: #004A9C;
      font-size: 30px;
      padding-bottom: 10px;
    }
    .mv_b3_box {
      height: 210px;
      overflow: hidden;
      font-size: 20px;
      position: relative;
      > div {
        position: absolute;
        padding-left: 266px;
        p{
          display: flex;
          span {
            display: block;
            width: 300px;
            text-align: left;
          }
        }
      }
    }
  }
  .mv_b4 {
    width: 1000px;
    margin: 0 auto;
    margin-top: 60px;
    line-height: 50px;
    text-align: center;
  }
</style>
