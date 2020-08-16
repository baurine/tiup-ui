import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  HddOutlined,
  DeploymentUnitOutlined,
  ClusterOutlined,
} from '@ant-design/icons'

import Machines from './pages/Machines'

import './App.less'

const { Sider, Content } = Layout

function Deployment() {
  return <div>Deployment</div>
}

function Clusters() {
  return <div>Clusters</div>
}

function SiderMenu() {
  return (
    <Sider collapsible>
      <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline">
        <Menu.Item key="/" icon={<HddOutlined />}>
          <NavLink to="/">配置机器</NavLink>
        </Menu.Item>
        <Menu.Item key="/deploy" icon={<DeploymentUnitOutlined />}>
          <NavLink to="/deploy">部署</NavLink>
        </Menu.Item>
        <Menu.Item key="/clusters" icon={<ClusterOutlined />}>
          <NavLink to="/clusters">集群管理</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu />
        <Content style={{ backgroundColor: 'white', padding: '24px' }}>
          <Routes>
            <Route path="/" element={<Machines />} />
            <Route path="/deploy" element={<Deployment />} />
            <Route path="/clusters" element={<Clusters />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
