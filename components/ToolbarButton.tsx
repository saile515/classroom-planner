import { useEffect, useState } from "react";

import { CanvasState } from "./Canvas";

export default function ToolbarButton(props: { icon: string; setCanvasState: (value: CanvasState) => void; canvasState: CanvasState; state: CanvasState }) {
	const [active, setActive] = useState<boolean>(false);

	useEffect(() => {
		if (props.canvasState != props.state) setActive(false);
	}, [props.canvasState]);

	return (
		<button
			className={` text-white h-8 mx-1 w-8 rounded-md border-slate-300 border-2 box-content text-center ${active ? "bg-slate-100" : "bg-white"}`}
			onClick={() => {
				props.setCanvasState(active ? null : props.state);
				setActive(!active);
			}}>
			<img src={props.icon} alt="" className=" w-[70%] h-[70%] m-auto" />
		</button>
	);
}
