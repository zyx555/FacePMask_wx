import { Component } from 'react'
import { View, Text, Image, Button, Camera } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  state = {
    isAuth: false,
    src: '',
    token: "",
  }
  onLoad() {
    const _this = this
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setState({
            isAuth: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          Taro.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setState({
                isAuth: true
              })
            },
            fail() { // 用户不同意授权
              _this.openSetting().then(res => {
                _this.setState({
                  isAuth: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })
  }

  // 打开授权设置界面
  openSetting() {
    const _this = this
    let promise = new Promise((resolve, reject) => {
      Taro.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          if (res.confirm) {
            Taro.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
                  _this.openSetting().then(res => {
                    resolve(true)
                  })
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            _this.openSetting().then(res => {
              resolve(true)
            })
          }
        }
      })
    })
    return promise;
  }

  takePhoto = () => {
    const ctx = Taro.createCameraContext()
    const token = Taro.getStorageSync('token')
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        this.setState({
          src: res.tempImagePath
        })
        Taro.setStorageSync('face', res.tempImagePath)
        const FormData = require('../../formData.js')
        let formData = new FormData()
        formData.appendFile('file',res.tempImagePath)
        let data = formData.getData();

        Taro.request({
          url: 'https://123.249.122.174:9999/user/face',
          method: 'POST',
          data: data.buffer,
          header: {
            'content-type': data.contentType,
            'token': token
          },
          success: function (res) {
            console.log(res)
            if (res.data.code === 20000) {
              Taro.atMessage({
                message: '人脸采集成功！',
                type: 'type'
              })
        
              setTimeout(()=>{
                Taro.switchTab({
                  url:"../../pages/index/index"
                })
              },1000)
            } 
            else if (res.data.code === 20001) {
              Taro.atMessage({
                message: `${res.data.message}`,
                type: 'error'
              })
            }
          }
        })
        // Taro.previewImage({
        //   current: res.tempImagePath, // 当前显示图片的http链接
        //   urls: [res.tempImagePath] // 需要预览的图片http链接列表
        // })
      }
    })
  }

  render() {
    return (
      <View className='index'>
        <AtMessage />
        <View class='camera'>
          {/* <Image src="/images/border.png" mode="widthFix"></Image> */}
          <Camera v-if={this.state.isAuth} className='camera' devicePosition="front" flash="off" binderror="error"></Camera>
        </View>
        <View className='text'>
          <Text>请将正面人脸放在识别框中，进行拍摄</Text>
        </View>
        <Button className='photoButton' class="takePhoto" type="primary" onClick={this.takePhoto}>拍照</Button>
      </View>
    )
  }
}
