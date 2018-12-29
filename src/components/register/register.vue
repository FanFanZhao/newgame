<template>
	<Modal v-model="modal2" @on-cancel="Callback()">
        <p slot="header">
            <span>注册</span>
        </p>
        <div class="login_main">
        	<div class="logo">
        		<img src="../../assets/imgs/loginlogo.png">
        	</div>
            <Form :model="formTop" ref="formTop" :rules="rules2" label-position="top">
		        <FormItem prop="realname">
		            <Input v-model="formTop.realname" placeholder="你的昵称"></Input>
		        </FormItem>
		        <FormItem prop="mobile">
		            <Input v-model="formTop.mobile" placeholder="手机号"></Input>
		        </FormItem>
		        <!-- <FormItem prop="vcode">
		            <Input v-model="formTop.vcode" placeholder="验证码">
		            	<div class="yanzhan" slot="append">
		            		<div id="v_container" style="width: 90px;height: 30px;"></div>
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
                <FormItem prop="tjuser">
                    <Input v-model="formTop.tjuser" placeholder="推荐码(此项非必填)" :disabled="disabled"></Input>
                </FormItem>
		    </Form>
		    <div class="login_footer">
		    	<Checkbox v-model="single">&nbsp;我同意收集<span class="biaozhu">爆发者</span>中的信息，我同意<span class="biaozhu" @click="navigator('help')">用户协议</span>和<span class="biaozhu" @click="navigator('help')">隐私政策</span>，并确认我至少<span class="biaozhu">18岁</span>或达到<span class="biaozhu">我所在管辖区</span>内规定的法定年龄，且对我适用的
允许法律我参加与网站上提供的游戏。</Checkbox>
		    	<Button type="primary" :loading="modal_loading" @click="register">注册</Button>
		    	<p class="regist-login" @click="login">登录</p>
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
            var realname =  (rule, value, callback) => {
                if(_this.$public.patternvalidate(value)) {
                    return callback(new Error('昵称不可以有特殊符号'));
                } else {
                    callback();
                };
            };
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
            var tjuser = (rule, value, callback) => {
                callback();
            };
            return {
                modal_loading: false,
                modal2:false,
                single:true,
                verifyCode:"",
                formTop: {
                    realname: '',
                    mobile: '',
                    vcode: '',
                    code: '',
                    opwd: '',
                    topwd: '',
                    tjuser:'',
                },
                rules2:{
                    realname: [{
                        validator: realname,
                        trigger: 'blur'
                    }],
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
                    tjuser: [{
                        validator: tjuser,
                        trigger: 'blur'
                    }]
                },
                btnCode: {
                    time: "获取验证码", //倒计时
                    disabled: true,
                },
                timesetInterval:"",//倒计时函数
                mobile:"",//存储手机号
                disabled:false,//推荐人是否可填
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
			},
        },
        methods: {
        	Callback(){
        		var _this = this;
        		_this.$emit('modifyfun');
                _this.modal_loading = false;
                _this.modal2 = false;
                _this.$public.wipedata(_this.formTop);
                _this.yanzhanmatpe();
        	},
            //跳转
            navigator(path){
                this.$router.push({//你需要接受路由的参数再跳转
                    path: path
                });
                this.$emit("modifyfun");
            },
            register(){//注册
            	var _this = this;
                _this.$refs['formTop'].validate((valid) => {
                    if(valid){
                        _this.modal_loading = true;
                        var reg=/^[a-zA-Z0-9\u4E00-\u9FA5]{1,20}$/;
                        if(_this.formTop.realname==''){
                            _this.$Message.warning('名字不能为空');
                            return false;
                        }if(!reg.test(_this.formTop.realname)){
                            _this.$Message.warning('名字不能包含特殊字符');
                            return false;
                        }if(_this.mobile != _this.formTop.mobile){
                           _this.$Message.warning('短信验证码错误！');
                            return false;
                        };
                        if(!_this.single){
                            _this.$Message.warning('请同意协议');
                            return false;
                        }
                        let _data = {
                            realname:_this.formTop.realname,
                            mobile:_this.formTop.mobile,
                            code:_this.formTop.code,
                            opwd:_this.formTop.opwd,
                            tjuser:_this.formTop.tjuser,
                        };
                        $.post(_this.$http.register,_data,function(result){
                            _this.modal_loading = false;
                            _this.modal2 = false;
                            // _this.$emit('modifyfun');
                            _this.yanzhanmatpe();
                            _this.$public.wipedata(_this.formTop);
                            if(result.status == "200"){
                                window.logins=1;
                                _this.$emit('modifyfun');
                                _this.$Message.success("注册成功，请登录！");
                            }else {
                                _this.$Message.warning(result.msg);
                            };
                        });
                    }else {
                        return false;
                    }
                });

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
                    let _data = {
                        mobile:_this.formTop.mobile,
                        type:"1",
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
            login(){
                var _this = this;
                _this.modal2 = false;
                _this.$emit('Otherfunctions','1');
                _this.$public.wipedata(_this.formTop);
            },
        },
        mounted(){
        	var _this = this;
            // _this.$public.codeImg('v_container');
            // _this.verifyCode = new GVerify("v_container");
            _this.formTop.realname = _this.$public.randomWord(false, 12);
            if(_this.$cookies.get('yqcode')){
                _this.formTop.tjuser=_this.$cookies.get('yqcode');
                _this.disabled=true;
            }
        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
</style>



// WEBPACK FOOTER //
// src/components/register/register.vue