import { useState, useEffect } from 'react'
import { NavBar, Card, ImageUploader, Input, Button, Toast } from 'antd-mobile'
import type { ImageUploadItem } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { get, post, baseURL } from '@/utils'
import axios from 'axios'
import s from './style.module.less';

type UserInfo = {
  username?: string
  avatar?: string
  signature?: string
}
const UserInfo = () => {
  const navigateTo = useNavigate()
  const token = localStorage.getItem('token')
  const [user, setUser] = useState({}); // 用户
  const [avatar, setAvatar] = useState(''); // 头像
  const [signature, setSignature] = useState(''); // 个签
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const back = () => {
    navigateTo(-1)
  }
  const upload = (file: File) => {
    console.log(file)
    let formData = new FormData()
    formData.append('file', file)
    axios({
      method: 'post',
      url: `${baseURL}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }).then(res => {
      console.log("res", res)
      setAvatar(res)
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          url: 'xxx',
        })
      }, 1000)
    })
  }
  // 删除图片
  const handleDelete = () => {
    setFileList([])
    setAvatar('')
  }
  const handleSubmit = () => {
    console.log("xx", avatar)
    if (!avatar) {
      Toast.show({content: "请上传头像"})
    }
    if (!signature) {
      Toast.show({content: "请填写个性签名"})
    }
    post('/user/edit_userinfo', {
      signature,
      avatar
    }).then(() => {
      Toast.show({
        icon: "success",
        content: "编辑信息成功"
      })
      navigateTo(-1)
    })
  }
  const getUserInfo = () => {
    get('/user/get_userinfo').then(res => {
      setUser(res);
      setAvatar(res.avatar)
      setSignature(res.signature)
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
    <Card title='个人资料' className={s.userinfo}>
      <ImageUploader
        value={fileList}
        upload={upload}
        maxCount={1}
        onDelete={ handleDelete }>
      </ImageUploader>
    </Card>
    <Card title='个性签名' className={s.userinfo}>
      <div className={s.signature}>
        <Input
          clearable
          type="text"
          value={signature}
          placeholder="请输入个性签名"
          onChange={val => {
            setSignature(val)
          }}
        />
      </div>
    </Card>
    <div className={s.saveBtn}>
      <Button block color='primary' size='large' onClick={ handleSubmit }>
        保 存
      </Button>
    </div>
  </>)
}

export default UserInfo