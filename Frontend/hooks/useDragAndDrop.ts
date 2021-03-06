import { MouseEvent, MutableRefObject, useState } from "react";

export interface Vector {
	x: number;
	y: number;
}

export default function useDragAndDrop(props: {
	element: MutableRefObject<SVGRectElement>;
	initialPosition: Vector;
	parentBoundingRect: DOMRect;
}): [(event: MouseEvent) => void, () => void, (event: MouseEvent) => void, Vector] {
	const [position, setPosition] = useState<Vector>({ x: props.initialPosition.x, y: props.initialPosition.y });
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mouseOffset, setMouseOffset] = useState<Vector>({ x: 0, y: 0 });

	function startDrag(event: MouseEvent) {
		setIsDragging(true);
		const boundingRect = props.element.current.getBoundingClientRect();
		setMouseOffset({ x: event.clientX - boundingRect.x, y: event.clientY - boundingRect.y });
	}

	function endDrag() {
		setIsDragging(false);
		setMouseOffset({ x: 0, y: 0 });
	}

	function handleDrag(event: MouseEvent) {
		event.preventDefault();
		if (!isDragging) return;
		setPosition({ x: event.clientX - props.parentBoundingRect.left - mouseOffset.x, y: event.clientY - props.parentBoundingRect.top - mouseOffset.y });
	}

	return [startDrag, endDrag, handleDrag, position];
}
