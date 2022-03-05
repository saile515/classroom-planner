import { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";

import Student from "./Student";
import { Vector } from "../hooks/useDragAndDrop";
import useDrawLine from "../hooks/useDrawLine";

export enum CanvasState {
	DrawLine,
	PlaceSeat,
}

export default function Canvas(props: { canvasState: CanvasState; setCanvasState: Dispatch<SetStateAction<CanvasState>> }) {
	const ref = useRef<SVGSVGElement>();
	const [students, setStudents] = useState<ReactElement[]>([]);
	const [eventListeners, setEventListeners] = useState<any>({});
	const [roomVertices, addVertex, previewVertex, drawActive] = useDrawLine(ref, props.canvasState);

	function leaveState(event: KeyboardEvent) {
		if (event.key == "Enter") {
			setEventListeners({});
			props.setCanvasState(null);
			drawActive(false);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("nameList"))
			setStudents(
				JSON.parse(localStorage.getItem("nameList")).map((name: { first: string; last: string }, index: number) => (
					<Student
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

	useEffect(() => {
		setEventListeners({});
		drawActive(false);

		switch (props.canvasState) {
			case CanvasState.DrawLine:
				drawActive(true);
				setEventListeners({
					onClick: addVertex,
					onMouseMove: previewVertex,
					onKeyDown: leaveState,
				});
				break;
		}
	}, [props.canvasState]);

	return (
		<svg height="100%" width="100%" ref={ref} tabIndex={0} className=" outline-none" {...eventListeners}>
			{props.canvasState == CanvasState.DrawLine ? (
				roomVertices.map((vertex, index) => {
					if (roomVertices[index + 1])
						return (
							<line key={vertex.x + vertex.y + Math.random()} x1={vertex.x} y1={vertex.y} x2={roomVertices[index + 1].x} y2={roomVertices[index + 1].y} stroke="black" strokeWidth="5" />
						);
					else return null;
				})
			) : (
				<polygon points={roomVertices.map((vertex) => `${vertex.x}, ${vertex.y}`).join(" ")} />
			)}

			{students}
		</svg>
	);
}
