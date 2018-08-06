// pages/detail/detail.js
var app=getApp();
Page({

  data: {
    //判断是否显示
    showTopTips: false,
    //提示信息
    TopTips: '',
    guestName:'',
    ifModify: false,
    ifMoren: false,
    ifMorentest: false,
    orderId: "",
    type1: "",
    type2: "",
    type3: "",
    type4: "",
    listData: [
      {
      model: "",
      num: "",
      types: [
        {
          t: false
        },
        {
          t: false
        },
        {
          t: false
        },
        {
          t: false
        },

      ]
    }
    ],
    time: '',
    remark: '',
 
 

  },
  onLoad:function(){
    new app.ToastPannel();
  },
  onShow: function() {
    var value = wx.getStorageSync("ifMoren")
   
    if (value!='') {
      this.setData({
        ifMoren: value,
        type1: wx.getStorageSync("t1"),
        type2: wx.getStorageSync("t2"),
        type3: wx.getStorageSync("t3"),
        type4: wx.getStorageSync("t4"),

      })
      console.log(this.data.type1);
      console.log(value)
    } else {
      var ifMoren = false;
      this.setData({
        ifMoren: false,
      })
      wx.setStorageSync("ifMoren", ifMoren)
      console.log("我设置了");
    }
  },


  addList: function() {
    var lists = this.data.listData;
    var newData = {};
    newData.id = "";
    newData.num = "";
    newData.types = [];
    var obj1 = {};
    obj1.t=false;
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
    })
  },
  delList: function() {
    var lists = this.data.listData;
    lists.pop(); //实质是删除lists数组内容，使for循环少一次  
    this.setData({
      listData: lists,
    })
  },

  inType1: function(res) {
    var a = res.detail.value

    this.setData({
      type1: a,
      ifMoren: false
    })

  },
  inType2: function(res) {
    var a = res.detail.value
    this.setData({
      type2: a,
      ifMoren: false
    })
  },
  inType3: function(res) {
    var a = res.detail.value
    this.setData({
      type3: a,
      ifMoren: false
    })
  },
  inType4: function(res) {
    var a = res.detail.value
    this.setData({
      type4: a,
      ifMoren: false
    })
  },

  // inputTime: function (res){
  //   this.setData({
  //     time: res.detail.value
  //   })
  //     console.log(this.data.time)

  // },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },


  inGuestName:function(res){
    this.setData({
      guestName: res.detail.value
    })
    console.log(this.data.guestName)
  },

  
  inputBZ:function(res){
    this.setData({
      remark: res.detail.value
    })
  },
  inName: function(res) {
    var a = res.detail.value
    var idx = res.currentTarget.dataset.idx;
    var lists = this.data.listData;
    lists[idx].model = a;
    this.setData({
      listData: lists
    })

  },

  inNum: function(res) {
    var a = res.detail.value
    var idx = res.currentTarget.dataset.idx;
    var lists = this.data.listData;
    lists[idx].num = a;
    this.setData({
      listData:lists
    })
    console.log(this.data.listData);
  },

  inId: function(res) {
    var a = res.detail.value
    this.setData({
      orderId: a
    })
    console.log(a);
  },


  checkboxChange: function(res) {
    var row = res.currentTarget.dataset.row;
    var col = res.currentTarget.dataset.col;
    var lists = this.data.listData;
    if (res.detail.value.length == 0) {
      console.log(row+"xx"+col)
      lists[row].types[col].t=false;
      // var key="check"+col;
      // console.log(key);
      // this.setData({
      //   [key]:false
      // })
      console.log(lists[row].types[col].t)
      
    } else {
      lists[row].types[col].t = true;
      console.log(row + "xx" + col)
      // var key = "check" + col;
      // console.log(key);
      // this.setData({
      //   [key]: true
      // })
      console.log(lists[row].types[col].t)
    }    
    this.setData({
      listData:lists
    })
    console.log(lists)
    // wx.setStorageSync("addList", lists);
    // console.log(wx.getStorageSync("addList"))
  },

  save: function () {
    var that = this;
    var list = this.data.listData;
    var type1=this.data.type1;
    var type2 = this.data.type2;
    var type3 = this.data.type3;
    var type4 = this.data.type4;
    var title = this.data.orderId;
    var guestName = this.data.guestName;
    var flag_name=0;
    var flag_num=0;


   
    for (var i in list){
      if(list[i].model==''||list[i].model==null){
        flag_name=1;
      }
      if (list[i].num == '' || list[i].num == null){
        flag_num
      }
    }
    //先进行表单非空验证
    if (title == "") {
      // this.setData({
      //   showTopTips: true,
      //   TopTips: '请输入订单号'
      // });
      this.show("请输入订单号")
    } else if (type1 == '' || type2 == '' || type3 == '' || type4 == ''){
      this.show("请完善步骤")
    }
      else if (guestName==''){
      this.show("请输入客户名")
    }
   else if (flag_name ==1) {

      this.show('请输入产品名');
    } 
    else if (flag_num ==1) {
      this.show("请输入产品数量")
    } 
    else {
      wx.showModal({
        title: '提示',
        content: '是否确认提交订单',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.8ev8.cn/Order_Tracking/addOrder',
              method: "POST",
              data: {
                orderItems: JSON.stringify(that.data.listData),
                // tests: JSON.stringify(that.data.testListData),
                customerName: that.data.guestName,
                id: that.data.orderId,
                userId:wx.getStorageSync("loginUser"),
                finishTime: that.data.time,
                remark: that.data.remark,
                process1: that.data.type1,
                process2: that.data.type2,
                process3: that.data.type3,
                process4: that.data.type4,
                
              },
              header: {
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },

              success: function (res) {
             
                if (that.data.ifMorentest == true) {
                  wx.setStorageSync("t1", type1)
                  wx.setStorageSync("t2", type2)
                  wx.setStorageSync("t3", type3)
                  wx.setStorageSync("t4", type4)
                  wx.setStorageSync("ifMoren", true)
                } else {
                  wx.setStorageSync("ifMoren", false)
                }
                wx.switchTab({
                  url: '../manager/manager',
                })
              }

            })
          }
        }
      })
    }
  },
  switchChange: function(e) {
    
    this.setData({
      ifMorentest: e.detail.value
    })
    console.log(this.data.ifMorentest);
  }, 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/page/user?id=123'
    }
  }  

})