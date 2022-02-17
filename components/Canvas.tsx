import { ReactElement, useEffect, useRef, useState } from "react";

import Seat from "./Seat";

export default function Canvas() {
	const ref = useRef<SVGSVGElement>();
	const [seats, setSeats] = useState<ReactElement[]>([]);

	useEffect(() => {
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
		</svg>
	);
}
