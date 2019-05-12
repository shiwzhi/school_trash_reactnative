import React, { useEffect, useState } from 'react';
import axios from '../js/axios'

import { View, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Header, Body, List, ListItem, Text, Icon, Item, Input } from 'native-base';
import { Button, SearchBar } from 'react-native-elements'

function LittleStar(props) {
    // console.log(props.deviceId)
    let [star, setStar] = useState(false)

    useEffect(() => {
        var userDevices = new Set(props.userInfo.devices)
        if (userDevices.has(props.deviceId)) {
            setStar(true)
        } else {
            setStar(false)
        }
    }, [props.userInfo.devices])

    if (props.userInfo.username === undefined) {
        return (null)
    } else {
        var userDevices = new Set(props.userInfo.devices)
        if (star) {
            return (
                <Icon name="star" onPress={() => {
                    console.log(props.deviceId)
                    axios.post("/api/user/save_device", {
                        deviceId: props.deviceId,
                        action: "unstar"
                    }).then(result => {
                        setStar(false)
                    }).catch(error => {
                        console.log(error)
                    })
                }}></Icon>
            )
        } else {
            return (
                <Icon name="star-outline" onPress={() => {
                    console.log(props.deviceId)
                    axios.post("/api/user/save_device", {
                        deviceId: props.deviceId,
                        action: "star"
                    }).then(result => {
                        setStar(true)
                    }).catch(error => {
                        console.log(error)
                    })
                }}></Icon>
            )
        }
    }
}



function DeviceTable(props) {
    let [deviceData, setDeviceData] = useState([])
    let [refreshing, setRefreshing] = useState(false)
    let [userInfo, setUserInfo] = useState({})

    function getData() {
        axios.get("/api/device/all").then(res => {
            console.log("response data:")
            setDeviceData(res.data)
            setRefreshing(false)
        }).catch(error => {
            if (error.response.status === 401) {
                console.log("user not logged in ")
                setRefreshing(false)
            }
        })
    }

    function getUserInfo() {
        axios.post("/api/user/info").then(res => {
            console.log("getUserinfo")
            console.log(res.data)
            setUserInfo(res.data)

        }).catch(error => {
            setUserInfo({})
            console.log(error)
        })
    }

    useEffect(() => {
        console.log("use effect")
        getData()
        getUserInfo()
    }, [])

    var deviceItems = deviceData.map((device) => (

        <ListItem key={device.deviceid} >
            <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Text>
                        {device.deviceinfo}
                    </Text>
                    <Text>
                        {" ：" + device.trash_data[0].data + "%"}
                    </Text>
                </View>
                <LittleStar deviceId={device.deviceid} userInfo={userInfo} />
            </View>
        </ListItem>

    ))

    return (
        <Container>


            <Content padder refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                console.log("refreshing...")
                setRefreshing(true)
                getData()
                getUserInfo()
            }} />}>
                <View style={{
                    marginLeft: '5%'
                }}>
                    <Item >
                        <Icon name="ios-search" />
                        <Input placeholder="搜索" />
                    </Item>
                </View>

                <List>
                    {deviceItems}
                    {deviceItems}
                    {deviceItems}
                    {deviceItems}

                </List>
            </Content>
        </Container>

    )

}



export default withNavigation(DeviceTable)