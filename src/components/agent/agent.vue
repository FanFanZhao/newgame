<style lang="less">
    // @import '../../assets/public.less';
	// @import '../../assets/index.less';
	// @import '../../assets/ivewpublic.less';
	// @import 'agent.less';
</style>
<template>
	<div class="agent">
		<!--pc端-->
		<div class="agent_pc">
			<!--左侧边栏-->
			<ul class="agent_left">
				<li class="agent_left_head">全民代理</li>
				<li :class="" @click="tabShowChange('agent-plan',agentPlan)" class="agent_left_current">代理计划</li>
				<li class="childParent" @click="tabShowChange('help-content',agentTerms)">代理条款</li>
				<li :class="" @click="tabShowChange('help-content',agentCommission)">佣金规则</li>
			</ul>
			<!--左侧边栏-->
			<!--内容-->
			<div class="agent_right">
				<agent-plan :is="currentTab" v-bind:content="getContent" :contentNor="currentNor" :agentIncome="agentIncome" @getChildRead="getReadChild" :popular="popular"></agent-plan>
			</div>
			<!--内容-->
		</div>
		<!--pc端-->
		<!--移动端-->
		<div class="agent_wap">
			<div class="agent_wap_head">全民代理</div>
			<Collapse id="aent-scroll-top" v-model="collapse" accordion @on-change="scrollTop()">
				<Panel name="1" hide-arrow>
					代理计划
					<div slot="content">
						<div class="agent_wap_content">
							<p class="agent_right_head">全民代理千千万</p>
							<p class="agent_right_p">申请成为平台代理，推广其他玩家来玩游戏</p>
							<p class="agent_right_tip">无论玩家输赢，均可获得高额佣金</p>
							<p class="agent_right_p1">基于竞猜游戏，希望与值得信赖的伙伴开展合作，凭借高达{{totalIncome}}左右的收益分成，这将是您获得稳定流量收益的最佳工具</p>
							<div v-if="agentApplyOr == '0'" class="agent-apply-close">
								<div class="agent_apply_lose">申请失败!</div>
								<div class="agent_apply_why">失败原因：{{agentCloseWhy}}</div>
								<Button><router-link to="./agentapply">重新申请</router-link></Button>
							</div>
							<div v-else-if="agentApplyOr == '1'" class="agent_right_button">
								<Button @click="doSave">保存代理卡</Button>
								<Button @click="doCopy">复制代理链接</Button>
								<Button @click="goAgent" class="button_active">进入代理系统</Button>
							</div>
                            <div v-else-if="agentApplyOr == '2'" class="agent_shenhe">正在审核中...</div>
							<div v-else class="agent_right_button">
								<Button><router-link to="./agentapply">申请代理商</router-link></Button>
							</div>
						</div>
						<div class="agent_right_line"></div>
						<div class="agent_wrap_adva">
							<div class="virtue_head">爆发者的优点 </div>
							<ul class="virtue_content">
								<li>
									<img src="../../assets/imgs/gongping.png" alt="">
									<p>公平、公正</p>
									<div>爆发者提供竞猜游戏，让玩家玩得放心</div>
								</li>
								<li>
									<img src="../../assets/imgs/jisuanji.png" alt="">
									<p>佣金高达{{totalIncome}}</p>
									<div>我们优秀的代理计划，可以让您获得高达{{totalIncome}}的收益</div>
								</li>
								<li>
									<img src="../../assets/imgs/baoxiang.png" alt="">
									<p>收益稳定</p>
									<div>我们的收益是抽取用户竞猜流水，每月结算</div>
								</li>
								<li>
									<img src="../../assets/imgs/sanjiagent.png" alt="">
									<p>三级代理</p>
									<div>不只是您推荐的玩家有佣金，玩家推荐的玩家你也会获得额外的佣金，一共有三级</div>
								</li>
								<li>
									<img src="../../assets/imgs/duliboss.png" alt="">
									<p>独立BOSS系统</p>
									<div>针对每个代理商，会给予独立的BOSS系统进行数据统计和管理</div>
								</li>
								<li>
									<img src="../../assets/imgs/duligame.png" alt="">
									<p>独立游戏域名</p>
									<div>我们可以根据代理商单独要求，给予独立游戏域名</div>
								</li>
							</ul>
						</div>
						<div class="agent_right_line"></div>
						<div class="agent_wrap_syste">
							<div class="system_head">佣金收益体系</div>
							<div class="system_img">
								<img src="../../assets/imgs/leve.png" alt="">
								<div class="system_a">
									<p>一级 <span>A</span></p>
									<div>一级指您自己推荐的玩家</div>
								</div>
								<div class="system_a system_b">
									<p>二级 <span>B</span></p>
									<div>二级指一级玩家推荐的玩家</div>
								</div>
								<div class="system_a system_c">
									<p>三级 <span>C</span></p>
									<div>三级指二级玩家推荐的玩家</div>
								</div>
							</div>
							<div class="system_example">
								<p class="system_example_bottom">举例：每级每人邀请100个用户，每个用户每天投注流水1FB，您的用户和收益如下：</p>
								<ul>
									<li>一级A：</li>
									<li>
										<p>用户数量={{agentIncome.one_user}}</p>
										<p>收益={{agentIncome.one_user}}*{{agentIncome.common1_income}}%*{{agentIncome.common2_income}}%*{{agentIncome.one_income}}%={{agentIncome.sumOneIncome}} FB</p>
									</li>
								</ul>
								<ul>
									<li>二级B：</li>
									<li>
										<p>用户数量={{agentIncome.two_user}}</p>
										<p>收益={{agentIncome.two_user}}*{{agentIncome.common1_income}}%*{{agentIncome.common2_income}}%*{{agentIncome.two_income}}%={{agentIncome.sumTwoIncome}} FB</p>
									</li>
								</ul>
								<ul class="system_example_bottom">
									<li>三级C：</li>
									<li>
										<p>用户数量={{agentIncome.three_user}}</p>
										<p>收益={{agentIncome.three_user}}*{{agentIncome.common1_income}}%*{{agentIncome.common2_income}}%*{{agentIncome.three_income}}%={{agentIncome.sumThreeIncome}} FB</p>
									</li>
								</ul>
								<p  class="system_example_bottom">您的总收益={{agentIncome.sumOneIncome}}+{{agentIncome.sumTwoIncome}}+{{agentIncome.sumThreeIncome}}={{agentIncome.allSumIncome}} FB</p>
								<p  class="system_example_bottom">如果每人竞猜额流水是5 FB、10 FB，在算算？而且这种收益零风险，非常稳定</p>
							</div>
						</div>
						<div class="agent_right_line"></div>
						<!--其他问题-->
						<div class="agent_wrap_other">
							<p class="other_head">您还有其他问题吗？</p>
							<div class="button_group">
								<Button @click="modalcontach1 = true">联系我们</Button>
								<Modal
									v-model="modalcontach1"
									title="请联系我们"
									class-name="touch-dialog"
								>
									<p>{{agentIncome.storeKf}}</p>
								</Modal>
								<Button type="text" @click="redAgentList">阅读代理条款</Button>
							</div>
						</div>
						<!--其他问题-->
					</div>
				</Panel>
				<Panel name="2" hide-arrow>
					代理条款
					<div slot="content"><help-content v-bind:content="agentTerms" :contentNor="currentNor"></help-content></div>
				</Panel>
				<Panel name="3" hide-arrow>
					佣金规则
					<div slot="content"><help-content v-bind:content="agentCommission" :contentNor="currentNor"></help-content></div>
				</Panel>
			</Collapse>
		</div>
		<!--移动端-->
	</div>
</template>
<script>
	import helpContent from '../help/helpContent';
    import agentPlan from './agentPlan';
	export default {
        data() {
			return {
                agentApplyOr:'2',
                modalcontach1:false,
                collapse: '1',
			  	agentTerms:'',
			  	agentCommission:'',
			  	agentPlan:'',
              	currentTab:'agent-plan',
              	getContent:'',
			  	agentIncome:{},
                currentNor:true,
                agentCloseWhy:'',
                popular:{
					popularUrl:'',
					popularQrc:'',
					popularBas:'',
				},
                totalIncome:'',
				isShowAgentGo:false
			}
		},
		methods: {
            scrollTop(){
                let scrollTop = $('#aent-scroll-top').offset().top;
                let headerHeight = $('.ivu-layout-header').height();
                $('html,body').animate({scrollTop: (Number(scrollTop)-Number(headerHeight))+'px'});
            },
            redAgentList:function(){
              let _this = this;
              _this.collapse = '2';
              _this.scrollTop();
			},
          	getReadChild:function(data){
              this.tabShowChange('help-content',this.agentTerms);
              $('.childParent').addClass('agent_left_current');
              $('html,body').animate({scrollTop: '0px'})
		  	},
          	goAgent:function(){
          	  	let _this = this;
          	  	if(localStorage.account && localStorage.token){
                    if(localStorage.Appinteractive){
                    	if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                    		// let hrefurl = _this.$http.base + "/index.html#/agentsystem?account=" + localStorage.account + "?token=" + localStorage.token;
                    		// let hrefurl = "http://192.168.1.201:8081" + "/index.html#/agentsystem?account=" + localStorage.account + "?token=" + localStorage.token;
                    		let hrefurl =  "http://"+window.location.host+"/web/index.html#/agentsystem?account=" + localStorage.account + "?token=" + localStorage.token;
	                        window.webkit.messageHandlers.enterDelegateSystem.postMessage(hrefurl);
	                    }else {
	                    	_this.$router.push("/agentsystem");
	                        // window.open(_this.$router.push("/agentsystem").href, '_blank');
	                    };
                    }else {
                    	// window.open(_this.$router.push("/agentsystem").href, '_blank');
                    	_this.$router.push("/agentsystem")
                    };
				}else{
                    _this.$Message.error('请先登录');
				};
          	},
            doCopy: function () {
                let _this=this;
                if(localStorage.account && localStorage.token){
                    _this.$copyText(_this.popular.popularUrl).then(function (e) {
                        _this.$Message.success('复制成功');
                    }, function (e) {
                        _this.$Message.error('复制失败');
                    })
				}else{
                    _this.$Message.error('请先登录');
				}
            },
			doSave:function(){
              	let _this = this;
            	if(localStorage.account && localStorage.token){
                    if(_this.popular.popularBas != ''){
                        if(localStorage.Appinteractive!='undefined'){
                        	if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
		                        window.webkit.messageHandlers.saveImage.postMessage(_this.popular.popularQrc);
		                    }else {
		                        bigboom.saveImg(_this.popular.popularQrc);
		                    };
                        }else {
                        	download(_this.popular.popularBas,'image.png');
                        };
                    };
				}else{
                	_this.$Message.error('请先登录');
            	}
			},
            getDataPopular:function(){
                let _this = this;
                _this.$http.post(_this.$http.popularlike).then(function(response) {
                    if(response.data.status == 200){
                        _this.popular.popularUrl = response.data.data.url;
                        _this.popular.popularQrc = response.data.data.qrc;
                      	_this.popular.popularBas = response.data.data.base64_img;
                    }
                }).catch(function(data){
                    //console.log(data);
				})
            },
          getData(){
            let _this = this;
            $.post(_this.$http.commondata,function(response) {
                if(response.status == 200) {
                    let getDatas = response.data.proxy_info;
                    _this.agentTerms = getDatas.terms;
                    _this.agentCommission = getDatas.commission;
                    _this.agentPlan = response.data.income_info;
                    _this.getContent = response.data.income_info;
                    _this.contentLineFade(_this.agentTerms);
                    _this.contentLineFade(_this.agentCommission);
                    let incomeInfoDatas = response.data.income_info;
                    let agentIncomObjec = {};
                    let agentIncomObjec1 = {};
                    for(let i in incomeInfoDatas){
                        agentIncomObjec[i] = incomeInfoDatas[i];
                        agentIncomObjec1[i] = _this.$public.Division(incomeInfoDatas[i],100);
                    }
                    let partIncome = _this.$public.Multiplication(agentIncomObjec1['common1_income'],agentIncomObjec1['common2_income'])
                    let sumOneIncome = _this.$public.Multiplication(agentIncomObjec1['one_user'],_this.$public.Multiplication(partIncome,agentIncomObjec1['one_income']))*100;
                    let sumTwoIncome = _this.$public.Multiplication(agentIncomObjec1['two_user'],_this.$public.Multiplication(partIncome,agentIncomObjec1['two_income']))*100;
                    let sumThreeIncome = _this.$public.Multiplication(agentIncomObjec1['three_user'],_this.$public.Multiplication(partIncome,agentIncomObjec1['three_income']))*100;
                    let allSumIncome = _this.$public.Addition(sumOneIncome,_this.$public.Addition(sumTwoIncome,sumThreeIncome));
                  	_this.totalIncome = _this.$public.Addition(_this.$public.Addition(response.data.income_info.one_income, response.data.income_info.two_income), response.data.income_info.three_income) + '%';
                    agentIncomObjec['sumOneIncome'] = sumOneIncome;
                    agentIncomObjec['sumTwoIncome'] = sumTwoIncome;
                    agentIncomObjec['sumThreeIncome'] = sumThreeIncome;
                    agentIncomObjec['allSumIncome'] = allSumIncome;
                  	agentIncomObjec['totalIncome'] = _this.totalIncome;
                    agentIncomObjec['storeKf'] = response.data.store_kf;
                    _this.agentIncome = agentIncomObjec;
                    //console.log('hahah',_this.agentIncome)
                }
            })
          },
          tabShowChange(currentTab,getContent){
              let _this = this;
			$('.agent_left li').removeClass('agent_left_current');
            $(event.target).addClass('agent_left_current');
              _this.currentTab = currentTab;
              _this.contentLineFade(getContent)
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
                _this.getContent = currentContent;
            }
		},
       mounted: function() {
          let _this = this;
          _this.getData();
           _this.$http.post(_this.$http.userinfo).then(function(response) {
               if(response.data.status == "200") {
                   _this.getDataPopular();
                   _this.isShowAgentGo = false;
                   let status = response.data.data.is_daili;
                   let content;
                   if(response.data.data.apply_info == null){
                       content = '';
                   }else{
                       content = response.data.data.apply_info;
                   }
                   if(status == 0){
                       if(content == ''){
                           _this.agentApplyOr = '3';
                       }else if(content.status == '1'){
                           _this.agentApplyOr = '2';
                       }else if(content.status == '3'){
                           _this.agentApplyOr = '0';
                           _this.agentCloseWhy = content.msg;
                       }
                   }else{
                       _this.agentApplyOr = '1';
                   }
               }
           }).catch(function(error) {});
           console.log(_this.popular)
		},
		components: {
          'helpContent':helpContent,
		  'AgentPlan':agentPlan
		}
    }
</script>


