// pages/myWallet/myWallet.js
const app = getApp();
var $http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*nickname:'',
    wallet:{
      total_earnings:2500,
      first_earnings:1300,
      second_earnings:1200
    },
    inviteList:[
      {
        id:0,
        img:'../../images/carsource_02.png',
        name:'李搜搜',
        num:30,
        money:9000
      },
      {
        id: 0,
        img: '../../images/carsource_02.png',
        name: '李搜搜',
        num: 30,
        money: 9000
      }
    ]*/
  },
  /**
   *事件函数
   */
  request_wallet(){
    var $this = this;
    var inviteList = new Array();
    $http.post('my/my_wallet')
      .then(res => {
        //成功回调
        var resObj = res.data;
        console.log('资讯列表：', resObj);
        if (resObj.code == 1) {
          var data = resObj.data.data;
          var user = data.user;
          var wallet = data.mymoney;
          var earning_details = data.earning_details;
          
          if (earning_details){
            earning_details.forEach((val,index)=>{
               var obj={
                 id: val.store.user_id,
                 img: val.user.avatar,
                 name: val.user.nickname,
                 num: val.second_count,
                 money: val.second_moneycount
               }
              inviteList[index]=obj;
            });
          }
          $this.setData({ user, wallet, inviteList})
        } else {
          wx.showToast({
            title: resObj.msg,
            image: '../../images/warn.png'
          });
          console.log('请求失败：', resObj.msg);
        }
      }).catch(err => {
        //异常回调
        console.log('请求失败', err);
      });
  },
  nav_to_withdrawcash(){
      wx.navigateTo({
        url: '../withdrawCash/withdrawCash',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.request_wallet();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})