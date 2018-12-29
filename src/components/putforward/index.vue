<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>提币</span>
        </p>
        <div class="login_main">
            <Form :model="formTop" label-position="top" :rules="rules2" ref="formTop">
      				<FormItem label="可用">
      					<Input readonly v-model="canUse" placeholder="0.000 USDT" type="text">
      					</Input>
      				</FormItem>
      				<FormItem id="go-address" label="提币地址" prop="address">
      					<Input v-model="formTop.address" placeholder="输入或长按粘贴地址" type="text">
      					</Input>
      					<div class="go-address" @click="goAddress">
      						<img class="address-img" src="../../assets/imgs/goaddress.png" alt="">
      					</div>
      				</FormItem>
      				<FormItem label="提币数量" prop="amount">
      					<Input v-model="formTop.amount" placeholder="请输入提币数量" type="text">
      						<span slot="append" class="yanzhan" @click="putAll">全部</span>
      					</Input>
      					<div class="put-amount">可提现数量{{canUse}} USDT</div>
      				</FormItem>
      				<FormItem label="交易密码" prop="psw">
      					<Input v-model="formTop.psw" placeholder="请输入交易密码" type="password">
      					</Input>
      				</FormItem>
  		        <FormItem label="手机验证码" prop="yanzhengma">
  		            <Input v-model="formTop.yanzhengma" placeholder="请输入手机短信验证码" type="text">
  		            	<div class="yanzhan" slot="append" >
  		            		<div @click="VerificationCode">{{btnCode.time}}</div>
  		            	</div>
  		            </Input>
  		        </FormItem>
  		    </Form>
  		    <div class="login_footer">
  		    	<Button type="primary" :loading="modal_loading" @click="putSuccess">提币</Button>
  		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue','getAddList'],
        data () {
    	    let _this = this;
          var validateopwd = (rule, value, callback) => {
            if(!_this.$public.pwd(value)) {
              callback(new Error('请输入有效的提现密码'));
            } else {
              callback();
            };
          };
          var validateopwd1 = (rule, value, callback) => {
            if(value == '') {
              callback(new Error('请输入提币地址'));
            } else {
              callback();
            };
          };
          var validateopwd2 = (rule, value, callback) => {
            if(!_this.$public.code(value)) {
              return callback(new Error('验证码格式有误'));
            } else {
              callback();
            };
          };
          var validateopwd3 = (rule, value, callback) => {
            if(value == '') {
              callback(new Error('请输入提币数量'));
            } else{
              callback();
			      }
          };
          return {
    				canUse:'',//可用
    				minAmount:'',//最小提现数量
    				mulAmount:'',//提现倍数
    				modal_loading: false,
    				modal2:false,
            moneyType: '',
    				formTop: {
    					yanzhengma: '',
    					psw: '',
    					amount: '',
    					address:''
    				},
          	btnCode: {
            	time: "获取验证码", //倒计时
            	disabled: true,
          	},
			  	  userMobile:'',
            rules2:{
              address: [{
                validator: validateopwd1,
                trigger: 'blur'
              }],
              amount: [{
                validator: validateopwd3,
                trigger: 'blur'
              }],
              psw: [{
                validator: validateopwd,
                trigger: 'blur'
              }],
              yanzhengma: [{
                validator: validateopwd2,
                trigger: 'blur'
              }],
            },
          }
        },
        watch: {
        	'Statevalue':function(val,oval){
            let _this = this;
    				_this.modal2 = val;
    				_this.getUsdtData();
            _this.formTop.address = this.getAddList;
            _this.moneyType = window.localStorage.currency;
			    },
        },
        methods: {
          goAddress(){//进入钱包地址列表页
            this.modal2 = false;
    				this.$emit('Otherfunctions','15')
    			},
          putAll(){
    				this.formTop.amount = this.canUse;
    			},
          VerificationCode(){//获取短信验证码
            var _this = this;
            if(localStorage.userMobileGet){
              _this.userMobile = localStorage.userMobileGet;
              if(_this.btnCode.disabled){
                let _data = {
                  mobile:_this.userMobile,
                  type:"3",
                };
                _this.btnCode.disabled = false;
                $.post(_this.$http.sendsms,_data,function(result){
                  if(result.status == "200"){
                    var i = 60;
                    _this.$Message.success("短信验证码已发送，请注意查收！");
                    _this.timesetInterval = window.setInterval(function(){
                      _this.btnCode.time = "重新获取(" + i +")";
                      i--;
                      if(i < 0){
                        _this.yanzhanmatpe();
                      }
                    },1000)
                  }else {
                    _this.$Message.warning(result.msg);
                  }
                })
              }
  			    }
          },
          yanzhanmatpe(){
            var _this = this;
            clearInterval(_this.timesetInterval);
            _this.btnCode.time = "重新获取";
            _this.btnCode.disabled = true;
          },
	  	    getUsdtData(){
        	  let _this = this;
            _this.$http.post(_this.$http.userinfo).then(function(response) {
              if(response.data.status == "200") {
                _this.canUse = response.data.data.balance_cny;
              }else if(response.data.status == "0"){
                _this.canUse = 0;
              }
            }).catch(function(error) {});
		      },
          putSuccess(){
            let _this = this;
            _this.$refs['formTop'].validate((valid) => {
              if(valid){
                let _data = {
                  address:_this.formTop.address,
                  price:_this.formTop.amount,
                  tpwd:_this.formTop.psw,
                  code:_this.formTop.yanzhengma
                };
                _this.modal_loading = true;
                _this.$http.post(_this.$http.tixian,_data).then(function(response){
                  if(response.data.status == 200){
                      _this.modal_loading = false;
                      _this.$Message.success(response.data.msg);
                      _this.modal2 = false;
                      _this.$emit('modifyfun');
                      _this.$public.wipedata(_this.formTop)
                  }else{
                      _this.modal_loading = false;
                      _this.$Message.error(response.data.msg);
	                }
                })
              }
            })
			    },
        	Callback(){
        		var _this = this;
                _this.modal2 = false;
        		_this.$emit('modifyfun');
        	}
        },
        mounted(){
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';

	//提币地址图标样式
	#go-address{
		position:relative;
		.go-address{
			cursor:pointer;
			position:absolute;
			right:0;
			top:0;
			height: 100%;
			width:30px;
			.address-img{
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				width:20px;
			}
		}
	}
</style>



// WEBPACK FOOTER //
// src/components/putforward/index.vue