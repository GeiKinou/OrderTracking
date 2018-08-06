//app.js
import { ToastPannel } from './component/toastTest/toastTest'
App({
  ToastPannel,
  onLaunch: function () {
    // 展示本地存储能力
    this.getUserInfo();
  },
  
  onShow: function () {
    this.getUserInfo();
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function () {
              wx.showModal({
                title: '用户没有授权',
                content: '如果您想使用全部功能，请按确认按钮并单击设置页面中的授权按钮',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    ifLogin:false
  }
})