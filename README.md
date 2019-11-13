# 如何使用
完整示例参考template文件夹

## 配置文件设置
设置canvas组件id,宽高,u2dkit包路径，以及初始场景

```
const projectConfig = {
  canvasID: 'uans3k',
  designX: 610, 
  designY: 545,
  fps: 60,
  /**
   * the path is related to where load the "Game.js"
   */
  u2dkitDir: '../u2dkit',
  resourceDir: './Resource',
  scenes: Scenes
}
```

##初始场景配置
