import Api from './api.js'
/* 时间格式化 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**倒计时   定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数**/
var total_micro_second = 10000 * 40;
/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }
    , 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + ":" + min + ":" + sec + " " + micro_sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
// 满足起批配置信息判断
function configFun(data) {
  Api.config(data)
    .then(res => {
      var obj = res.obj,
        goodsSaleBatchNum = obj.goodsSaleBatchNum,
        goodsSaleBatchAmount = obj.goodsSaleBatchAmount,
        storeSaleBatchNum = obj.storeSaleBatchNum,
        storeSaleBatchAmount = obj.storeSaleBatchAmount,
        saleBatchNum=null,
        saleBatchAmount=null
      if (goodsSaleBatchNum == null) {
          saleBatchNum=storeSaleBatchNum
      } else {
          saleBatchNum=goodsSaleBatchNum
      }
      if (goodsSaleBatchAmount == null) {
          saleBatchAmount=storeSaleBatchAmount
      } else {
          saleBatchAmount=goodsSaleBatchAmount
      }
      return saleBatchNum
    })
}
module.exports = {
  formatTime: formatTime,
  count_down:count_down,
  configFun: configFun
}
