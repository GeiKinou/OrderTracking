var app = getApp()
Page({
  data: {

 
    show:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    bt_Ifable: true,
    id: '',
    order: 'sadsad',
    history:[]
  },


  onLoad: function() {

    
    var that = this;
    new app.ToastPannel();
    var value = wx.getStorageSync("ifLogin")
    if (value == true) {
      console.log("登陆中");
    } else {
      var ifLogin = false;
      wx.setStorageSync("ifLogin", ifLogin)
      console.log("我设置了")
    }

    var that = this
    var value = wx.getStorageSync("history")
    if (value != '') {
      // console.log("我不是空的");
    } else {
      var array = this.data.history;
      wx.setStorageSync("history", array)
      console.log("我设置了123")
    }
  },

  showhistory: function() {
    this.setData({
      show:true
    })
  },
  hidehistory:function(){
    this.setData({
      show: false
    })
  },
  getUserInfo: function(e) {
    var code;
    var openId;
    wx.login({
      success: function(res) {
        code = res.code;
        console.log(code)
      }
    })


  },



  inputId: function(e) {
    var that = this;
    this.setData({
      id: e.detail.value
    })
    if (this.data.id != null) {
      that.setData({

        bt_Ifable: false
      })
    }
    if (this.data.id == '') {
      that.setData({
        bt_Ifable: true
      })
    }
  },
  searchClick: function() {
    var id = this.data.id;
    var that = this;
    if (id == "") {
      this.show("请输入订单号")
    } else {
      //返回查询订单信息代码在下面
      var that = this;
      console.log(this.data.id);
      wx.request({
        url: 'https://www.8ev8.cn/Order_Tracking/findOrder',
        method: "GET",
        data: {
          orderId: this.data.id,
        },
        header: {
          'content-type': 'application/json'
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },

        success: function(res) {
          if (res.data.code == "404") {
            that.show("订单号不存在")
          } else {
            var value = wx.getStorageSync("ifLogin");
            if (value==true){
              var obj = {};
              obj.id = that.data.id
              var history = wx.getStorageSync("history");
              for (var i in history) {
                if (history[i].id == that.data.id) {
                  history.splice(i, 1);
                }
              }

              history.push(obj)
              wx.setStorageSync("history", history);
            }
            wx.setStorageSync("process", res.data.orderProcess);
            wx.setStorageSync("finishTime", res.data.finishTime);
            wx.setStorageSync("datas", res.data.data);
            wx.setStorageSync("remark", res.data.remark);
            wx.navigateTo({
              url: '../detail/detail',
            })
          }
        }
      })
    }


  },

  //页面隐藏函数
  onHide: function() {
    this.setData({
      id: ''
    })
  },

  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/index/index'
    }
  }
})