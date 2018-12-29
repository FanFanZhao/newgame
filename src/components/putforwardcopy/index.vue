<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>提现</span>
        </p>
        <div class="login_main">
            <Form :model="formTop" label-position="top">
                <FormItem label="可用">
                    <Input readonly v-model="canUse"></Input>
                </FormItem>
		        <FormItem label="提现方式" prop="type">
		            <Select v-model="formTop.type" @on-change="putWay">
                        <Option v-for="(item,index) in payList" :value="item.type" :key="index">{{ item.label }}</Option>
                    </Select>
		        </FormItem>
                <FormItem label="提现账号">
                    <Input readonly v-model="formTop.address"></Input>
                </FormItem>
		        <FormItem label="提现金额(CNY)" prop="price">
		            <Input :placeholder="'请输入提现金额，不可小于'+min+',且为'+beishu+'的倍数'" v-model="formTop.price"></Input>
                    <div>可提现数量{{Number(canUse).toFixed(2)}} CNY</div>
		        </FormItem>
		        <FormItem label="提现密码" prop="tpwd">
		            <Input placeholder="提现密码" type="password" v-model="formTop.tpwd">
		            	<div class="yanzhan" slot="append" >
		            		<div @click="tixianChange">忘记密码</div>
		            	</div>
		            </Input>
		        </FormItem>
                <FormItem label="手机验证码" prop="code">
                    <Input v-model="formTop.code" placeholder="请输入手机短信验证码" type="text">
                        <div class="yanzhan" slot="append" >
                            <div @click="VerificationCode">{{btnCode.time}}</div>
                        </div>
                    </Input>
                </FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Button type="primary" :loading="modal_loading" @click="putSuccess">确定</Button>
		    	<p><span>提现说明：</span>提现到账需要2-6小时左右，如遇特殊情况（网络拥堵、大额提现等）会延迟，还望理解！我们保证提现最终都会成功</p>
		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            return {
            	payList:[],
                modal_loading: false,
                modal2:false,
                formTop: {
                    code: '',
                    address: '',
                    price: '',
                    tpwd: '',
                    type: ''
                },
                userMobile: '',
                btnCode: {
                    time: "获取验证码", //倒计时
                    disabled: true,
                },
                canUse: 0,
                min:'',
                beishu:'',
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
                let _this = this;
				_this.modal2 = val;
                if(val){
                    _this.getdata();
                    _this.Getpaymentmethod();
                    _this.getlimits();
                }else{
                    for (var k in _this.formTop) {
                        _this.formTop[k]='';
                    }
                }
			},
        },
        methods: {
            // 选择支付方式
            tixianChange(){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','13');
			},
            putWay(val){
                const _this=this;
                for (var i = 0; i < _this.payList.length; i++) {
                    if(val==_this.payList[i].type){
                        _this.formTop.address=_this.payList[i].value;
                    }
                }
            },
            putSuccess(){
                const _this = this;
                if(!_this.formTop.address){
                    _this.$Message.error('提现账号不能为空');
                    return false;
                }if(!_this.formTop.price){
                    _this.$Message.error('提现数量不能为空');
                    return false;
                }if(_this.formTop.price<_this.min){
                    _this.$Message.error('提现数量不能小于'+_this.min);
                    return false;
                }if((_this.formTop.price%_this.beishu)!=0){
                    _this.$Message.error('提现数量应满足'+_this.min+'的倍数');
                    return false;
                }if(Number(_this.formTop.price)>Number(_this.canUse)){
                    _this.$Message.error('提现数量应小于可用数量'+_this.canUse);
                    return false;
                }if(_this.formTop.tpwd==''){
                    _this.$Message.error('提现密码不能为空');
                    return false;
                }if(_this.formTop.code==''){
                    _this.$Message.error('手机验证码不能为空');
                    return false;
                }
                let _data = _this.formTop;
				_this.$http.post(_this.$http.tixiancny,_data).then(function(response){
				    if(response.data.status == 200){
                        _this.$Message.success(response.data.msg);
                        _this.modal2 = false;
                        _this.$emit('modifyfun');
					}else if(response.data.status == 0){
                        _this.$Message.error(response.data.msg);
					}else{
                        _this.$Message.error(response.data.msg);
					}
				})
			},
            getlimits(){
                const _this=this;
                _this.$http.post(_this.$http.ct_data,{}).then(function(res){
                    if(res.data.status=='200'){
                        _this.min=res.data.data.min_t;
                        _this.beishu=res.data.data.beishu_t;
                    }
                })
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
                            clearInterval(_this.timesetInterval);
                            _this.btnCode.disabled = true;
                            _this.btnCode.time = "重新获取";
                          }
                        },1000)
                      }else {
                        _this.$Message.warning(result.msg);
                        _this.btnCode.disabled = true;
                      }
                    })
                  }
                }
            },
        	Callback(){
        		var _this = this;
                _this.modal2 = false;
        		_this.$emit('modifyfun');
        	},
            Getpaymentmethod(){//获取支付方式
                let _this = this;
                _this.$http.post(_this.$http.editpayway).then(function(response){
                  if(response.data.status == 200){
                    _this.payList=[];
                    if (response.data.data.alicard) {
                        _this.putPayList(response.data.data.alicard, '1', '支付宝');
                    }
                    // if (response.data.data.wxcard) {
                    //     _this.putPayList(response.data.data.wxcard, '2', '微信');
                    // }
                    if (response.data.data.bankcard) {
                        _this.putPayList(response.data.data.bankcard, '3', response.data.data.branch);
                    }
                  }else{
                    _this.$Message.warning('您还没有添加提现方式，请先添加提现方式');
                    // setTimeout(function(){
                    //     _this.modal2 = false;
                    //     _this.$emit('modifyfun');
                    // },1000)
                  }
                })
            },
            putPayList (num, type, name){
                let _this = this;
                let obj = {
                    value: num,
                    type: type,
                    label: name
                }
                _this.payList.push(obj);
            },
            getdata(){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                if(account || token){
                    _this.$http.post(_this.$http.userinfo).then(function(response) {
                        if(response.data.status == "200") {
                            _this.canUse = response.data.data.balance_usdt;
                        }
                    }).catch(function(error) {});
                };
            }
        },
        mounted(){
        	var _this = this;
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/putforwardcopy/index.vue