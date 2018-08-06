var app = getApp()
Page({
  data: {
    username: '',
    companyName: '',
    phone: '',
    pwd: '',
    rePwd: ''
  },


  onLoad: function (options) {
    new app.ToastPannel();
  },
  inputId: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  inputCname: function (e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  inputRepwd: function (e) {
    this.setData({
      rePwd: e.detail.value

    })
  },

  payoff: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
      }
    });

  },
  //获取openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: 'https://www.8ev8.cn/weixinpay/GetOpenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'code': code },
      success: function (res) {
        var openId = res.data.openid;
        console.log(openId);
        that.xiadan(openId);
      }
    })
  },
  //下单
  xiadan: function (openId) {
    var that = this;
    wx.request({
      url: 'https://www.8ev8.cn/weixinpay/Xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': openId },
      success: function (res) {
        var prepay_id = res.data.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: 'https://www.8ev8.cn/weixinpay/Sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);

      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    var that=this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {

        
         wx.request({
                url: 'https://www.8ev8.cn/Order_Tracking/register',
                method: "POST",
                data: {
                  password: that.data.pwd,
                  username: that.data.username,
                  companyName: that.data.companyName,
                  phoneNumber: that.data.phone
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (e) {
                  if (e.data.code == "200") {
                    wx.showToast({
                      title: '注册成功',
                    })
                    wx.switchTab({
                      url: '../manager/manager',
                    })
                  } else if (e.data.code == '401') {
                    that.show("当前账户已经被注册，请重试")
                  } else if (e.data.code === "404") {
                    that.show("网络出现问题，请稍后重试")
                  }
                }

              })
      },
      'fail': function (res) {
      }
    })
  },  

  register: function () {
    var that = this;
    if (this.data.username == '' || this.data.companyName == '' || this.data.phone == '' ||
      this.data.pwd == '' || this.data.rePwd == '') {
      this.show("请完善信息！");
    } else {

      var usernameTest = /^[a-zA-Z0-9_-]{4,16}$/;
      var phoneTest = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      var pwdTest = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
      if (!phoneTest.test(this.data.phone)) {
        this.show("手机号格式错误!");
      }
      else if (!usernameTest.test(this.data.username)) {
        this.show("用户名必须为4到16位（字母，数字，下划线，减号)");
      }
      else if (!pwdTest.test(this.data.pwd)) {
        this.show("密码最少6位，密码同时包含数字和字母");
      }
      else if (this.data.pwd != this.data.rePwd) {
        this.show("两次输入密码不相同")
      } 
      
      else {
        wx.request({
          url: 'https://www.8ev8.cn/Order_Tracking/register',
          method: "POST",
          data: {
            password: that.data.pwd,
            username: that.data.username,
            companyName: that.data.companyName,
            phoneNumber: that.data.phone
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (e) {
            if (e.data.code == "200") {
              wx.showToast({
                title: '注册成功',
              })
              wx.switchTab({
                url: '../manager/manager',
              })
            } else if (e.data.code == '401') {
              that.show("当前账户已经被注册，请重试")
            } else if (e.data.code === "404") {
              that.show("网络出现问题，请稍后重试")
            }
          }

        })    
      }

    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/register/register'
    }
  }  

})