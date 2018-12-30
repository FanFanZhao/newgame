<style lang="less">

</style>
<template>
        <div>
                <div v-if="contentNor">
                        <div v-for="(item,index) in content" class="help_right_define" :key="index">
                                <div class="define_head">{{item.title}}</div>
                                <!--{{item}}-->
                                <p v-for="(item1,indexs) in item.twoLevel" :key="indexs">{{item1}}</p>
                        </div>
                </div>
                <div v-else>
                        <div v-html="content" class="define_head"></div>
                </div>

                <!--<div v-for="item in content">-->
                        <!--&lt;!&ndash;定义&ndash;&gt;-->
                        <!--<div class="help_right_define">-->
                        <!--<div class="define_head">定义</div>-->
                        <!--<p>Bc.game被称为'本网站'或'我们'</p>-->
                        <!--<p>玩家被称为“您”或“玩家”</p>-->
                        <!--<p>'网站'是指Bc.game通过桌面，手机或播放器使用的其他平台</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;定义&ndash;&gt;-->
                        <!--&lt;!&ndash;一般&ndash;&gt;-->
                        <!--<div class="help_right_define">-->
                        <!--<div class="define_head">1.一般</div>-->
                        <!--<p>1.1。 这些用户协议适用于通过www.bc.game访问游戏时使用。</p>-->
                        <!--<p>1.2。 这些用户协议在您完成注册过程后即开始生效，其中包括选中接受这些用户协议的框并成功创建帐户。在帐户创建后使用本网站的任何部分，即表示您同意这些用户协议。</p>-->
                        <!--<p>1.3。 在创建帐户之前，您必须仔细阅读这些用户协议。如果您不同意这些用户协议的任何规定，您不得创建帐户或继续使用本网站。</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;一般&ndash;&gt;-->
                        <!--&lt;!&ndash;绑定声明&ndash;&gt;-->
                        <!--<div class="help_right_define">-->
                        <!--<div class="define_head">1.绑定声明</div>-->
                        <!--<p>2.1。通过同意受这些用户协议的约束，您还同意受Bc.game规则和隐私政策的约束，这些规则和条款通过引用纳入本用户协议。如有任何不一致之处，以本用户协议为准。您特此声明并保证</p>-->
                        <!--<p>2.2。（a）18岁或（b）适用于您的任何法律确定的其他法定年龄或成人年龄，以年龄较大者为准;</p>-->
                        <!--<p>2.3。您有完全能力与我们签订具有法律约束力的协议，您不受任何形式的有限法律行为能力的限制;</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;绑定声明&ndash;&gt;-->
                <!--</div>-->
        </div>
</template>

<script>
    export default {
        name: "helpContent",
        props:['content','contentNor'],
        data() {
            return {
                contentData:[]
            }
        },
        methods:{
        },
        mounted:function(){

        },
        created:function () {

        }
    }
</script>





