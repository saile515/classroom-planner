import useDragAndDrop, { Vector } from "../hooks/useDragAndDrop";

import { useRef } from "react";

export default function Student(props: { parentBoundingRect: DOMRect; name: { first: string; last: string }; position: Vector }) {
	const ref = useRef<SVGRectElement>();
	const [startDrag, endDrag, handleDrag, position] = useDragAndDrop({ element: ref, initialPosition: props.position, parentBoundingRect: props.parentBoundingRect });
	const scale = 50;

	return (
		<g>
			<rect
				x={position.x}
				y={position.y}
				width={scale}
				height={scale}
				className=" cursor-move border-slate-200 stroke-slate-200 stroke-2"
				onMouseDown={startDrag}
				onMouseUp={endDrag}
				onMouseLeave={endDrag}
				onMouseMove={handleDrag}
				ref={ref}
			/>

			<foreignObject x={position.x} y={position.y} width={scale} height={scale} className=" pointer-events-none bg-blue-700">
				<p className={"text-white text-[10px] p-[2px]"}>
					<span className=" block whitespace-nowrap overflow-ellipsis overflow-hidden">{props.name.first}</span>{" "}
					<span className=" block whitespace-nowrap overflow-ellipsis overflow-hidden">{props.name.last}</span>
				</p>
			</foreignObject>
		</g>
	);
}
