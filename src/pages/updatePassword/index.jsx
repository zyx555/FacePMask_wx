import { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import { AtList, AtListItem, AtMessage } from 'taro-ui'
import './index.scss'


export default class Index extends Component {
    state = {
        accountNumber: '',
        password: '',
        passwordAgain: '',
        token: ''
    }
    onLoad = () => {
        const accountNumber = Taro.getStorageSync('accountNumber')
        const password = Taro.getStorageSync('password')
        const token = Taro.getStorageSync('token')
        console.log(token)
        this.setState({
            accountNumber,
            password,
            token
        })
        console.log(accountNumber, password)
    }
    onSubmit = (e) => {
        console.log(e.detail.value)
        const { passwordAgain } = e.detail.value

        Taro.request({
            url: 'https://123.249.122.174:9999/user/update',
            method: 'POST',
            data: {
                username: this.state.accountNumber,
                password: passwordAgain
            },
            header: {
                'content-type': 'application/json',
                'token': this.state.token
            },
            success: function (res) {
                console.log(res)
                if (res.data.code === 20000) {
                    Taro.atMessage({
                        'message': `修改密码成功！`,
                        'type': 'type',
                        'duration': 1000
                    })
                    setTimeout(() => {
                        Taro.switchTab({
                            url: '../../pages/index/index'
                        })
                    }, 1000)
                }
                else {
                    Taro.atMessage({
                        'message': '错误',
                        'type': 'error'
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
                    <Form onSubmit={this.onSubmit}>
                        <View className='text'>
                            <Text>
                                账号：{this.state.accountNumber}
                            </Text>
                        </View>
                        <View className='text'>
                            <Text>
                                原密码：{this.state.password}
                            </Text>
                        </View>
                        <Input
                            name='passwordAgain'
                            className='password'
                            type='password'
                            placeholder='请输入新密码'
                            value={this.state.passwordAgain}
                        // onChange={this.handleChange.bind(this)}
                        />
                        <Button formType='submit' className='button' type='primary' size='normal'>提交修改</Button>
                    </Form>
                </View>
            </>
        )
    }

}