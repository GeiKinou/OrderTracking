// pages/manager/manager.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserMessage: false,

    userInfo: {},
    hasUserInfo: false,
    noAuthorized: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    password: '',
    username: '',
    ifLogin: false,
    list: [
    ]
  },
  onLoad: function() {
    new app.ToastPannel();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
      // 所以此处加入 callback 以防止这种情况  
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理  
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function() {
    var value = wx.getStorageSync("ifLogin");
    this.setData({
      ifLogin: value
    })
  },

  login: function() {
    var that = this;
    if (this.data.username == '') {
      this.show("账号不能为空");
    } else if (this.data.password == '') {
      this.show("密码不能为空");
    } else {
      wx.request({
        url: 'https://www.8ev8.cn/Order_Tracking/login',
        data: {
          password: that.data.password,
          username: that.data.username
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
        
          if (res.data.code == "200") {
            that.setData({
              ifLogin: true
            })
            var value = true;
            wx.setStorageSync("ifLogin", value);
            wx.setStorageSync("loginUser", res.data.data[0]);
            wx.showToast({
              title: '登陆成功',
              duration: 1000
            })
            wx.setStorageSync("username", that.data.username);
          } else if (res.data.code == "404") {
            that.show("登陆失败，请核实账号密码")
          }
        }
      })
    }
  },
  Tohistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  ToFeedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  ToSayabout: function() {
    wx.navigateTo({
      url: '../sayabout/sayabout',
    })
  },
  ToAbout: function() {
    wx.navigateTo({
      url: '../linkpage/linkpage',
    })
  },
  ToAdd: function() {
    wx.navigateTo({
      url: '../addOrder/addOrder',
    })
  },

  //这里去请求 创建订单的。
  ToManager: function() {
    var userid = wx.getStorageSync("loginUser");
    
    console.log(userid)
    var list=[];
    var that=this;
    console.log(userid);
    wx.request({
      url: 'https://www.8ev8.cn/Order_Tracking/findOrders',
      method: "GET",
      data: {
        // userId: userid,
        userId: 1
      },
      header: {
        'content-type': 'application/json',
      },

      success: function (res) {
        console.log(res.data);
        for(var i in res.data.data){
            var obj={}
            obj.guestName = res.data.data[i].customerName
            obj.model = res.data.data[i].id
            list.push(obj);
        }

        wx.setStorageSync("orderList", list)
        console.log(list);
        wx.navigateTo({
          url: '../modi/modi',
        })

      }
    })
  
  },

  loginOut: function() {
    wx.setStorageSync("ifLogin", false);
    this.setData({
      ifLogin: false,
      password: '',
      username: '',
    })
  },

  register: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  forgetPwd: function() {
    wx.navigateTo({
      url: '../forgetPwd/forgetPwd',
    })
  },
  inputId: function(e) {
    var that = this;
    this.setData({
      username: e.detail.value
    })
  },
  inputPwd: function(e) {
    var thay = this;
    this.setData({
      password: e.detail.value
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/manager/manager'
    }
  },
  getUserInfo: function (e) {
    var code;
    var openId;
    // wx.login({
    //   success: function (res) {
    //     code = res.code;
    //     if (code) {
    //       wx.request({
    //         url: 'https://www.8ev8.cn/Contacts/GetOpenId',
    //         data: {
    //           code: code
    //         },
    //         header: {
    //           'content-type': 'application/json'
    //         },

    //         success: function (res) {
    //           console.log(res.data);
    //           openId = res.data;
    //           wx.setStorageSync("openId", openId);
    //         },

    //         fail: function () {
    //           console.log("fail");
    //         }
    //       })
    //     }
    //   }
    // })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 

})