import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtGrid, AtMessage } from "taro-ui"


import work from '../../img/work.png'
import pay from '../../img/pay.png'
import door from '../../img/door.png'
import unlock from '../../img/unlock.png'
import help from '../../img/help.png'

import './index.scss'

export default class Index extends Component {
  state = {
    accountNumber: '',
    password: '',
    face:''
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onLoad = () => {
    const accountNumber = Taro.getStorageSync('accountNumber')
    const password = Taro.getStorageSync('password')
    const face = Taro.getStorageSync('face')
    console.log(face)
    this.setState({
      accountNumber,
      password,
      face
    })
    console.log(accountNumber, password)
  }

  // itemClick = (item, index) => {
  //   Taro.navigateTo({ url: '../../pages/getFace/index' })

  // }
  handleClick = () => {
    Taro.navigateTo({ url: '../../pages/updateInformation/index' })
  }
  faceCheckClick = () =>{
    Taro.switchTab({url:'../../pages/faceCheckTab/index'})
  }
  render() {
    return (

      <View className='index'>
        <AtMessage />
        <View className='userInfo'>
          <AtAvatar className='userAvatar' size='large' image={this.state.face}></AtAvatar>
          <View className='accountName'><Text>默认用户</Text></View>
          <View className='accountNumber'><Text>账号：{this.state.accountNumber}</Text></View>
          <View className='right'><AtIcon value='chevron-right' size='30' color='black' onClick={this.handleClick}></AtIcon></View>
        </View>

        <View className='application'>
          <View className='applicationText'><Text>应用场景</Text></View>
          <AtGrid onClick={this.faceCheckClick.bind(this)} data={
            [
              {
                image: work,
                value: '上班打卡',
              },
              {
                image: pay,
                value: '人脸支付'
              },
              {
                image: door,
                value: '智能门锁'
              },
              {
                image: unlock,
                value: '面部解锁'
              }
            ]
          } />
        </View>
        <View className='help'>
          <Image src={help} className='helpImg' />
        </View>
      </View>
    )
  }
}
