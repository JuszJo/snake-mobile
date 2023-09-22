export default function GameLoop(entities, { events, dispatch }) {
    const head = entities.head

    if(events.length) {
        events.forEach(e => {
            switch (e) {
                case "MOVE_RIGHT":
                    if(head.xspeed == 1) return

                    head.xspeed = 1
                    head.yspeed = 0
                    
                    break;
                    
                case "MOVE_LEFT":
                    if(head.xspeed == -1) return

                    head.xspeed = -1
                    head.yspeed = 0

                break;

                case "MOVE_UP":
                    if(head.yspeed == -1) return

                    head.xspeed = 0
                    head.yspeed = -1

                break;

                case "MOVE_DOWN":
                    if(head.yspeed == 1) return

                    head.xspeed = 0
                    head.yspeed = 1

                break;

                default:
                    break;
            }
        })
    }

    head.nextMove -= 1

    if(head.nextMove === 0) {
        head.nextMove = head.updateFrequency

        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;
    }

    return entities
}