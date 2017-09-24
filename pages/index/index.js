//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    page: 1,
    scrollHeight: 0,
  },

  onLoad: function () {
    // get banner
    wx.request({
      url: 'https://api.ilovelook.cn/api/kolshop/gogoboi/coms/list?code=gogoboi',
      success: (res) => {
        const bannerIndex = res.data.findIndex((item) => item.component_type === 1);
        this.setData({
          banner: res.data[bannerIndex].covers,
        });
      }
    });

    // get weekly selected
    wx.request({
      url: 'https://api.ilovelook.cn/api/kolshop/dabing/coms/list?code=dabing',
      success: (res) => {
        const index = res.data.findIndex((item) => item.component_type === 6);
        this.setData({
          select: res.data[index].goodslist.sku,
        });
      }
    });

    // get column list
    wx.request({
      url: 'https://api.ilovelook.cn/api/kolshop/gogoboi/goodslist/list?code=gogoboi',
      method: 'POST',
      data: {
        page: 'pn:1;l:6',
        limit: 6,
      },
      success: (res) => {
        this.setData({
          column: res.data.goods_lists,
        });
      }
    });

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  loadMore: function() {
    const dataPage = `pn:${this.data.page+1};l:6`
    wx.request({
      url: 'https://api.ilovelook.cn/api/kolshop/gogoboi/goodslist/list?code=gogoboi',
      method: 'POST',
      data: {
        page: dataPage,
        limit: 6,
      },
      success: (res) => {
        this.setData({
          column: this.data.column.concat(res.data.goods_lists),
          page: this.data.page + 1,
        });
      }
    });
    
  },
})
