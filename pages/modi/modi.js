Page({

  data: {
    list:[
 
    ]
  },
  onShow:function(){
    this.setData({
      list:wx.getStorageSync("orderList")
    })
    console.log(this.data.list)
  },
  click:function(res){
    var i = res.currentTarget.dataset.model
    var name = res.currentTarget.dataset.gusetName

    console.log(name);
    wx.request({
      url: 'https://www.8ev8.cn/Order_Tracking/findOrder',
      method: "GET",
      data: {
        orderId: i,
      },
      header: {
        'content-type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },

      success: function (res) {
        if (res.data.code == "404") {
          // that.show("订单号不存在")
        } else if (res.data.code == "200"){
          console.log(res.data.data);
          wx.setStorageSync("orderId", i);
          wx.setStorageSync("gusetName",name)
          wx.setStorageSync("process", res.data.orderProcess);
          wx.setStorageSync("finishTime", res.data.finishTime);
          wx.setStorageSync("datas", res.data.data);
          wx.setStorageSync("remark", res.data.remark);
          wx.navigateTo({
            url: '../gomodi/gomodi',
          })
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/modi/modi'
    }
  }  
})