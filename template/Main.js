import Game          from '../u2dkit/Game.js'
import projectConfig from './ProjectConfig.js'

let game = Game.instance
game.init(projectConfig)
game.run()



