import { useDrag } from "react-dnd";

function TestDrag() {

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        item: {name: "checkbox"},
            // The collect function utilizes a "monitor" instance (see the Overview for what this is)
            // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
        isDragging: monitor.isDragging()
        })
    }))
        
    return (
        
        <div style={{width: "15px", height:"15px", backgroundColor:"red", cursor: "pointer"}} ref={drag}>

        </div>
    );
}

export default TestDrag;
