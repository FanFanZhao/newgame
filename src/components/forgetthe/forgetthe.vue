<template>
	<Modal id="login" v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>忘记密码</span>
        </p>
        <div class="login_main">
        	<!-- <div class="logo">
        		<img src="../../assets/imgs/mima.png">
        	</div> -->
            <Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
		        <FormItem prop="mobile">
		            <Input v-model="formTop.mobile" placeholder="手机号"></Input>
		        </FormItem>
		        <!-- <FormItem prop="vcode">
		            <Input v-model="formTop.vcode" placeholder="验证码">
		            	<div class="yanzhan" slot="append">
		            		<div id="v_container1" style="width: 90px;height: 30px;"></div>
		            	</div>
		            </Input>
		        </FormItem> -->
                <FormItem prop="code">
                    <Input v-model="formTop.code" placeholder="短信验证码">
                        <div class="yanzhan" slot="append">
                            <div @click="VerificationCode()">{{btnCode.time}}</div>
                        </div>
                    </Input>
                </FormItem>
                <FormItem prop="opwd">
                    <Input v-model="formTop.opwd" type="password" placeholder="密码（8-12位字母数字组合密码）"></Input>
                </FormItem>
                <FormItem prop="topwd">
                    <Input v-model="formTop.topwd" type="password" placeholder="请再次输入新密码"></Input>
                </FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Button type="primary" :loading="modal_loading" @click="register">确定</Button>
		    	<p class="forget-login" @click="login">登录</p>
		    </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    import $ from 'jquery'  //加载jquery
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
                } else if(value !== _this.formTop.opwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                };
            };
            return {
                modal_loading: false,
                modal2:false,
                single:true,
                verifyCode:"",
                formTop: {
                    mobile: '',
                    vcode: '',
                    code: '',
                    opwd: '',
                    topwd: '',
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
                    opwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    topwd: [{
                        validator: validateopwd2,
                        trigger: 'blur'
                    }],
                },
                btnCode: {
                    time: "获取验证码", //倒计时
                    disabled: true,
                },
                timesetInterval:"",//倒计时函数
                mobile:"",//存储手机号
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.$public.wipedata(_this.formTop);
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
                _this.yanzhanmatpe();
        	},
            register(){//忘记密码
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        if(_this.mobile != _this.formTop.mobile){
                           _this.$Message.warning('短信验证码错误！');
                            return false;
                        };
                        let _data = {
                            mobile:_this.formTop.mobile,
                            code:_this.formTop.code,
                            opwd:_this.formTop.opwd,
                            opwd1:_this.formTop.topwd
                        };
                        _this.modal_loading = true;
                        $.post(_this.$http.resetopwd,_data,function(result){
                            _this.modal_loading = false;
                            if(result.status == "200"){
                                _this.$Message.success("修改成功，请登录！");
                                _this.modal2 = false;
                                _this.$emit('modifyfun');
                            }else {
                                _this.$Message.warning(result.msg);
                            };
                        });
                    }else {
                        return false;
                    }
                });
                _this.yanzhanmatpe();
            },
            VerificationCode(){
                var _this = this;
                if(_this.btnCode.disabled){
                    if(!_this.$public.checkMobile(_this.formTop.mobile)){
                        _this.$Message.warning('请输入有效的手机号');
                        return false;
                    };
                    // if(!_this.verifyCode.validate(_this.formTop.vcode)){
                    //     _this.$Message.warning('图形验证码错误！');
                    //     return false;
                    // };
                    _this.btnCode.disabled = false;
                    let _data = {
                        mobile:_this.formTop.mobile,
                        type:"2",
                    };
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
                _this.btnCode.time = "获取验证码";
                _this.btnCode.disabled = true;
            },
            login(){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','4');
            },
        },
        mounted(){
        	var _this = this;
            // _this.verifyCode = new GVerify("v_container1");
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
    #login{
        .login_main{
            .logo{
                height: 200px !important;
                img{
                    width:86px !important;
                }
            }
        }
    }

    @media screen and (max-width: 768px){
        #login{
            .login_main{
                .logo{
                    height: 33.7vw !important;
                    img{
                        width:17.7vw !important;
                    }
                }
            }
        }

    }
</style>



// WEBPACK FOOTER //
// src/components/forgetthe/forgetthe.vue