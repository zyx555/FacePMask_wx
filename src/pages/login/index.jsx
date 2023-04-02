import { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Form, Input, Button, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtMessage } from 'taro-ui'
import './index.scss'

import logo from '../../img/logo.png'
export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {

            accountNumber: '',
            password: ''

        }
    }

    registerClick = () => {
        // console.log('111')
        Taro.navigateTo({ url: '../../pages/register/index' })
    }

    handleConfirm(value) {
        this.setState({
            data
        })
    }
    onSubmit = (e) => {
        const { accountNumber, password} = e.detail.value
        this.setState({
            accountNumber,
            password
        })
        Taro.request({
            url: `https://123.249.122.174:9999/user/login`,
            method: 'POST',
            data: {
                username: accountNumber,
                password: password
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                
                if (res.data.code === 20000) {
                    const token = res.data.data.token
                    Taro.atMessage({
                        'message': `欢迎你！${accountNumber}`,
                        'type': 'type',
                    })
                    Taro.setStorageSync('accountNumber',accountNumber)
                    Taro.setStorageSync('password', password)
                    Taro.setStorageSync('token',token)
                    setTimeout(() => {
                        Taro.switchTab({
                            url: '../index/index'
                        })
                    }, 1000)

                }
                else if (res.data.code === 20001) {
                    Taro.atMessage({
                        'message': `${res.data.message}`,
                        'type': 'error',
                    })
                }

            }
        })

    }
    render() {
        return (
            <>
                <View className='index'>
                    <AtMessage />
                    <View className='logo'>
                        <Image className='logoImg' src={logo}></Image>
                    </View>
                    <View>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <Input
                                name='accountNumber'
                                className='accountNumber'
                                type='text'
                                placeholder='请输入账号'
                                value={this.state.accountNumber}
                            // onConfirm={this.handleConfirm.bind(this)}
                            />
                            <Input
                                name='password'
                                className='password'
                                type='password'
                                placeholder='请输入密码'
                                value={this.state.password}
                            // onConfirm={this.handleConfirm.bind(this)}
                            />
                            <Button formType='submit' className='button' type='primary' size='normal'>登录</Button>
                            <Text className='registerText' onClick={this.registerClick}>立即注册</Text>
                        </Form>
                    </View>
                </View>
                <View className='bottom'>
                    <Text className='bottomText'>登录/注册即代表同意《用户协议》和《隐私政策》</Text>
                </View>
            </>
        )
    }

}