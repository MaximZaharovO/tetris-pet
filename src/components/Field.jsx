
import { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import Figure from './Figure.jsx'
import FieldContext from '../FieldContext.js'
import useTimerAction from '../hooks/useTimerAction.js'
import Block from './Block.jsx'
import useKeysAction from '../hooks/useKeysAction.js'
import FIGURES from '../Figures.js'

import {ReactComponent as DownSVG} from '../icons/down.svg'
import {ReactComponent as LeftSVG} from '../icons/left.svg'
import {ReactComponent as RightSVG} from '../icons/right.svg'
import {ReactComponent as RotateSVG} from '../icons/rotate.svg'

function Field({reset}) {
    const fieldsSettings = useContext(FieldContext)

    const isMobile = isMobileOrTablet();

    const downRef = useRef(null)
    const upRef = useRef(null)
    const leftRef = useRef(null)
    const rightRef = useRef(null)

    const [stop, setStop] = useState(false)
    const [cords, setCords] = useState({x: 0, y: 0, rotation: 0})
    const [currentFigure, setCurrentFigure] = useState([[]])
    const [field, setField] = useState({blocks: [], score: 0})
    const [figuresPlaced, setFiguresPlaced] = useState(0)
    const [leftPressed, rightPressed, upPressed, downPressed] = useKeysAction(downRef, upRef, leftRef, rightRef)

    const [pauseDown, pauseManualDown, pauseManualLeft, pauseManualRight] = useTimerAction(75, updateCords, [
        {
            // autoDOWN
            editArgs: (args) => args == null ? {XOffset: 0, YOffset: 1} : {...args, YOffset: args.YOffset + 1},
            launchOnCount: 15 - (figuresPlaced / 1),
            accelerateOnCount: 300
        },
        {
            // manualDOWN
            editArgs: (args) => args == null ? {XOffset: 0, YOffset: 1} : {...args, YOffset: args.YOffset + 1},
            pause: true,
            launchOnCount: 1
        },
        {
            // manualLEFT
            editArgs: (args) => args == null ? {XOffset: -1, YOffset: 0} : {...args, XOffset: args.XOffset - 1},
            pause: true,
            launchOnCount: 1
        },
        {
            // manualRIGHT
            editArgs: (args) => args == null ? {XOffset: 1, YOffset: 0} : {...args, XOffset: args.XOffset + 1},
            pause: true,
            launchOnCount: 1 // Должно быть единицей, чтобы нормально работало смещение в сторону перед заверешением
        },
    ], stop)

    function updateCords(offset) {
        setCords(prev => {
            let yValue = prev.y
            if(offset.YOffset !== 0) {
                if (canBeMovedDown(prev, offset)) {
                    yValue += offset.YOffset;
                }
            }

            let xValue = prev.x
            if(offset.XOffset !== 0 && canBeMovedX(prev, offset)) {
                xValue += offset.XOffset;
            }

            return {...prev, y: yValue, x: xValue}
        })
    }

    useEffect(() => {
        pauseDown(downPressed)
        pauseManualDown(!downPressed)

        if (downPressed) {
            updateCords({XOffset: 0, YOffset: 1})
        }
    }, [downPressed])

    useEffect(() => {
        if (upPressed) {
            setCords(prev => {
                if (canBeRotated(prev)) {
                    return {...prev, rotation: nextRotation(prev, currentFigure)}
                }
                return prev
            })
        }
    }, [upPressed])

    useEffect(() => {
        if (leftPressed && rightPressed) {
            pauseManualLeft(true)
            pauseManualRight(true)
            return;
        }

        if (leftPressed) {
            updateCords({XOffset: -1, YOffset: 0})
        }
        else if (rightPressed) {
            updateCords({XOffset: 1, YOffset: 0})
        }
        
        pauseManualLeft(!leftPressed)
        pauseManualRight(!rightPressed)
    }, [leftPressed, rightPressed])

    useEffect(() => {
        if (!stop && !canBeMovedDown(cords, {YOffset: 1, XOffset: 0})) {
            saveFigures()
        }
    }, [cords])

    useEffect(() => {
        let newBlocks = FIGURES[getRandomInt(FIGURES.length)]
        const baseXCord = fieldsSettings.xBase;
        const baseYCord = 0;
        const baseRotation = 0;

        let defeat = newBlocks.some(newBlock => field.blocks.some(usedBlock => usedBlock.x === newBlock[baseRotation].XOffset + baseXCord 
            && usedBlock.y === newBlock[baseRotation].YOffset + baseYCord));
        
        if (defeat) {
            setStop(true);
            return;
        }

        setCurrentFigure(newBlocks)
        setCords({
            x:baseXCord,
            y:baseYCord,
            rotation: baseRotation
        })
        pauseDown(false)
    }, [field])

    function nextRotation(cords, currentFigure) {
        return cords.rotation + 1 < currentFigure.length ? cords.rotation + 1 : 0
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function canBeRotated(prev) {

        let changedRotation = {...prev, rotation: nextRotation(prev, currentFigure)}

        let yNotBlocked = canBeMovedDown(changedRotation, {XOffset: 0, YOffset: 0})
        let xNotBlocked = canBeMovedX(changedRotation, {XOffset: 0, YOffset: 0})
        if (!yNotBlocked || !xNotBlocked) {
            return false;
        }
        return true
    }

    function canBeMovedDown(prev, offset) {
        for (let currentBlock of currentFigure[prev.rotation]) {

            let newBlockY = prev.y + offset.YOffset + currentBlock.YOffset;

            if (newBlockY < 0 || newBlockY > fieldsSettings.yLastPoint - 1) {
                return false;
            }

            let newBlockX = prev.x + currentBlock.XOffset // + offset.XOffset 
            for (let usedBlock of field.blocks) {
                let onOneY = newBlockY === usedBlock.y
                if (newBlockX === usedBlock.x && onOneY) {
                    return false;
                }
            }
        }
        return true;
    }

    function canBeMovedX(prev, offset) {
        for (let currentBlock of currentFigure[prev.rotation]) {

            let newBlockX = prev.x + offset.XOffset + currentBlock.XOffset;

            if (newBlockX < 0 || newBlockX > fieldsSettings.xLastPoint - 1) {
                return false;
            }

            let newBlockY = prev.y + offset.YOffset + currentBlock.YOffset
            for (let usedBlock of field.blocks) {
                let onOneY = newBlockY === usedBlock.y
                if (newBlockX === usedBlock.x && onOneY) {
                    return false;
                }
            }
        }
        return true;
    }

    function saveFigures() {
        if (currentFigure[cords.rotation].length > 0) {
            const newItems = currentFigure[cords.rotation].map(used => {
                return {
                    x: cords.x + used.XOffset,
                    y: cords.y + used.YOffset,
                    color: used.color
                }
            })

            setFiguresPlaced(prev => prev + 1)

            pauseDown(true)

            setField(prev => addBlocks(prev, newItems))
        }
    }

    function addBlocks(prev, newItems) {
        let newBlocks = [...prev.blocks, ...newItems.filter(x => !prev.blocks.some(exist => (exist.x === x.x && exist.y === x.y)))]
        newBlocks = newBlocks.map(x => Object.assign({}, x)) // copying

        let score = prev.score

        let levelsCount = newBlocks.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue.y]) {
                accumulator[currentValue.y] += 1 
            }
            else {
                accumulator[currentValue.y] = 1
            }
            return accumulator
        }, {})

        const yToRemove = Object.keys(levelsCount).filter(x => levelsCount[x] >= fieldsSettings.xLastPoint)
            .map(x => parseInt(x))

        if (yToRemove.length > 0) {
            score += yToRemove.length;

            newBlocks = newBlocks.filter(x => !yToRemove.includes(x.y))
            newBlocks = newBlocks.map(newBlock => {
                const yOffset = yToRemove.reduce((sum, cur) => {
                    if (cur > newBlock.y) {
                        sum++
                    }
                    return sum
                }, 0)
                newBlock.y += yOffset
                return newBlock
            })
        }

        return {blocks: newBlocks, score};
    }

    function isMobileOrTablet() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    return (
        <>
            <div className="field__score">{field.score}</div>
            <div className="field__wrapper"
                style={{width: fieldsSettings.xSize, height: fieldsSettings.ySize}}
            >
                <Figure baseX={cords.x} baseY={cords.y} blocks={currentFigure[cords.rotation]}/>

                {field.blocks.map(block => <Block key={`${block.x}-${block.y}`} color={block.color} x={block.x} y={block.y}/>)}

                {stop && <div className='APP__MODAL__STOP'>
                    <div className='APP_MODAL_HEADER' style={{textAlign: "center"}}>ИГРА ЗАВЕРШЕНА</div>
                    <div>СЧЕТ: {field.score}</div>
                    <div onClick={() => reset()} className='APP_RESTART'>Перезапустить</div>
                </div>}
            </div>
            {isMobile && <div className="field_controls">
                <div ref={upRef} className='svg__control'><RotateSVG  fill='#0096c7'        width={75}/></div>
                <div className='field_controls__bottom'>
                    <div ref={leftRef} className='svg__control'><LeftSVG    fill='#0096c7'  width={75}/></div>
                    <div ref={downRef} className='svg__control'><DownSVG    fill='#0096c7'  width={75}/></div>
                    <div ref={rightRef} className='svg__control'><RightSVG   fill='#0096c7' width={75}/></div>
                </div>
            </div>}
        </>
    )
}

export default Field