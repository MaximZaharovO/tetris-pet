
import { useContext, useEffect, useState } from 'react'
import '../App.css'
import Figure from './Figure.jsx'
import FieldContext from '../FieldContext.js'
import useTimerAction from '../hooks/useTimerAction.js'
import Block from './Block.jsx'
import useKeysAction from '../hooks/useKeysAction.js'
import FIGURES from '../Figures.js'

function Field() {
    const fieldsSettings = useContext(FieldContext)

    const [stop, setStop] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const [cords, setCords] = useState({x: 6, y: 0, rotation: 0})
    const [currentFigure, setCurrentFigure] = useState([[]])
    const [usedBlocks, setUsedBlocks] = useState([])

    const [leftPressed, rightPressed, upPressed, downPressed] = useKeysAction()

    const [pauseDown, pauseManualDown, pauseManualLeft, pauseManualRight] = useTimerAction(50, updateCords, [
        {
            editArgs: (args) => args == null ? {XOffset: 0, YOffset: 1} : {...args, YOffset: args.YOffset + 1},
            launchOnCount: 20
        },
        {
            editArgs: (args) => args == null ? {XOffset: 0, YOffset: 1} : {...args, YOffset: args.YOffset + 1},
            pause: true,
            launchOnCount: 1
        },
        {
            editArgs: (args) => args == null ? {XOffset: -1, YOffset: 0} : {...args, XOffset: args.XOffset - 1},
            pause: true,
            launchOnCount: 1
        },
        {
            editArgs: (args) => args == null ? {XOffset: 1, YOffset: 0} : {...args, XOffset: args.XOffset + 1},
            pause: true,
            launchOnCount: 1
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
        if (isFirst) {
            saveFigures()
            setIsFirst(false)
        }
    }, [isFirst])

    useEffect(() => {
        pauseDown(downPressed)
        pauseManualDown(!downPressed)
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
        const baseXCord = 6;
        const baseYCord = 0;
        const baseRotation = 0;

        let defeat = newBlocks.some(newBlock => usedBlocks.some(usedBlock => usedBlock.x === newBlock[baseRotation].XOffset + baseXCord 
            && usedBlock.y === newBlock[baseRotation].YOffset + baseYCord));
        
        if (defeat) {
            alert("КОНЕЦ")
            setStop(true);
            return;
        }

        setCurrentFigure(newBlocks)
        setCords({
            x:baseXCord,
            y:baseYCord,
            rotation: baseRotation
        })
    }, [usedBlocks])

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
            for (let usedBlock of usedBlocks) {
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
            for (let usedBlock of usedBlocks) {
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
                    y: cords.y + used.YOffset
                }
            })

            setUsedBlocks(prev => addBlocks(prev, newItems))
        }
    }

    function addBlocks(prev, newItems) {
        let newBlocks = [...prev, ...newItems.filter(x => !prev.some(exist => (exist.x === x.x && exist.y === x.y)))]
        newBlocks = newBlocks.map(x => Object.assign({}, x)) // copying

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

        return newBlocks;
    }

    return (
        <div className="field__wrapper"
            style={{width: fieldsSettings.xSize, height: fieldsSettings.ySize}}
        >
            <Figure baseX={cords.x} baseY={cords.y} blocks={currentFigure[cords.rotation]}/>

            {usedBlocks.map(block => <Block key={`${block.x}-${block.y}`} x={block.x} y={block.y}/>)}
        </div>
    )
}

export default Field