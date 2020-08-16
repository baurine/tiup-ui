import React, { useState } from 'react'
import { Button, Drawer, Modal, Space } from 'antd'
import MachineForm, { IMachine } from './MachineForm'

export default function Machines() {
  const [showForm, setShowForm] = useState(false)
  const [machines, setMachines] = useState<{ [key: string]: IMachine }>({})
  const [curMachine, setCurMachine] = useState<IMachine | undefined>(undefined)

  function handleAddMachine(machine: IMachine) {
    let dup = Object.values(machines).find((m) => m.host === machine.host)
    if (dup !== undefined) {
      Modal.error({
        title: '添加失败',
        content: `该主机 ${machine.host} 已存在`,
      })
      return
    }

    dup = Object.values(machines).find((m) => m.name === machine.name)
    if (dup !== undefined) {
      Modal.error({
        title: '添加失败',
        content: `该主机 name ${machine.name} 已被使用`,
      })
      return
    }

    setMachines({ ...machines, [machine.id]: machine })
    setShowForm(false)
  }

  function handleUpdateMachine(machine: IMachine) {
    let dup = Object.values(machines).find((m) => m.host === machine.host)
    if (dup && dup.id !== machine.id) {
      Modal.error({
        title: '添加失败',
        content: `该主机 ${machine.host} 已存在`,
      })
      return
    }

    dup = Object.values(machines).find((m) => m.name === machine.name)
    if (dup && dup.id !== machine.id) {
      Modal.error({
        title: '添加失败',
        content: `该主机 name ${machine.name} 已被使用`,
      })
      return
    }
    setMachines({
      ...machines,
      [machine.id]: machine,
    })
    setShowForm(false)
  }

  function addMachine() {
    setCurMachine(undefined)
    setShowForm(true)
  }

  function editMachine() {
    setCurMachine(Object.values(machines)[0])
    setShowForm(true)
  }

  return (
    <div>
      <Space>
        <Button type="primary" onClick={addMachine}>
          添加机器
        </Button>
        <Button type="primary" onClick={editMachine}>
          编辑机器
        </Button>
      </Space>

      <pre>{JSON.stringify(machines, undefined, 2)}</pre>

      <Drawer
        title={curMachine ? '修改 SSH 远程主机' : '添加 SSH 远程主机'}
        width={400}
        bodyStyle={{ padding: 0 }}
        closable={true}
        visible={showForm}
        onClose={() => setShowForm(false)}
        destroyOnClose={true}
      >
        <MachineForm
          machines={machines}
          machine={curMachine}
          onAdd={handleAddMachine}
          onUpdate={handleUpdateMachine}
        />
      </Drawer>
    </div>
  )
}
