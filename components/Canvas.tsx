import { useEffect, useRef, useState } from "react";

import Seat from "./Seat";

export default function Canvas() {
	const ref = useRef<SVGSVGElement>();
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		setIsReady(true);
	});
	return (
		<svg height="100%" width="100%" ref={ref}>
			{isReady && <Seat parentBoundingRect={ref.current.getBoundingClientRect()} />}
		</svg>
	);
}
