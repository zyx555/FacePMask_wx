import { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {
 
        }
    }
    handleClick = () =>{
        Taro.navigateTo({url:'../../pages/getFace/index'})
    }
    itemClick = () =>{
        Taro.navigateTo({url:'../../pages/updatePassword/index'})
    }
    render() {
        return (
            <>
         <View className='wrapper'>
            <AtList>
            <AtListItem onClick={this.handleClick} title='人脸采集' arrow='right' />
            <AtListItem onClick={this.itemClick} title='密码修改' arrow='right' />
            </AtList>
         </View>
            </>
        )
    }

}