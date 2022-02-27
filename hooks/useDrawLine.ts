import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";

import { CanvasState } from "../components/Canvas";
import { Vector } from "./useDragAndDrop";

export default function useDrawLine(
	container: MutableRefObject<SVGSVGElement>,
	canvasState: CanvasState
): [Vector[], (event: MouseEventInit) => void, (event: MouseEventInit) => void, Dispatch<SetStateAction<boolean>>] {
	const [roomVertices, setRoomVertices] = useState<Vector[]>([{ x: 0, y: 0 }]);
	const [isActive, setIsActive] = useState<boolean>(false);

	function addVertex(event: MouseEventInit) {
		const boundingRect: DOMRect = container.current.getBoundingClientRect();
		const tempVertices = roomVertices;
		tempVertices[tempVertices.length - 1] = { x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top };
		tempVertices.push({ x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top });
		setRoomVertices(tempVertices);
	}

	function previewVertex(event: MouseEventInit) {
		const boundingRect: DOMRect = container.current.getBoundingClientRect();
		const tempVertices = [...roomVertices];
		tempVertices[tempVertices.length - 1] = { x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top };
		setRoomVertices(tempVertices);
	}

	useEffect(() => {
		if (isActive) {
			const tempVertices = roomVertices;
			tempVertices.push(tempVertices[tempVertices.length - 1]);
			setRoomVertices(tempVertices);
		} else {
			const tempVertices = [...roomVertices];
			tempVertices.pop();
			setRoomVertices(tempVertices);
		}
	}, [isActive]);

	return [roomVertices, addVertex, previewVertex, setIsActive];
}
