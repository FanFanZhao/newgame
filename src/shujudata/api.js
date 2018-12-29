import Axios from 'axios'; //引入axios
import qs from 'qs';	//引入axios数据处理
Axios.defaults.timeout = 10000;                        //响应时间
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
// axios.defaults.baseURL = 'http://spsj.xn62x.cn';   //配置接口地址
Axios.defaults.baseURL = 'http://www.baofazhe.com';   //配置接口地址

// let account =  localStorage.account;
// let token = localStorage.token;
// if(account || token){
//     Axios.defaults.headers['token'] = token;
//     Axios.defaults.headers['account'] = account;
// }
// 添加一个响应拦截器
Axios.interceptors.request.use((config) => {
    let account =  localStorage.account;
    let token = localStorage.token;
    config.headers['token'] = token;
    config.headers['account'] = account;
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

// 添加返回信息验证
Axios.interceptors.response.use(function (response) {
    //console.log(response.data.status);
    if (response.data.status == "404") {
        localStorage.clear();
        window.setTimeout(function(){
            window.location.href = "index.html"
        },1000)
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
// 网络地址
let base = 'http://www.baofazhe.com';
let secrurl = "ws://www.baofazhe.com";//推送


// 接口地址
Axios.secrurl = `${secrurl}:7273`;


Axios.sendsms = `${base}/Home/Users/send_sms`;//发送短信
Axios.upload = `${base}/upload.php`;//图片上传
Axios.base = `${base}/`;//图片上传

Axios.userlogin = `${base}/Home/Users/user_login`;//登录
Axios.register = `${base}/Home/Users/register`;//注册
Axios.resetopwd = `${base}/Home/Users/reset_opwd`;//重置登录密码
Axios.commondata = `${base}/Home/Users/common_data`;//公共数据
Axios.ct_data = `${base}/Home/Users/ct_data`;//人民币充提限制
Axios.vcerify = `${base}/Home/Users/vcerify`;//历史查询
Axios.ranklist = `${base}/Home/Users/leaderboard`;//排行榜
Axios.noticelistpost = `${base}/Home/Users/notice_list_post`;//公告列表
Axios.noticeonepost = `${base}/Home/Users/notice_one_post`;//公告详情

Axios.chongzhi = `/Home/Pay/chongzhi_post`;//人民币充值
Axios.tixian = `/Home/Users/tixian_post`;//人民币提现
Axios.tixiancny = `/Home/Users/tixian_post_cny`;//人民币提现
Axios.paywayrecode = `/Home/Users/chongzhi_list_post`;//充值记录
Axios.paywayrecodecny = `/Home/Users/chongzhi_list_post_cny`;//充值记录
Axios.putwayrecode = `/Home/Users/tixian_list_post`;//体现记录
Axios.daililist = `/Home/Users/daili_list_post`;//全民代理三级
Axios.popularlike = `/Home/Users/link`;//推广二维码地址
Axios.userinfo = '/Home/Users/userinfo';//用户信息
Axios.saveupic = '/Home/Users/save_upic';//上传头像
Axios.editpwd = '/Home/Users/edit_pwd';//修改密码
Axios.saveupic = '/Home/Users/save_upic';//上传头像
Axios.payway = '/Home/Users/set_pay';//支付方式
Axios.resettpwd = '/Home/Users/reset_tpwd';//重置资金密码
Axios.edittpwd = `/Home/Users/edit_tpwd`;//重置资金密码
Axios.editpayway = `/Home/Users/show_pay`;//获取支付方式
Axios.recharge = `/Home/Users/bpay`;//充值
Axios.adresslist = `/Home/Users/show_address`;//钱包列表
Axios.addmoneyAdress = `/Home/Users/wallet_address`;//添加钱包地址
Axios.delmoneyAdress = `/Home/Users/del_address`;//删除钱包地址
Axios.applyAgent = `/Home/Users/daili_apply_post`;//申请代理商
Axios.applyAgentZhu = `/Home/Users/xiaji_order_list_post`;//申请代理商-我的下注


Axios.bill = '/Home/Users/bill';//账单流水

Axios.leaderboard = '/Home/Users/leaderboard';//排行榜
Axios.vcerify = `${base}/Home/Users/vcerify`;//历史查询

Axios.Lottery = `${base}/Home/Users/lottery`;//每期开奖
Axios.myquiz = `${base}/Home/Users/myquiz`;//我的竞猜


Axios.myquiz = '/Home/Users/myquiz';//我的竞猜


Axios.Bankerpool = '/Home/Users/Banker_pool';//庄家奖池
Axios.bankoppost = '/Home/Order/bank_op_post';//庄家注入和提取
Axios.Bankerhistory = '/Home/Users/Banker_history';//庄家奖池--历史

Axios.orderaddpost = '/Home/Order/order_add_post';//下注
Axios.orderescapepost = '/Home/Order/order_escape_post';//普通用户逃跑
Axios.update_my_mobile_post = '/Home/Users/update_my_mobile_post';//修改手机号

Axios.getErCode = '/home/Users/getErCode';//人工在线充值

export default Axios;




// WEBPACK FOOTER //
// ./src/shujudata/api.js