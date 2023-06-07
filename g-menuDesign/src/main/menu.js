const menu = (version) => [
  {
    label: '記帳程式',
    submenu: [
      {
        label: `關於 記帳程式 v.${version}`,
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  },
  {
    label: '資料管理',
    submenu: [
      {
        label: '課程視窗',
        accelerator: 'CmdOrCtrl+c',
        click: () => {}
      },
      {
        label: '教練視窗',
        accelerator: 'CmdOrCtrl+j',
        click: () => {}
      },
      {
        label: '會員視窗',
        accelerator: 'CmdOrCtrl+p',
        click: () => {}
      },
      {
        type: 'separator'
      },
      {
        label: '關閉',
        accelerator: 'CmdOrCtrl+Q',
        role: 'close'
      }
    ]
  }
]

export default menu
