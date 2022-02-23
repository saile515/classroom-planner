import { MutableRefObject, useEffect, useState } from "react";

import { CanvasState } from "../components/Canvas";
import { Vector } from "./useDragAndDrop";

export default function useDrawLine(container: MutableRefObject<SVGSVGElement>, canvasState: CanvasState): [Vector[]] {
	const [roomVertices, setRoomVertices] = useState<Vector[]>([{ x: 0, y: 0 }]);

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
		if (canvasState != CanvasState.DrawLine) {
			container.current.removeEventListener("mousedown", addVertex);
			return;
		}

		container.current.addEventListener("mousedown", addVertex);
		container.current.addEventListener("mousemove", previewVertex);
	}, [canvasState]);

	return [roomVertices];
}
