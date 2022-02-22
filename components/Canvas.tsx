import { ReactElement, useEffect, useRef, useState } from "react";

import Seat from "./Seat";
import useDragAndDrop from "../hooks/useDragAndDrop";

export enum CanvasState {
	DrawLine,
	PlaceSeat,
}

export default function Canvas(props: { canvasState: CanvasState }) {
	const ref = useRef<SVGSVGElement>();
	const [seats, setSeats] = useState<ReactElement[]>([]);
	const draw = useRef<SVGRectElement>();
	const [boundingClientRect, setBoundingClientRect] = useState<DOMRect>(null);
	let [startDrag, endDrag, handleDrag, position] = useDragAndDrop({ element: draw, initialPosition: { x: 0, y: 0 }, parentBoundingRect: boundingClientRect });

	useEffect(() => {
		setBoundingClientRect(ref.current.getBoundingClientRect());
		if (localStorage.getItem("nameList"))
			setSeats(
				JSON.parse(localStorage.getItem("nameList")).map((name: { first: string; last: string }, index: number) => (
					<Seat
						key={name.first + name.last}
						parentBoundingRect={ref.current.getBoundingClientRect()}
						name={name}
						position={{
							x: Math.floor(index / ((ref.current.getBoundingClientRect().height - 55) / 55)) * 55 + 5,
							y: Math.floor(index % ((ref.current.getBoundingClientRect().height - 55) / 55)) * 55 + 5,
						}}
					/>
				))
			);
	}, []);

	return (
		<svg height="100%" width="100%" ref={ref}>
			{seats}
			{props.canvasState == CanvasState.DrawLine ? (
				<rect x={position.x} y={position.y} width="100" height="100" onMouseDown={startDrag} onMouseUp={endDrag} onMouseLeave={endDrag} onMouseMove={handleDrag} ref={draw} />
			) : (
				""
			)}
		</svg>
	);
}
