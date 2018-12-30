<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>登录</span>
        </p>
        <div class="login_main">
        	<div class="logo">
        		<img src="../../assets/imgs/loginlogo.png">
        	</div>
            <Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
		        <FormItem prop="mobile">
		            <Input v-model="formTop.mobile" placeholder="请输入手机号"></Input>
		        </FormItem>
		        <FormItem prop="opwd">
		            <Input v-model="formTop.opwd" type="password" placeholder="请输入密码"></Input>
		        </FormItem>
		        <FormItem>
		            <Input v-model="formTop.vcode" placeholder="验证码">
		            	<div class="yanzhan" slot="append">
		            		<div id="v_container" style="width: 90px;height: 30px;"></div>
		            	</div>
		            </Input>
		        </FormItem>
		    </Form>
		    <div class="login_footer">
		    	<p @click="forgetthe">*忘记密码</p>
		    	<Button type="primary" :loading="modal_loading" @click="login">登录</Button>
		    	<p class="register-link" @click="register">注册</p>
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
            var validateopwd = (rule, value, callback) => {
                if(!_this.$public.pwd(value)) {
                    callback(new Error('请输入有效的密码'));
                } else {
                    callback();
                };
            };
            return {
                modal_loading: false,
                modal2:false,
                verifyCode:"",
                formTop: {
                    mobile: '',
                    vcode: '',
                    opwd: '',
                },
                rules2:{
                    mobile: [{
                        validator: mobile,
                        trigger: 'blur'
                    }],
                    opwd: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                },
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                _this.modal_loading = false;
			}
        },
        methods: {
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
                _this.$public.wipedata(_this.formTop);
        	},
            login(){
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        if(!_this.verifyCode.validate(_this.formTop.vcode)){
                            _this.$Message.warning('图形验证码错误！');
                            return false;
                        };
                        _this.modal_loading = true;
                        let _data = {
                            mobile:_this.formTop.mobile,
                            opwd:_this.formTop.opwd,
                        };
                        $.post(_this.$http.userlogin,_data,function(result){
                            _this.modal_loading = false;
                            if(result.status == "200"){
                                _this.$Message.success("登录成功");
                                localStorage.clear();
                                window.localStorage.account = result.data.account;
                                window.localStorage.token = result.data.token;
                                localStorage.userMobileGet = _this.formTop.mobile;
                                _this.$emit('modifyfun');
                                _this.$emit('Otherfunctions','100');
                                window.setTimeout(function(){
                                    window.location.href = "index.html";
                                },800)

                            }else {
                                _this.$Message.warning(result.msg);
                            };
                        });
                    }else {
                        return false;
                    }
                });
            },
            register(){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','2');
                _this.$public.wipedata(_this.formTop);
            },
            forgetthe(){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','3');
                _this.$public.wipedata(_this.formTop);
            }
        },
        mounted(){
        	var _this = this;
            _this.$public.codeImg('v_container');
            _this.verifyCode = new GVerify("v_container");
        }
    }
</script>
<style lang="less">
    // @import '../../assets/public.less';
    // @import './index.less';
</style>

