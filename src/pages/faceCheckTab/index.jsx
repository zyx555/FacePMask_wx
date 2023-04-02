import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import faceCheck from '../../img/faceCheck.png'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  faceCheck = () => {
    Taro.navigateTo({ url: "../../pages/check/index" })
  }
  render() {
    return (
      <View className='index'>
        <View>
          <Image className='faceCheck' src={faceCheck} />
        </View>
        <AtButton type='primary' className='check' onClick={this.faceCheck}>开始人脸识别</AtButton>
        <View className='foot'>
          <Text className='footText'>历史记录</Text>
        </View>
      </View>
    )
  }
}
