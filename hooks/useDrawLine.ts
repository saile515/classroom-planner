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
		const previewVertex = { x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top };

		if (roomVertices.length > 1 && Math.abs(tempVertices[tempVertices.length - 2].x - (event.clientX - boundingRect.left)) <= 50) {
			previewVertex.x = tempVertices[tempVertices.length - 2].x;
		}

		if (roomVertices.length > 1 && Math.abs(tempVertices[tempVertices.length - 2].y - (event.clientY - boundingRect.top)) <= 50) {
			previewVertex.y = tempVertices[tempVertices.length - 2].y;
		}

		tempVertices[tempVertices.length - 1] = previewVertex;
		tempVertices.push({ x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top });
		setRoomVertices(tempVertices);
	}

	function previewVertex(event: MouseEventInit) {
		if (roomVertices.length < 2) return;
		const boundingRect: DOMRect = container.current.getBoundingClientRect();
		const tempVertices = [...roomVertices];
		const previewVertex = { x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top };

		if (Math.abs(tempVertices[tempVertices.length - 2].x - (event.clientX - boundingRect.left)) <= 50) {
			previewVertex.x = tempVertices[tempVertices.length - 2].x;
		}

		if (Math.abs(tempVertices[tempVertices.length - 2].y - (event.clientY - boundingRect.top)) <= 50) {
			previewVertex.y = tempVertices[tempVertices.length - 2].y;
		}

		tempVertices[tempVertices.length - 1] = previewVertex;
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
