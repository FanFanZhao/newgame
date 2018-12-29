<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">

            <span v-show="tpwd=='1'">修改资金密码</span>
            <span v-show="tpwd=='0'">设置资金密码</span>
        </p>
        <div class="drawing_main">
        	<!-- <div class="logo">
        		<img src="../../assets/imgs/mima.png">
        	</div> -->
            <Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
                <FormItem prop="mobile">
                    <Input v-model="formTop.mobile" disabled placeholder="手机号"></Input>
                </FormItem>
                <FormItem prop="code">
                    <Input v-model="formTop.code" placeholder="短信验证码">
                        <div class="yanzhan" slot="append">
                            <div @click="VerificationCode()">{{btnCode.time}}</div>
                        </div>
                    </Input>
                </FormItem>
                <FormItem prop="tpwd">
                    <Input v-model="formTop.tpwd" type="password" placeholder="8-12位字母数字组合密码"></Input>
                </FormItem>
                <FormItem prop="tpwd1">
                    <Input v-model="formTop.tpwd1" type="password" placeholder="确定密码"></Input>
                </FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Button type="primary" :loading="modal_loading" @click="del">确定</Button>
		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
    	props:['Statevalue'],
        data () {
            var _this = this;
            var mobile = (rule, value, callback) => {
                if(!_this.$public.checkMobile(value)) {
                    return callback(new Error('请输入有效的手机号'));
                } else {
                    callback();
                };
            };
            var code = (rule, value, callback) => {
                if(!_this.$public.code(value)) {
                    return callback(new Error('验证码格式有误'));
                } else {
                    callback();
                };
            };
            var validateopwd = (rule, value, callback) => {
                if(!_this.$public.pwd(value)) {
                    callback(new Error('请输入有效的密码'));
                } else {
                    callback();
                };
            };
            var validateopwd2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));//请再次输入密码
                } else if(value !== _this.formTop.tpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                };
            };
            return {
                modal_loading: false,
                modal2:false,
                single:true,
                formTop: {
                    mobile: '',
                    code: '',
                    tpwd: '',
                    tpwd1:"",
                },
                rules2:{
                    mobile: [{
                        validator: mobile,
                        trigger: 'blur'
                    }],
                    code: [{
                        validator: code,
                        trigger: 'blur'
                    }],
                    tpwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    tpwd1: [{
                        validator: validateopwd2,
                        trigger: 'blur'
                    }],
                },
                btnCode: {
                    time: "获取验证码", //倒计时
                    disabled: true,
                },
                timesetInterval:"",//倒计时函数
                tpwd:null,
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.getdata();
                if(!val){
                    for (var k in _this.formTop) {
                        _this.formTop[k]='';
                    }
                }
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
                _this.btnCode.time = "获取验证码";
                _this.btnCode.disabled = true;
                clearInterval(_this.timesetInterval);
                _this.$public.wipedata(_this.formTop);
        		_this.$emit('modifyfun');
        	},
            del(){
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        _this.modal_loading = true;
                        _this.formTop.account = localStorage.account;
                        _this.formTop.token = localStorage.token;
                        _this.$http.post(_this.$http.resettpwd,_this.formTop).then(function(response) {
                            _this.modal_loading = false;
                            if(response.data.status == "200") {
                                if (_this.tpwd == 1) {
                                    _this.$Message.success("修改成功！");
                                } else {
                                    _this.$Message.success("设置成功！");
                                }
                                _this.$public.wipedata(_this.formTop);
                                _this.modal2 = false;
                                _this.$emit('modifyfun');
                                window.setTimeout(function(){
                                    window.location.href = "index.html"
                                },1000)
                            } else {
                                _this.$Message.warning(response.data.msg);
                            }
                        }).catch(function(error) {});
                    }else {
                        return false;
                    }
                });
            },
            getdata(){
                var _this = this;
                let account =  localStorage.account;
                let token = localStorage.token;
                if(account || token){
                    _this.$http.post(_this.$http.userinfo).then(function(response) {
                        if(response.data.status == "200") {
                            _this.formTop.mobile = response.data.data.list[0].mobile;
                            if(response.data.data.has_tpwd){
                                _this.tpwd='1';
                            }else{
                                 _this.tpwd='0';
                            }
                            _this.$forceUpdate();
                        };
                    }).catch(function(error) {});
                };
            },
            VerificationCode(){
                var _this = this;
                if(_this.btnCode.disabled){
                    if(!_this.$public.checkMobile(_this.formTop.mobile)){
                        _this.$Message.warning('请输入有效的手机号');
                        return false;
                    };
                    let _data = {
                        mobile:_this.formTop.mobile,
                        type:"3",
                    };
                    _this.btnCode.disabled = false;
                    $.post(_this.$http.sendsms,_data,function(result){
                        if(result.status == "200"){
                            var i = 60;
                            _this.mobile = _this.formTop.mobile;
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
                        };
                    })
                };
            },
            yanzhanmatpe(){
                var _this = this;
                clearInterval(_this.timesetInterval);
                _this.btnCode.time = "重新获取";
                _this.btnCode.disabled = true;
            },
        },
        created:function(){
            const _this=this;
            _this.getdata();
        },
        mounted(){}
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/drawing/index.vue