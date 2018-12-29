<template>
	<Modal v-model="modal2" width="880" @on-cancel="Callback()">
        <p slot="header">
            <span>玩法介绍</span>
        </p>
        <div class="notice_main">
            <div v-for="(item,index) in content" class="help_right_define" :key="index">
                <div class="define_head">{{item.title}}</div>
                <!--{{item}}-->
                <p v-for="(item1,indexs) in item.twoLevel" :key="indexs">{{item1}}</p>
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
                cityList:"",
                modal2:false,
                content:'',
            }
        },
        watch: {
        	'Statevalue':function(val,oval){
				var _this = this;
				_this.modal2 = val;
                this.getData();
			},
        },
        methods: {
        	Callback(){
        	    let _this = this;
                _this.$emit('modifyfun');
                _this.modal2 = false;
        	},
            getData(){
        	    let _this = this;
                $.post(_this.$http.commondata,function(response) {
                    if(response.status == 200) {
                        let getDatas = response.data.play_info;
                        _this.contentLineFade(getDatas.game);
                    }else {
                    }
                });
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
                _this.content = currentContent;
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    @import '../../assets/public.less';
    @import './index.less';
    .help_right_define{
        margin-bottom:70px;
        .define_head {
            //font-size: @h8FontSize;
            padding-bottom: 30px;
            border-bottom: 1px solid @DaiDorderColor8;
            margin-bottom: 18px;
        }
        p{
            //font-size: @h3FontSize;
            line-height:42px;
        }
    }

    @media screen and(max-width:768px){
        .help_right_define{
            margin-bottom:0.7rem;
            .define_head {
                /*font-size: 0.32rem;*/
                padding-bottom: 0.3rem;
                border-bottom: 0.01rem solid @DaiDorderColor8;
                margin-bottom: 0.18rem;
            }
            p{
                /*font-size: 0.28rem;*/
                line-height:0.42rem;
            }
        }
    }
</style>



// WEBPACK FOOTER //
// src/components/playintruduce/index.vue