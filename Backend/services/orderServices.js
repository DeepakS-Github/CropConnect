const { formatDate } = require("../services/helper/formatDate");
const productCategory = require("../constants/productCategory");

const getDateVsSales = (orders) => {
  let data = [];
  let i = 0;
  while (i < orders.length) {
    let date = formatDate(orders[i].date);
    let totalSales = 0;
    while (i < orders.length && formatDate(orders[i].date) === date) {
      totalSales = totalSales + orders[i].totalPrice;
      i++;
    }
    data.push({ date: date, totalSales: totalSales });
  }
  //   console.log(data);
  return data;
};

const getCategoriesVsSales = (orders) => {
  let data = [];

  productCategory.map((item) => {
    data.push({ category: item, totalSales: 0 });
  });
  
  for(let i=0; i<orders.length; i++){
    data.map((item)=>{
      if(item.category === orders[i].category){
        item.totalSales = item.totalSales + orders[i].totalPrice;
      }
    })
  }

  return data;
};

module.exports = { getDateVsSales, getCategoriesVsSales };
