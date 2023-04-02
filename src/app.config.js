export default defineAppConfig({
  pages: [
    "pages/login/index",
    "pages/register/index",
    "pages/index/index",
    "pages/faceCheckTab/index",
    "pages/updateInformation/index",
    "pages/updatePassword/index",
    "pages/getFace/index",
    "pages/check/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },

  tabBar: {
    selectedColor:'#2190cc',
    list: [
      {
        pagePath: "pages/index/index",
        text: "主页",
        iconPath:'img/home.png',
        selectedIconPath:'img/selectedHome.png'
      },
      {
        pagePath: "pages/faceCheckTab/index",
        text: "人脸识别",
        iconPath:'img/face.png',
        selectedIconPath:'img/selectedFace.png'
      },
    ],
  },
});
