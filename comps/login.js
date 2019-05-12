import React, { useEffect, useState } from 'react';
import axios from '../js/axios'
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    View
} from 'native-base';
import {Alert} from 'react-native'

export default (props) => {
    let [user, setUser] = useState("")
    let [pass, setPass] = useState("")

    return (
        <Container >
            <Form>
                <FormItem floatingLabel>
                    <Label>用户名</Label>
                    <Input onChangeText={(text) => {
                        setUser(text)
                    }} />
                </FormItem>
                <FormItem floatingLabel last>
                    <Label>密码</Label>
                    <Input secureTextEntry={true} onChangeText={(text) => {
                        setPass(text)
                    }} />
                </FormItem>
            </Form>
            <View style={{ marginTop: '10%' }}>
                <Button info style={{ padding: '10%', alignSelf: 'center' }} onPress={() => {
                    console.log(user)
                    console.log(pass)
                    axios('/api/user/login', {
                        method: 'post',
                        data: { username: user, password: pass },
                        
                    }).then((res) => {
                        console.log(res)
                        Alert.alert('🦆', 
                        res.data)
                        props.setLoginState(true)
                    }).catch(error=>{
                        if (error.response.status === 401) {
                            Alert.alert('🙅', 
                            error.response.data)
                        }
                        
                    })
                }}>
                    <Text>登录</Text>
                </Button>
            </View>

        </Container>
    );

}