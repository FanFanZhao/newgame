<style lang="less">
    // @import '../../assets/public.less';
    // @import '../../assets/index.less';
    // @import '../../assets/ivewpublic.less';
	// @import 'help.less';
</style>
<template>
	<div class="help">
		<!--pc部分-->
		<div class="help_pc">
			<!--头部-->
			<div class="help_head">
				<p>帮助中心</p>
				<div>我们的客服团队时刻准备为您服务！ 您可以24/7全天候联系我们</div>
			</div>
			<!--头部-->
			<!--左侧边栏-->
			<ul class="help_left">
				<li @click="helpCurrentCon(helpRegAgree)" class="help_left_active">用户协议</li>
				<li @click="helpCurrentCon(helpWalletRule)">隐私政策</li>
				<li @click="helpCurrentCon(helpProblem)">常见问题</li>
				<li @click="helpCurrentCon(helpCost)">手续费</li>
                <li @click="helpCurrentCon(helpPassword)">忘记密码</li>
				<li @click="helpCurrentCon(helpLogin)">注册和登入</li>
				<li @click="helpCurrentCon(helpStrait)">技术问题</li>
				<li @click="helpCurrentCon(helpContact)">联系我们</li>
			</ul>
			<!--左侧边栏-->
			<!--内容-->
			<div class="help_right">
				<help-content v-bind:content="currentTab" :contentNor="currentNor"></help-content>
			</div>
			<!--内容-->
		</div>
		<!--pc部分-->
		<!--移动部分-->
		<div class="help_wrap">
            <div class="help_wrap_head">帮助中心</div>
            <p class="help_wrap_tip">我们的客服团队时刻准备为您服务！您可以24/7全天候
                联系我们</p>
            <Collapse id="scroll-mao" v-model="overFade" accordion @on-change="scrollTop">
                <Panel hide-arrow name="1">
                    用户协议
                    <div slot="content">
                        <div>
                            <help-content v-bind:content="helpRegAgree" :contentNor="currentNor"></help-content>
                        </div>
                    </div>
                    <!--<div slot="content"><help-content v-bind:content="testsss" :contentNor="currentNor"></help-content></div>-->
                </Panel>
                <Panel hide-arrow name="2">
                    隐私政策
                    <div slot="content">
                        <div>
                            <help-content :content="helpWalletRule" :contentNor="currentNor"></help-content>
                        </div>
                    </div>
                </Panel>
                <Panel hide-arrow name="3">
                    常见问题
                    <div slot="content">
                        <help-content :content="helpProblem" :contentNor="currentNor"></help-content>
                    </div>
                </Panel>
                <Panel hide-arrow name="4">
                    手续费
                    <div slot="content"><help-content :content="helpCost" :contentNor="currentNor"></help-content></div>
                </Panel>
                <Panel hide-arrow name="5">
                    忘记密码
                    <div slot="content"><help-content :content="helpPassword" :contentNor="currentNor"></help-content></div>
                </Panel>
                <Panel hide-arrow name="6">
                    注册和登录
                    <div slot="content"><help-content :content="helpLogin" :contentNor="currentNor"></help-content></div>
                </Panel>
                <Panel hide-arrow name="7">
                    技术问题
                    <div slot="content"><help-content :content="helpStrait" :contentNor="currentNor"></help-content></div>
                </Panel>
                <Panel hide-arrow name="8">
                    联系我们
                    <div slot="content"><help-content v-bind:content="helpContact" :contentNor="currentNor"></help-content></div>
                </Panel>
            </Collapse>
		</div>
        
		<!--移动部分-->
	</div>
</template>
<script>
    import helpContent from './helpContent.vue';
	export default {
        data() {
			return {
                a: "1",
                overFade:'2',
                helpContact:'',
                helpLogin:'',
                helpPassword:'',
                helpProblem:'',
                helpRegAgree:'',
                helpStrait:'',
                helpWalletRule:'',
                helpCost:'',
			  	currentTab:'',
                currentNor:true,
                testsss:'',
            }
		},
		methods: {
            scrollTop(){
                let scrollTop = $('#scroll-mao').offset().top;
                let headerHeight = $('.ivu-layout-header').height();
                $('html,body').animate({scrollTop: (Number(scrollTop)-Number(headerHeight))+'px'});
            },
            getData(){
                let _this = this;
                $.post(_this.$http.commondata, function(response) {
                    if(response.status == 200) {
                        let getDatas = response.data.help_info;
                        _this.helpContact = getDatas.contact;
                        // _this.helpLogin = getDatas.login.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;quot;/g,'');
                        _this.helpLogin = getDatas.login;
                        _this.helpPassword = getDatas.password;
                        _this.helpProblem = getDatas.problem;
                        _this.helpRegAgree = getDatas.reg_agree;
                        _this.helpStrait = getDatas.strait;
                        _this.helpWalletRule = getDatas.wallet_rule;
                        _this.helpCost = getDatas.cost;
                        _this.currentTab = _this.helpRegAgree;
                        _this.contentLineFade(_this.helpContact);
                        _this.contentLineFade(_this.helpLogin);
                        _this.contentLineFade(_this.helpPassword);
                        _this.contentLineFade(_this.helpProblem);
                        _this.contentLineFade(_this.helpStrait);
                        _this.contentLineFade(_this.helpWalletRule);
                        _this.contentLineFade(_this.helpCost);
                        _this.contentLineFade(_this.helpRegAgree);
                        _this.pcMessageShow(_this.overFade);
                    }
                })
            },
			helpCurrentCon(currentTab){
                //console.log(currentTab)
                let _this = this;
              $('.help_left li').removeClass('help_left_active');
              $(event.target).addClass('help_left_active');
                _this.contentLineFade(currentTab)
			},
            contentLineFade(currentContent){
                let _this = this;
                let contentBr = [];
                if(typeof currentContent == "object"){
                    for(let i = 0; i < currentContent.length; i++){
                        contentBr = currentContent[i].content.split('|');
                        currentContent[i].twoLevel = contentBr;
                        _this.currentNor = true;
                    }
                    _this.currentNor = true;
                }else{
                    _this.currentNor = false;
                }
                _this.currentTab = currentContent;
            },
            contentChange(){
                this.testsss = this.helpRegAgree;
            },
            // 电脑端显示
            pcMessageShow (id) {
                let _this = this;
                if (id == 2) {
                    $('.help_left li').removeClass('help_left_active');
                    $($('.help_left li')[1]).addClass('help_left_active');
                    _this.contentLineFade(_this.helpWalletRule);
                } else {
                    $('.help_left li').removeClass('help_left_active');
                    $($('.help_left li')[0]).addClass('help_left_active');
                    _this.contentLineFade(_this.helpRegAgree);
                }
            }
        },
		mounted:function(){
            var _this = this;
            _this.getData();
            if(_this.$route.query.id){
                _this.overFade = _this.$route.query.id;
            }
        },
		components: {
            'helpContent':helpContent
		}
    }
</script>

