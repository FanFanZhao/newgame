<style lang="less">
    // @import '../../assets/public.less';
	// @import '../../assets/index.less';
	// @import '../../assets/ivewpublic.less';
	// @import 'faq.less';
</style>
<template>
	<div class="faq">
		<div class="faq_pc">
			<ul class="faq_left">
				<li class="faq_left_head">FAQ</li>
				<li @click="faqCurrentCon(faqGame)" class="faq_left_current">游戏介绍</li>
				<li @click="faqCurrentCon(faqPresent)">奖池介绍</li>
				<li @click="faqCurrentCon(faqFair)">游戏公平性</li>
				<li @click="faqCurrentCon(faqFlee)">自动逃跑</li>
			</ul>
			<div class="faq_right">
				<help-content v-bind:content="currentTab" :contentNor="currentNor"></help-content>
				<!--<p class="faq_right_head">什么是大爆炸</p>-->
				<!--<p>大爆炸是一款在线多人区块链竞猜游戏，由一个随时可能崩溃的渐增曲线组成。</p>-->
				<!--<p class="faq_right_head">怎么玩?</p>-->
				<!--<p>游戏开始前，您有6秒的时间下注，游戏开始后，倍数从1X开始越来越高。-->
					<!--您可以在任何时候点击“逃跑”来锁定当前倍数，您的收益就是赌注乘以当前倍数。-->
					<!--在游戏中逃跑得越晚，您获得的收益就会越高。但请注意，曲线随时会崩溃，如果在崩溃前您没逃跑，您会失去您的赌注。<br>您会在1.01倍就跑，还是100倍、1000倍、10000倍……逃跑？全在您一念之间！（有心脏病的玩家需谨慎）</p>-->
			</div>
		</div>
		<div class="faq_wrap">
			<div class="faq_wrap_head">FAQ</div>
			<Collapse @on-change="scrollTop" v-model="collapseFaq" accordion simple>
				<Panel id="faq_mao" hide-arrow name="1">
					游戏介绍
					<div slot="content">
						<help-content v-bind:content="faqGame" :contentNor="currentNor"></help-content>
						<!--<div class="faq_wrap_content">-->
							<!--<p class="faq_right_head">什么是大爆炸</p>-->
							<!--<p>大爆炸是一款在线多人区块链竞猜游戏，由一个随时可能崩溃的渐增曲线组成。</p>-->
							<!--<p class="faq_right_head">怎么玩?</p>-->
							<!--<p>游戏开始前，您有6秒的时间下注，游戏开始后，倍数从1X开始越来越高。</p>-->
							<!--<p>您可以在任何时候点击“逃跑”来锁定当前倍数，您的收益就是赌注乘以当前倍数。</p>-->
							<!--<p>在游戏中逃跑得越晚，您获得的收益就会越高。但请注意，曲线随时会崩溃，如果在崩溃前您没逃跑，您会失去您的赌注。<br>您会在1.01倍就跑，还是100倍、1000倍、10000倍……逃跑？全在您一念之间！（有心脏病的玩家需谨慎）</p>-->

						<!--</div>-->
					</div>
				</Panel>
				<Panel hide-arrow name="4">
					奖池介绍
					<p slot="content"><help-content v-bind:content="faqPresent" :contentNor="currentNor"></help-content></p>
				</Panel>
				<Panel hide-arrow name="2">
					游戏公平性
					<p slot="content"><help-content v-bind:content="faqFair" :contentNor="currentNor"></help-content></p>
				</Panel>
				<Panel hide-arrow name="3">
					自动逃跑
					<p slot="content"><help-content v-bind:content="faqFlee" :contentNor="currentNor"></help-content></p>
				</Panel>
			</Collapse>
		</div>
	</div>
</template>
<script>
	import helpContent from '../help/helpContent'
	export default {
        data() {
			return {
                collapseFaq:'1',
                faqPresent:'',
                faqFair:'',
                faqFlee:'',
                faqGame:'',
              	currentTab:'',
                currentNor:true,
			}
		},
		methods:{
            scrollTop(){
                let scrollTop = $('#faq_mao').offset().top;
                let headerHeight = $('.ivu-layout-header').height();
                $('html,body').animate({scrollTop: (Number(scrollTop)-Number(headerHeight))+'px'});
            },
            faqgetData() {
                let _this = this;
               $.post(_this.$http.commondata,function(response) {
                    if(response.status == 200) {
                        let getDatas = response.data.play_info;
                        _this.faqFlee = getDatas.flee;
                        _this.faqPresent = getDatas.present;
                        _this.faqFair = getDatas.fair;
                        _this.faqGame = getDatas.game;
                        _this.currentTab = _this.faqGame;
                        _this.contentLineFade(_this.faqFlee);
                        _this.contentLineFade(_this.faqPresent);
                        _this.contentLineFade(_this.faqFair);
                        _this.contentLineFade(_this.faqGame);
                    }else {
                    }
                })
            },
          faqCurrentCon(currentTab){
              let _this = this;
              _this.currentTab = currentTab;
              $('.faq_left li').removeClass('faq_left_current');
              $(event.target).addClass('faq_left_current');
              _this.contentLineFade(currentTab);
		  },
            contentLineFade(currentContent){
                let _this = this;
                let contentBr = [];
                for(let i = 0; i < currentContent.length; i++){
                    if(typeof currentContent == "object"){
                        contentBr = currentContent[i].content.split('|');
                        currentContent[i].twoLevel = contentBr;
                        _this.currentNor = true;
                    }else{
                        _this.currentNor = false;
                    }
                }
                _this.currentTab = currentContent;
            }
		},
		mounted: function() {
            let _this = this;
            _this.faqgetData();
            if(_this.$route.query.id){
                _this.collapseFaq = '2';
			}
		},
		components: {
            "helpContent":helpContent
		}

    }
</script>


