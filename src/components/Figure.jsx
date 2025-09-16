import Block from "./Block"

function Figure({
    baseX,
    baseY,
    blocks
}) {
    return (
        <>
            {blocks.map(block => {
                return (<Block key={`${block.XOffset}-${block.YOffset}`} x={baseX + block.XOffset} y={baseY + block.YOffset}/>)
            })}
        </>
    )
}

export default Figure