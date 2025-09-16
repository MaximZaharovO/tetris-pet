
import { useContext, useEffect, useState, useCallback } from 'react'
import '../App.css'
import Figure from './Figure.jsx'
import FieldContext from '../FieldContext.js'
import useTimerAction from '../hooks/useTimerAction.js'
import Block from './Block.jsx'
import useKeysAction from '../hooks/useKeysAction.js'

const cube = [
    [
        {
            XOffset: 0,
            YOffset: 0,
        },
        {
            XOffset: 1,
            YOffset: 0,
        },
        {
            XOffset: 0,
            YOffset: 1,
        },
        {
            XOffset: 1,
            YOffset: 1,
        },
    ]
]

const FIGURES = [
    cube,
]

function Field() {
    const fieldsSettings = useContext(FieldContext)

    const [stop, setStop] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const [cords, setCords] = useState({x: 0, y: 0})
    const [currentFigure, setCurrentFigure] = useState([[]])
    const [currentFigureRotation, setCurrentFigureRotation] = useState(0)
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
            setCurrentFigureRotation(prev => {
                if (prev + 1 < currentFigure.length) {
                    return prev+1;
                }
                return 0;
            })
        }
    }, [upPressed])

    useEffect(() => {
        updateCords({XOffset: 0, YOffset: 0})
    }, [currentFigureRotation])

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
        if (!canBeMovedDown(cords, {YOffset: 1, XOffset: 0})) {
            saveFigures()
        }
    }, [cords])

    useEffect(() => {
        let newBlocks = cube
        const baseXCord = 0;
        const baseYCord = 0;

        let defeat = newBlocks.some(newBlock => usedBlocks.some(usedBlock => usedBlock.x === newBlock.XOffset + baseXCord 
            && usedBlock.y === newBlock.YOffset + baseYCord));
        
        if (defeat) {
            setStop(true);
            return;
        }

        setCurrentFigureRotation(0)
        setCurrentFigure(newBlocks)
        setCords({x:baseXCord,y:baseYCord})
    }, [usedBlocks])

    function canBeMovedDown(prev, offset) {
        for (let currentBlock of currentFigure[currentFigureRotation]) {

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
        for (let currentBlock of currentFigure[currentFigureRotation]) {

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
        if (currentFigure[currentFigureRotation].length > 0) {
            const newItems = currentFigure[currentFigureRotation].map(used => {
                return {
                    x: cords.x + used.XOffset,
                    y: cords.y + used.YOffset
                }
            })

            setUsedBlocks(prev => [...prev, ...newItems])
        }
    }

    return (
        <div className="field__wrapper"
            style={{width: fieldsSettings.xSize, height: fieldsSettings.ySize}}
        >
            <Figure baseX={cords.x} baseY={cords.y} blocks={currentFigure[currentFigureRotation]}/>

            {usedBlocks.map(block => <Block key={`${block.x}-${block.y}`} x={block.x} y={block.y}/>)}
        </div>
    )
}

export default Field