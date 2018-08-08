var index = "";
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    list: [
    ]

  },
  onLoad: function () {
    // new app.ToastPannel();
    // var data = wx.getStorageSync("history");
    // console.log(data);
    // this.setData({
    //   settings: data
    // })
  },
  onShow: function () {
    var data = wx.getStorageSync("history");
    console.log(data);
    this.setData({
      list: data
    })

  },
  click:function(res){
    var id = res.currentTarget.dataset.model
    console.log(id)
    var that=this;
    wx.request({
      url: 'https://www.8ev8.cn/Order_Tracking/findOrder',
      method: "GET",
      data: {
        orderId: id,
      },
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {

        if (res.data.code == "404") {
        } else {
          console.log(res.data)
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
  },


  clearHistory:function(){
    var list=[];
    wx.setStorageSync("history", list)
    this.setData({
      list:list
    })
    wx.showToast({
      title: '清除成功',
    })
  }

})