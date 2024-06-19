import React, { useState, useEffect } from 'react'
import { NavBar, Card, ImageUploader } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { useNavigate } from 'react-router-dom'
import { get } from '@/utils'
type UserInfo = {
  username?: string
  avatar?: string
  signature?: string
}
const UserInfo = () => {
  const navigateTo = useNavigate()
  const [userinfo, setUserinfo] = useState<UserInfo>({})
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const back = () => {
    navigateTo(-1)
  }
  const upload = (file: File) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          url: 'xxx',
        })
      }, 1000)
    })
  }
  const getUserInfo = () => {
    get('/user/get_userinfo').then(res => {
      console.log(res)
      setUserinfo(res)
      setFileList([{
        url: res.avatar,
      }])
    })
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (<>
    <NavBar back='返回' onBack={back}>用户信息</NavBar>
    <Card title='个人资料'>
      <ImageUploader value={fileList} upload={upload}></ImageUploader>
    </Card>
  </>)
}

export default UserInfo