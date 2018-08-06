var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',

    TopTips:''
  },
  onLoad: function () {
    new app.ToastPannel();
  },
  //提交表单
  submitForm: function(e) {
    var title = e.detail.value.title;
    var content = e.detail.value.content;
    var that=this;
    //先进行表单非空验证
    if (title == "") {
      this.show("请输入标题")
    } else if (content == "") {
      this.show("请输入内容")
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确认提交意见',
        success: function(res) {
          if (res.confirm) {
            //网络请求
            var UserWhoSend=wx.getStorageSync("loginUser");
            //这里写网络请求
            wx.request({
              url: 'https://www.8ev8.cn/Order_Tracking/addFeedback',
              method: "POST",
              data: {
                title: title,
                content: content,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },

              success:function(res){
                console.log(res.data);
                that.show("提交成功")
              }
      })
    }
  }
})
}
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/feedback/feedback'
    }
  }  


})
  