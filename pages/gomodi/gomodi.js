// pages/gomodi/gomodi.js
var app=getApp();
var inputinfo = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    animationData: "",
   
    listData: [

    ],
    ifDelete:[],
    show:false,
    ifShowCheckBox:false,
    process1:'',
    process2: '',
    process3: '',
    process4: '',
    finishTime:'',
    remark:'',
    guestName:'',
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPannel();
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      finishTime: e.detail.value
    })
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  inputName: function (res) {
    var a = res.detail.value
    var idx = res.currentTarget.dataset.row;
    var list = this.data.listData;
    list[idx].model = a;
    console.log(list[idx].model)
    this.setData({
      listData: list
    })

  },
  delete:function(){
    var that=this;
    wx.showActionSheet({
      itemList: ['删除产品','删除订单','批量删除'],
      success: function (res) {
        if(res.tapIndex==0){
          //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作
          that.showModal()


        }
        
        else if(res.tapIndex==1){

  //删除订但操作  //删除订但操作  //删除订但操作  //删除订但操作  //删除订但操作  //删除订但操作  //删除订但操作
          that.deleteOrder();
       

        }else if(res.tapIndex==2){
          that.setData({
            ifShowCheckBox:true
          })
          that.show("选中需要删除的产品提交即可删除");
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  inNum: function (res) {
    var a = res.detail.value
    var idx = res.currentTarget.dataset.row;
    var lists = this.data.listData;
    lists[idx].num = a;
    this.setData({
      listData: lists
    })
    console.log(lists)
  },


  click_cancel:function(){
    this.hideModal()
  },



//删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作
  click_ok: function () {
    this.hideModal();

    //删除产品操作
    this.deleteList();
  },


  
  inputPassword: function (e) {
    inputinfo = e.detail.value;
  },



  onShow:function(){
    var process = wx.getStorageSync("process");
    var datas = wx.getStorageSync("datas");
    var list = [];
    var ifDeletes=[];
    
    for (var i in datas) {
      var obj = {};

      //设置是否删除
      var test={};
      test.ifcheck=false;
      ifDeletes.push(test);


      obj.model= datas[i].model;
      obj.num = datas[i].num;
      obj.types = [];
      var objx = {};
      if (datas[i].step1 == "false") {
        objx.t = false;
      } else {
        objx.t = true;
      }
      obj.types.push(objx);
      var objx = {};
      if (datas[i].step2 == "false") {
        objx.t = false;
      } else {
        objx.t = true;
      }
      obj.types.push(objx);
      var objx = {};
      if (datas[i].step3 == "false") {
        objx.t = false;
      } else {
        objx.t = true;
      }
      obj.types.push(objx);
      var objx = {};
      if (datas[i].step4 == "false") {
        objx.t = false;
      } else {
        objx.t = true;
      }
      obj.types.push(objx);
      list.push(obj);
      console.log(list)
      console.log(ifDeletes)
    }

    this.setData({
      process1: process.process1,
      process2: process.process2,
      process3: process.process3,
      process4: process.process4,
      listData: list,
      ifDelete:ifDeletes,
      orderId: wx.getStorageSync("orderId"),
      finishTime: wx.getStorageSync("finishTime"),
      remark: wx.getStorageSync("remark"),
      gusetName: wx.getStorageSync("gusetName"),
    })
    console.log(this.data.orderId);

  },

  inputRemark:function(res){
      this.setData({
        remark:res.detail.value
      })
  },


  deleteOrder:function(){

    wx.showModal({
      title: '警告',
      content: '删除以后无法恢复',
      success: function (res) {
        if (res.confirm) {
          //提交修改
          wx.request({
            //修改url
            url: 'https://www.8ev8.cn/Order_Tracking/delOrder',
            method: "POST",
            data: {
              //上传需要删除的订单号
              id: wx.getStorageSync("orderId"),
            },
            header: {

              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },

            success: function (res) {

              
              wx.showToast({
                title: '删除成功',
              })
              wx.switchTab({
                url: '../manager/manager',
              })
            }
          })
        }
      }
    })
  },

  deleteList:function(){
    var lists = this.data.listData;
    for(var i in lists){
      if (lists[i].model == inputinfo){
       lists.splice(i, 1);
       console.log(lists)

       //此处加入删除的网络请求。orderId为该订单的编号  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品操作  //删除产品
      
      //这是删除后的lists
       this.setData({
         listData:lists
       })
     }
    }
  },
  addList: function () {
    var lists = this.data.listData;
    var newData = {};
    newData.model = "";
    newData.num = "";
    newData.types = [];
    var obj1 = {};
    obj1.t = false;
    newData.types.push(obj1);
    var obj2 = {};
    obj2.t = false;
    newData.types.push(obj2);
    var obj3 = {};
    obj3.t = false;
    newData.types.push(obj3);
    var obj4 = {};
    obj4.t = false;
    newData.types.push(obj4);
    var obj5 = {};

    lists.push(newData); //实质是添加lists数组内容，使for循环多一次  
    this.setData({
      listData: lists,
      show:true
    })
  },
  checkboxChange: function (res) {
    var row = res.currentTarget.dataset.row;
    var col = res.currentTarget.dataset.col;
    var lists = this.data.listData;
    if (res.detail.value.length == 0) {
      lists[row].types[col].t = false;
      console.log(lists[row].types[col].t)

    } else {
      lists[row].types[col].t = true;
      // var key = "check" + col;
      // console.log(key);
      // this.setData({
      //   [key]: true
      // })
      console.log(lists[row].types[col].t)
    }
    this.setData({
      listData: lists
    })

  },
  ifCheck: function (res) {
    var row = res.currentTarget.dataset.row;
    var ifde=this.data.ifDelete;
    ifde[row].ifcheck=!ifde[row].ifcheck;
    console.log(ifde);
  },

  save: function () {
    var that = this;
    var list = this.data.listData;
    var newList=[];
    var newDel=[];
    var ifde=this.data.ifDelete;
    var length=ifde.length;
    for (var i=0;i<length;i++){
      if(ifde[i].ifcheck==false){
        console.log(list[i])
        console.log(ifde[i])
         newList.push(list[i]);
         newDel.push(ifde[i]);
      }
    }
    this.setData({
      listData:newList,
      ifDelete:newDel
    })


      // wx.showModal({
      //   title: '提示',
      //   content: '是否确认提交',
      //   success: function (res) {
      //     if (res.confirm) {
      //       //提交修改
      //       wx.request({
      //         url: 'https://www.8ev8.cn/Order_Tracking/updateOrder',
      //         method: "POST",
      //         data: {
      //           orderItems: JSON.stringify(list),
      
      //           //测试的订单id
      //           id: wx.getStorageSync("orderId"),
      //           // id: that.data.orderId,
      //           //测试的用户id
      //           userId: wx.getStorageSync("loginUser"),
      //           finishTime: that.data.finishTime,
      //           remark: that.data.remark,
      //           // process1: that.data.type1,
      //           // process2: that.data.type2,
      //           // process3: that.data.type3,
      //           // process4: that.data.type4,
      //         },
      //         header: {
      //           // 'content-type': 'application/json'
      //           'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      //         },

      //         success:function(res){
      //               wx.showToast({
      //                 title: '修改成功!',
      //                 duration: 1000
      //               })
      //         }
      //       })
      //     }
      //   }
      // })
    },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/gomodi/gomodi'
    }
  },
  touchview: function () {
    this.setData({
      show: true
    })
  },
  bindblurEvent: function () {
    this.setData({
      show: false
    })
  }
})