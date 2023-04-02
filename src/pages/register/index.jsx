import { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Form, Input, Button, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton ,AtMessage} from 'taro-ui'
import './index.scss'
import ajax from '../../Util/ajax'
import logo from '../../img/logo.png'
export default class Index extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            accountNumber: '',
            password: '',
            passwordAgain: ''
        }
    }

    registerClick = () => {
        Taro.navigateTo({ url: '../../pages/login/index' })
    }
    formSubmit(e) {
        // console.log(e.detail.value)
        const { accountNumber, password, passwordAgain } = e.detail.value
        this.setState({
            accountNumber,
            password,
            passwordAgain
        })
        Taro.request({
            url: `https://123.249.122.174:9999/user/register`,
            method: 'POST',
            data: {
                username: accountNumber,
                password: password
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                if(res.data.code === 20000){
                    Taro.atMessage({
                        'message': `注册成功！`,
                        'type': 'type',
                    })
                    setTimeout(()=>{
                        Taro.navigateTo({
                            url:'../../pages/login/index'
                        })
                    },1000)   
                }
                else if(res.data.code === 20001){
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
                    <View className='form'>
                        <Form
                            onSubmit={this.formSubmit.bind(this)}
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
                            // onConfirm={this.handleConfirmPsw.bind(this)}
                            />
                            <Input
                                name='passwordAgain'
                                className='password'
                                type='password'
                                placeholder='请再次输入密码'
                                value={this.state.passwordAgain}
                            // onChange={this.handleConfirmPswAgain.bind(this)}
                            />
                            <Button formType='submit' className='button' type='primary' size='normal'>注册</Button>
                            <Text className='bottomText'>已有账号？去<Text onClick={this.registerClick} className='toLogin'>登录</Text></Text>
                        </Form>
                    </View>
                </View>
            </>
        )
    }

}