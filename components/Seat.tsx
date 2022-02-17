import { MouseEvent, useRef, useState } from "react";

interface Position {
	x: number;
	y: number;
}

export default function Seat(props: { parentBoundingRect: DOMRect; name: string }) {
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mouseOffset, setMouseOffset] = useState<Position>({ x: 0, y: 0 });
	const ref = useRef<SVGRectElement>();

	function startDrag(event: MouseEvent) {
		setIsDragging(true);
		const boundingRect = ref.current.getBoundingClientRect();
		setMouseOffset({ x: event.clientX - boundingRect.x, y: event.clientY - boundingRect.y });
	}

	function endDrag() {
		setIsDragging(false);
		setMouseOffset({ x: 0, y: 0 });
	}

	function handleDrag(event: MouseEvent) {
		event.preventDefault();
		if (!isDragging) return;
		const boundingRect = ref.current.getBoundingClientRect();
		setPosition({ x: event.clientX - props.parentBoundingRect.left - mouseOffset.x, y: event.clientY - props.parentBoundingRect.top - mouseOffset.y });
	}

	return (
		<g>
			<rect
				x={position.x}
				y={position.y}
				width={100}
				height={100}
				className=" cursor-move"
				onMouseDown={startDrag}
				onMouseUp={endDrag}
				onMouseLeave={endDrag}
				onMouseMove={handleDrag}
				ref={ref}
			/>
			<foreignObject x={position.x} y={position.y} width="100" height="100" className=" pointer-events-none">
				<p className=" text-white text-[15px]">{props.name}</p>
			</foreignObject>
		</g>
	);
}
