// pages/detail/detail.js
Page({

  data: {
    ifModify:true,
    beizhu:'',
    listData: [

    ],
    process1:'',
    process2: '',
    process3: '',
    process4: '',
    finishTime:'',
    remark:''
  },

  onShow:function(){
    var process=wx.getStorageSync("process");
    var datas=wx.getStorageSync("datas");
    
    var list=[];
    for(var i in datas) {
      var obj={};
      obj.id=datas[i].model;
      obj.num=datas[i].num;
      obj.types=[];
      var objx={};
      if (datas[i].step1=="false"){
        objx.t =false;
      }else{
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
    }
    this.setData({
      process1: process.process1,
      process2: process.process2,
      process3: process.process3,
      process4: process.process4,
      listData:list,
      finishTime: wx.getStorageSync("finishTime"),
      remark: wx.getStorageSync("remark")
    })
    console.log(this.data.listData);

  },
  checkboxChange: function(res) {
    var row=res.currentTarget.dataset.row;
    var col=res.currentTarget.dataset.col;
    console.log('checkbox发生change事件，携带value值为：', res.detail.value)
    var lists = this.data.listData;
    if (res.detail.value.length==0){
        lists[row].types[col].t=false;

    }else{
        lists[row].types[col].t= true;
    }
    this.setData({
      listData:lists
    })
  },

  save:function(){
    // var list=wx.getStorageSync("temList");
    // this.setData({
    //   listData:list
    // })

    //发送网络请求去修改
    



  },
  modify:function(){
    var value=this.data.ifModify;
    value=!value;
    this.setData({
      ifModify:value
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'e汇商服',
      path: '/pages/detail/detail'
    }
  }  
})



