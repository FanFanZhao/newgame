<template>
    <div class="agent_right_plan">
        <p class="agent_right_head">全民代理千千万</p>
        <p class="agent_right_p">申请成为平台代理，推广其他玩家来玩游戏</p>
        <p class="agent_right_tip">无论玩家输赢，均可获得高���佣金</p>
        <p class="agent_right_p1">该竞猜游戏，希望与值得信赖的伙伴开展合作，凭借高达{{agentIncome.totalIncome}}左右的<br>收益分成，这将是您获得稳定流量收益的最佳工具</p>
        <div v-if="agentApplyOr1 == '0'" class="agent-apply-close">
            <div class="agent_apply_lose">申请失败!</div>
            <div class="agent_apply_why">失败原因：{{agentCloseWhy}}</div>
            <Button><router-link to="./agentapply">重新申请</router-link></Button>
        </div>
        <div v-else-if="agentApplyOr1 == '1'" class="agent_right_button">
            <Button @click="doSave">保存代理卡</Button>
            <Button @click="doCopy">复制代理链接</Button>
            <Button @click="goAgent" class="button_active">进入代理系统</Button>
        </div>
        <div v-else-if="agentApplyOr1 == '2'" class="agent_shenhe">正在审核中...</div>
        <div v-else class="agent_right_button">
            <Button><router-link to="./agentapply">申请代理商</router-link></Button>
        </div>
        <div class="agent_right_line"></div>
        <!--大爆炸的优点-->
        <div class="agent_right_virtue">
            <div class="virtue_head">爆发者的优点 </div>
            <ul class="virtue_content">
                <li>
                    <img src="../../assets/imgs/gongping.png" alt="">
                    <p>公平、公正</p>
                    <div>爆发者提供竞猜游戏，让玩家玩得放心</div>
                </li>
                <li>
                    <img src="../../assets/imgs/jisuanji.png" alt="">
                    <p>佣金高达{{agentIncome.totalIncome}}</p>
                    <div>我们优秀的代理计划，可以让您获得高达{{agentIncome.totalIncome}}的收益</div>
                </li>
                <li>
                    <img src="../../assets/imgs/baoxiang.png" alt="">
                    <p>收益稳定</p>
                    <div>我们的收益是抽取用户竞猜额流水，每月结算</div>
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
                    <div>我们可以根据代理商要求，给予独立游戏域名</div>
                </li>
            </ul>
        </div>
        <!--大爆炸的优点-->
        <div class="agent_right_line"></div>
        <!--佣金收益体系-->
        <div class="agent_right_system">
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
                <!--<p class="system_example_bottom">举例：每级每人邀请100个用户，每个用户每天投注流水1ETH，您的用户和收益如下：</p>-->
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
        <!--佣金收益体系-->
        <div class="agent_right_line"></div>
        <!--其他问题-->
        <div class="agent_right_other">
            <p class="other_head">您还有其他问题吗？</p>
            <Button @click="modalcontach = true">联系我们</Button>
            <Modal
                v-model="modalcontach"
                title="请联系我们"
                class-name="touch-dialog"
                >
                <p>{{agentIncome.storeKf}}</p>
            </Modal>
            <Button @click="sendParentRead">阅读代理条款</Button>
        </div>
        <!--其他问题-->
    </div>
</template>

<script>
  export default {
    name: 'agentPlan',
    props:['agentIncome','popular'],
      data(){
        return{
            modalcontach:false,
            agentApplyOr1:'3',
            agentCloseWhy:''
        }
      },
      methods:{
          sendParentRead:function(){
                this.$emit('getChildRead','otherRead')
          },
          goAgent:function(){
            var _this = this;
                if(localStorage.account && localStorage.token){
                    if(localStorage.Appinteractive){
                        if(localStorage.Appinteractive == "iOS"){//ios调用图片上传
                            alert(localStorage.Appinteractive+"321")
                            window.webkit.messageHandlers.enterDelegateSystem.postMessage(_this.$router.resolve("/agentsystem").href);
                        }else {
                            window.open(_this.$router.push("/agentsystem").href, '_blank');
                        };
                    }else {
                        window.open(_this.$router.push("/agentsystem").href, '_blank');
                    };
                }else{
                    _this.$Message.error('请先登录');
                };
          },
          doCopy: function () {
              let _this=this;
              if(localStorage.account && localStorage.token){
                  _this.$copyText(_this.popular.popularUrl).then(function (e) {
                      // _this.$toast.message('复制成功');
                      _this.$Message.success('复制成功');
                  }, function (e) {
                      // _this.$toast.message('复制失败');
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
                      download(_this.popular.popularBas,'image/png');
                  }
              }else{
                  _this.$Message.error('请先登录');
              }
          },
      },
      mounted:function(){
          let _this = this;
          _this.$http.post(_this.$http.userinfo).then(function(response) {
              if(response.data.status == "200") {
                  let status = response.data.data.is_daili;
                  let content;
                  if(response.data.data.apply_info == null){
                      content = '';
                  }else{
                      content = response.data.data.apply_info;
                  }
                  if(status == 0){
                      if(content == ''){
                          console.log(12)
                          _this.agentApplyOr1 = '3';
                      }else if(content.status == '1'){

                          _this.agentApplyOr1 = '2';
                      }else if(content.status == '3'){
                          _this.agentApplyOr1 = '0';
                          _this.agentCloseWhy = content.msg;
                      }
                  }else{
                      _this.agentApplyOr1 = '1';
                  }
              }
          }).catch(function(error) {});
      }
  }
</script>

<style scoped>
</style>



